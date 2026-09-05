import * as THREE from 'https://cloudflare.com';

let scene, camera, renderer;
const players = {}; 
let activePlayerId = null; // Track who the camera follows

export function initEngine() {
    scene = new THREE.Scene();
    
    // Top-down RPG angled camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -4, 5); // Positioned slightly down and out
    camera.lookAt(0, 0, 0);       // Angled down at the center of the world

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a simple green RPG grass field grid
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x228b22, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    scene.add(floor);

    animate();
}

export function createPlayer(id, texturePath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
    const playerMesh = new THREE.Mesh(geometry, material);
    
    // Stand the paper character upright on the ground plane
    playerMesh.rotation.x = Math.PI / 4; 
    playerMesh.position.set(0, 0, 0.5); // Place just slightly above the floor
    
    scene.add(playerMesh);
    players[id] = playerMesh;
    activePlayerId = id; // Set camera target
}

export function movePlayer(id, dx, dy) {
    if (players[id]) {
        players[id].position.x += dx;
        players[id].position.y += dy;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // RPG Camera Follow: Keep the camera smoothly hovering behind the active player mesh
    if (activePlayerId && players[activePlayerId]) {
        const p = players[activePlayerId];
        camera.position.set(p.position.x, p.position.y - 4, p.position.z + 45 * (Math.PI / 180) + 4);
        camera.lookAt(p.position.x, p.position.y, p.position.z);
    }

    renderer.render(scene, camera);
}
