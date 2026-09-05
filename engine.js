import * as THREE from 'https://cloudflare.com';

let scene, camera, renderer;
const players = {}; 

export function initEngine() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;

    animate();
}

export function createPlayer(id, texturePath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    // Changed to PlaneGeometry (width, height) to make it flat like paper
    const geometry = new THREE.PlaneGeometry(1, 1);
    
    // Side: THREE.DoubleSide ensures you can still see the paper if it flips around
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true, 
        side: THREE.DoubleSide 
    });
    
    const playerMesh = new THREE.Mesh(geometry, material);
    
    playerMesh.scale.set(1.5, 1.5, 1.5); // Sized up slightly since planes look smaller than cubes
    scene.add(playerMesh);
    
    players[id] = playerMesh;
}

export function movePlayer(id, dx, dy) {
    if (players[id]) {
        players[id].position.x += dx;
        players[id].position.y += dy;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
