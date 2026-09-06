import { initEngine, createPlayer, movePlayer } from './engine.js';

// define game music
const level1bgmusic = new Audio('../aduio/'); 
    
initEngine();

const playerId = 'wafflePlayer';
createPlayer(playerId, '../assets/character.svg');

// RPG Input States
const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
const speed = 0.06;

window.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

function controlLoop() {
    requestAnimationFrame(controlLoop);

    let dx = 0;
    let dy = 0;

    // Classic RPG direction calculations
    if (keys.w || keys.ArrowUp)    dy += speed;
    if (keys.s || keys.ArrowDown)  dy -= speed;
    if (keys.a || keys.ArrowLeft)  dx -= speed;
    if (keys.d || keys.ArrowRight) dx += speed;

    if (dx !== 0 || dy !== 0) {
        movePlayer(playerId, dx, dy);
    }
}
controlLoop();

window.addEventListener('load', () => {
  
});
