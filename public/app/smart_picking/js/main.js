import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { WarehouseBuilder } from './warehouse.js';
import { SimulationManager } from './simulation.js';

function showError(msg) {
  const b = document.getElementById('error-banner');
  if (b) { b.style.display = 'block'; b.textContent = '❌ ' + msg; }
  console.error(msg);
}


const canvas  = document.getElementById('simulation-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.setClearColor(0x03050f, 1);

// ── Scene ─────────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x03050f, 0.018);

// ── Camera ────────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 300);
camera.position.set(0, 45, 55);
camera.lookAt(0, 0, 0);

// ── Controls ──────────────────────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 8;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI / 2.1;
controls.target.set(0, 2, 0);

// ── Lighting ──────────────────────────────────────────────────────────────────
// Ambient
const ambient = new THREE.AmbientLight(0x0d1830, 3);
scene.add(ambient);

// Main directional (overhead)
const dirLight = new THREE.DirectionalLight(0xc8d8ff, 1.5);
dirLight.position.set(0, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 80;
dirLight.shadow.camera.left = -40;
dirLight.shadow.camera.right = 40;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;
scene.add(dirLight);

// Cool fill light from front
const fillLight = new THREE.DirectionalLight(0x4488cc, 0.4);
fillLight.position.set(0, 5, 20);
scene.add(fillLight);

// Zone coloured point lights
const zoneLights = [
  { color: 0x29B6F6, pos: [-24, 5, 0] },
  { color: 0x66BB6A, pos: [-14, 5, 0] },
  { color: 0xFFA726, pos: [1,   5, 0] },
  { color: 0xAB47BC, pos: [16,  5, 0] },
  { color: 0xEF5350, pos: [26,  5, 0] },
];
zoneLights.forEach(({ color, pos }) => {
  const pl = new THREE.PointLight(color, 0.6, 18);
  pl.position.set(...pos);
  scene.add(pl);
});

// ── Build Warehouse ───────────────────────────────────────────────────────────
let warehouseBuilder, sim;
try {
  warehouseBuilder = new WarehouseBuilder(scene);
  warehouseBuilder.build();
} catch(e) {
  showError('Warehouse build failed: ' + e.message); console.error(e);
}

// ── Simulation Manager ────────────────────────────────────────────────────────
try {
  sim = new SimulationManager(scene, warehouseBuilder);
} catch(e) {
  showError('Simulation init failed: ' + e.message); console.error(e);
}

// ── Particles (floating dust) ─────────────────────────────────────────────────
const PARTICLE_COUNT = 300;
const particleGeo = new THREE.BufferGeometry();
const pPositions = new Float32Array(PARTICLE_COUNT * 3);
const pVels = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  pPositions[i * 3]     = (Math.random() - 0.5) * 60;
  pPositions[i * 3 + 1] = Math.random() * 7;
  pPositions[i * 3 + 2] = (Math.random() - 0.5) * 28;
  pVels.push({ vx: (Math.random() - 0.5) * 0.02, vy: Math.random() * 0.01, vz: (Math.random() - 0.5) * 0.02 });
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
const particleMat = new THREE.PointsMaterial({ color: 0x4488cc, size: 0.06, transparent: true, opacity: 0.35 });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ── Resize ────────────────────────────────────────────────────────────────────
function handleResize() {
  const container = document.getElementById('canvas-container');
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
handleResize();
window.addEventListener('resize', handleResize);

// ── Render Loop ───────────────────────────────────────────────────────────────
let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const realDelta = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms
  lastTime = now;

  const time = now / 1000;

  // Tick simulation
  if (sim) sim.tick(realDelta);

  // Animate particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const v = pVels[i];
    pPositions[i * 3]     += v.vx;
    pPositions[i * 3 + 1] += v.vy;
    pPositions[i * 3 + 2] += v.vz;
    // Wrap
    if (pPositions[i * 3]     >  31) pPositions[i * 3]     = -31;
    if (pPositions[i * 3]     < -31) pPositions[i * 3]     =  31;
    if (pPositions[i * 3 + 1] >   7) pPositions[i * 3 + 1] = 0;
    if (pPositions[i * 3 + 2] >  14) pPositions[i * 3 + 2] = -14;
    if (pPositions[i * 3 + 2] < -14) pPositions[i * 3 + 2] =  14;
  }
  particleGeo.attributes.position.needsUpdate = true;

  // Animate consolidation beacon
  warehouseBuilder.animateConsolidation(time);

  controls.update();
  renderer.render(scene, camera);
}
animate();
