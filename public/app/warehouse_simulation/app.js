// Scene setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({ color: 0x808080 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Camera
camera.position.set(5, 15, 20);
camera.lookAt(5, 0, 4);

// Orbit Controls (zoom, rotate, pan)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 3;
controls.maxDistance = 50;
controls.target.set(5, 0, 4);

// ===============================
// TEXT SPRITE HELPER
// ===============================
function makeTextSprite(text, opts = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = opts.fontSize || 48;
    const fontFace = opts.fontFace || 'Arial';
    canvas.width = 512;
    canvas.height = 128;
    ctx.fillStyle = opts.bgColor || 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `Bold ${fontSize}px ${fontFace}`;
    ctx.fillStyle = opts.textColor || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(opts.scaleX || 3, opts.scaleY || 0.75, 1);
    return sprite;
}

// ===============================
// WAREHOUSE SECTIONS + ITEMS
// ===============================
// All pickable items with their world positions and section info
const allItems = [];

// --- ELECTRONICS (right end) ---
const sectionBaseX = 16;
const electronicsSections = [
    { name: 'TV', row: 0, color: 0x00897B },
    { name: 'Mobile', row: 1, color: 0x7B1FA2 },
    { name: 'Smartphone Accessories', row: 2, color: 0xE64A19 }
];

const elecHeader = makeTextSprite('ELECTRONICS', {
    fontSize: 52, bgColor: 'rgba(30,30,30,0.85)', textColor: '#FFD54F', scaleX: 5, scaleY: 1
});
elecHeader.position.set(sectionBaseX + 2, 4.5, -2);
scene.add(elecHeader);

for (let s of electronicsSections) {
    const z = s.row * 4;
    for (let k = 0; k < 2; k++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 2.2, 1.2),
            new THREE.MeshStandardMaterial({ color: s.color, metalness: 0.3, roughness: 0.6 })
        );
        shelf.position.set(sectionBaseX + k * 2.5, 1.1, z);
        scene.add(shelf);
    }
    const label = makeTextSprite(s.name, {
        fontSize: 40, bgColor: 'rgba(0,0,0,0.5)', textColor: '#ffffff', scaleX: 3.5, scaleY: 0.7
    });
    label.position.set(sectionBaseX + 1.25, 3, z);
    scene.add(label);

    // Register as pickable item — target is just in front of the shelf
    allItems.push({ name: s.name, section: 'Electronics', worldX: sectionBaseX - 2, worldZ: z });
}

// --- FASHION (left end) ---
const fashionBaseX = -6;
const fashionSections = [
    { name: "Men's", row: 0, color: 0x1565C0 },
    { name: "Women's", row: 1, color: 0xAD1457 },
    { name: "Kids", row: 2, color: 0xEF6C00 }
];

const fashionHeader = makeTextSprite('FASHION', {
    fontSize: 52, bgColor: 'rgba(30,30,30,0.85)', textColor: '#F48FB1', scaleX: 5, scaleY: 1
});
fashionHeader.position.set(fashionBaseX - 1, 4.5, -2);
scene.add(fashionHeader);

for (let s of fashionSections) {
    const z = s.row * 4;
    for (let k = 0; k < 2; k++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 2.2, 1.2),
            new THREE.MeshStandardMaterial({ color: s.color, metalness: 0.3, roughness: 0.6 })
        );
        shelf.position.set(fashionBaseX - k * 2.5, 1.1, z);
        scene.add(shelf);
    }
    const label = makeTextSprite(s.name, {
        fontSize: 40, bgColor: 'rgba(0,0,0,0.5)', textColor: '#ffffff', scaleX: 3.5, scaleY: 0.7
    });
    label.position.set(fashionBaseX - 1.25, 3, z);
    scene.add(label);

    allItems.push({ name: s.name, section: 'Fashion', worldX: fashionBaseX + 2, worldZ: z });
}

// --- DAILY NEEDS (east / far end) ---
const dailyBaseZ = 14;
const dailySections = [
    { name: 'Groceries', col: 0, color: 0x2E7D32 },
    { name: 'Cleaning', col: 1, color: 0x0277BD },
    { name: 'Personal Care', col: 2, color: 0x6A1B9A }
];

const dailyHeader = makeTextSprite('DAILY NEEDS', {
    fontSize: 52, bgColor: 'rgba(30,30,30,0.85)', textColor: '#81C784', scaleX: 5, scaleY: 1
});
dailyHeader.position.set(5, 4.5, dailyBaseZ - 1);
scene.add(dailyHeader);

for (let s of dailySections) {
    const x = s.col * 5;
    for (let k = 0; k < 2; k++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 2.2, 1.2),
            new THREE.MeshStandardMaterial({ color: s.color, metalness: 0.3, roughness: 0.6 })
        );
        shelf.position.set(x, 1.1, dailyBaseZ + k * 2.5);
        scene.add(shelf);
    }
    const label = makeTextSprite(s.name, {
        fontSize: 40, bgColor: 'rgba(0,0,0,0.5)', textColor: '#ffffff', scaleX: 3.5, scaleY: 0.7
    });
    label.position.set(x, 3, dailyBaseZ + 1.25);
    scene.add(label);

    allItems.push({ name: s.name, section: 'Daily Needs', worldX: x, worldZ: dailyBaseZ - 2 });
}

// --- FURNITURE (west / front end) ---
const furnitureBaseZ = -6;
const furnitureSections = [
    { name: 'Living Room', col: 0, color: 0x795548 },
    { name: 'Bedroom', col: 1, color: 0x5C6BC0 },
    { name: 'Office', col: 2, color: 0x00838F }
];

const furnitureHeader = makeTextSprite('FURNITURE', {
    fontSize: 52, bgColor: 'rgba(30,30,30,0.85)', textColor: '#BCAAA4', scaleX: 5, scaleY: 1
});
furnitureHeader.position.set(5, 4.5, furnitureBaseZ + 1);
scene.add(furnitureHeader);

for (let s of furnitureSections) {
    const x = s.col * 5;
    for (let k = 0; k < 2; k++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 2.2, 1.2),
            new THREE.MeshStandardMaterial({ color: s.color, metalness: 0.3, roughness: 0.6 })
        );
        shelf.position.set(x, 1.1, furnitureBaseZ - k * 2.5);
        scene.add(shelf);
    }
    const label = makeTextSprite(s.name, {
        fontSize: 40, bgColor: 'rgba(0,0,0,0.5)', textColor: '#ffffff', scaleX: 3.5, scaleY: 0.7
    });
    label.position.set(x, 3, furnitureBaseZ - 1.25);
    scene.add(label);

    allItems.push({ name: s.name, section: 'Furniture', worldX: x, worldZ: furnitureBaseZ + 2 });
}

// --- SPORTS & OUTDOORS (centre) ---
const centerX = 5;
const centerZ = 7;
const centerSections = [
    { name: 'Equipment', offset: -4, color: 0x00897B },
    { name: 'Apparel', offset: 0, color: 0xFFA000 },
    { name: 'Camping', offset: 4, color: 0x558B2F }
];

const centerHeader = makeTextSprite('SPORTS & OUTDOORS', {
    fontSize: 48, bgColor: 'rgba(30,30,30,0.85)', textColor: '#4DD0E1', scaleX: 5, scaleY: 1
});
centerHeader.position.set(centerX, 5.5, centerZ);
scene.add(centerHeader);

for (let s of centerSections) {
    const x = centerX + s.offset;
    const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2.5, 1.5),
        new THREE.MeshStandardMaterial({ color: s.color, metalness: 0.3, roughness: 0.6 })
    );
    shelf.position.set(x, 1.25, centerZ);
    scene.add(shelf);

    const label = makeTextSprite(s.name, {
        fontSize: 40, bgColor: 'rgba(0,0,0,0.5)', textColor: '#ffffff', scaleX: 3, scaleY: 0.7
    });
    label.position.set(x, 3.5, centerZ);
    scene.add(label);

    allItems.push({ name: s.name, section: 'Sports & Outdoors', worldX: x, worldZ: centerZ - 2 });
}

// ===============================
// WAREHOUSE WALLS
// ===============================
const wallMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.9, metalness: 0.1 });
const outerWallMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0, metalness: 0.0 });
const wallHeight = 4;
const outerWallHeight = 6;
const wallThick = 0.5;

const structuralWalls = [
    // East wall (Electronics) shifted to x=12.5 for robot clearance
    // Door from z=2 to z=6
    { x: 12.5, z: -5, w: wallThick, d: 14 },
    { x: 12.5, z: 13, w: wallThick, d: 14 },

    // West wall (Fashion) shifted to x=-2.5 for robot clearance
    // Door from z=2 to z=6
    { x: -2.5, z: -5, w: wallThick, d: 14 },
    { x: -2.5, z: 13, w: wallThick, d: 14 },

    // North wall (Daily Needs) z = 10
    // Door from x=4 to x=6
    { x: 0.25, z: 10, w: 7.5, d: wallThick },
    { x: 9.75, z: 10, w: 7.5, d: wallThick },

    // South wall (Furniture) z = -2.5
    // Door from x=4 to x=6
    { x: 0.25, z: -2.5, w: 7.5, d: wallThick },
    { x: 9.75, z: -2.5, w: 7.5, d: wallThick },

    // OUTER PERIMETER BOUNDARY SHELL
    // East outer boundary
    { x: 22, z: 4.5, w: wallThick, d: 34, mat: outerWallMat, h: outerWallHeight },
    // West outer boundary
    { x: -12, z: 4.5, w: wallThick, d: 34, mat: outerWallMat, h: outerWallHeight },
    // North outer boundary
    { x: 5, z: 21, w: 34.5, d: wallThick, mat: outerWallMat, h: outerWallHeight },
    // South outer boundary (split for Exit Door at x=-8)
    { x: 8, z: -12, w: 28, d: wallThick, mat: outerWallMat, h: outerWallHeight }, // East of door
    { x: -11, z: -12, w: 2, d: wallThick, mat: outerWallMat, h: outerWallHeight } // West of door
];

for (let w of structuralWalls) {
    const h = w.h || wallHeight;
    const mat = w.mat || wallMat;
    const wallGeo = new THREE.BoxGeometry(w.w, h, w.d);
    const wallMesh = new THREE.Mesh(wallGeo, mat);
    wallMesh.position.set(w.x, h / 2, w.z);
    scene.add(wallMesh);
}

// ===============================
// PICK-AND-PLACE ROBOT
// ===============================
const robot = new THREE.Group();

const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.4 });
const columnMat = new THREE.MeshStandardMaterial({ color: 0xf0c030, metalness: 0.5, roughness: 0.3 });
const armMat = new THREE.MeshStandardMaterial({ color: 0xf0c030, metalness: 0.5, roughness: 0.3 });
const gripperMat = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.4, roughness: 0.5 });
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });

const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.8), baseMat);
base.position.y = 0.15;
robot.add(base);

const wheelGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 12);
const wheelPositions = [
    { x: -0.45, z: -0.35 }, { x: 0.45, z: -0.35 },
    { x: -0.45, z: 0.35 }, { x: 0.45, z: 0.35 }
];
for (let wp of wheelPositions) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wp.x, 0.08, wp.z);
    robot.add(wheel);
}

const column = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 0.2), columnMat);
column.position.set(0, 1.1, 0);
robot.add(column);

const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.15), armMat);
arm.position.set(0.4, 1.8, 0);
robot.add(arm);

const gripperMount = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.15), gripperMat);
gripperMount.position.set(0.75, 1.55, 0);
robot.add(gripperMount);

const prongGeo = new THREE.BoxGeometry(0.05, 0.35, 0.05);
const leftProng = new THREE.Mesh(prongGeo, gripperMat);
leftProng.position.set(0.75, 1.22, -0.08);
robot.add(leftProng);

const rightProng = new THREE.Mesh(prongGeo, gripperMat);
rightProng.position.set(0.75, 1.22, 0.08);
robot.add(rightProng);

// Robot start position (world coords)
const startPos = { x: 5, z: 4 };
robot.position.set(startPos.x, 0, startPos.z);
scene.add(robot);

// ===============================
// A* PATHFINDING (in world coords)
// ===============================
// Collect all shelf obstacle positions
const obstacles = new Set();

function addObstacle(wx, wz) {
    // Round to nearest integer for grid lookup
    const key = `${Math.round(wx)},${Math.round(wz)}`;
    obstacles.add(key);
}

// Register shelf positions as obstacles with expanded padding to prevent clipping
// Electronics (target is west side at -2 distance)
for (let s of electronicsSections) {
    const z = s.row * 4;
    for (let k = 0; k < 2; k++) {
        const cx = sectionBaseX + k * 2.5;
        addObstacle(cx, z);
        addObstacle(cx, z + 1);
        addObstacle(cx, z - 1);
        addObstacle(cx + 1, z);
        addObstacle(cx - 1, z); // We can safely block cx-1, because target is now at cx-2!
    }
}
// Fashion (target is east side at +2 distance)
for (let s of fashionSections) {
    const z = s.row * 4;
    for (let k = 0; k < 2; k++) {
        const cx = fashionBaseX - k * 2.5;
        addObstacle(cx, z);
        addObstacle(cx, z + 1);
        addObstacle(cx, z - 1);
        addObstacle(cx - 1, z);
        addObstacle(cx + 1, z); // We can safely block cx+1, because target is now at cx+2!
    }
}
// Daily Needs (target is north side -z)
for (let s of dailySections) {
    const x = s.col * 5;
    for (let k = 0; k < 2; k++) {
        const cz = dailyBaseZ + k * 2.5;
        addObstacle(x, cz);
        addObstacle(x + 1, cz);
        addObstacle(x - 1, cz);
        addObstacle(x, cz + 1);
        // Do not block cz - 1
    }
}
// Furniture (target is south side +z)
for (let s of furnitureSections) {
    const x = s.col * 5;
    for (let k = 0; k < 2; k++) {
        const cz = furnitureBaseZ - k * 2.5;
        addObstacle(x, cz);
        addObstacle(x + 1, cz);
        addObstacle(x - 1, cz);
        addObstacle(x, cz - 1);
    }
}
// Sports center (target is north side -z)
for (let s of centerSections) {
    const x = centerX + s.offset;
    addObstacle(x, centerZ);
    addObstacle(x + 1, centerZ);
    addObstacle(x - 1, centerZ);
    addObstacle(x, centerZ + 1);
}

// Register structural walls as continuous obstacles
for (let w of structuralWalls) {
    const startX = w.x - w.w / 2;
    const endX = w.x + w.w / 2;
    const startZ = w.z - w.d / 2;
    const endZ = w.z + w.d / 2;

    for (let x = Math.floor(startX); x <= Math.ceil(endX); x++) {
        for (let z = Math.floor(startZ); z <= Math.ceil(endZ); z++) {
            addObstacle(x, z);
        }
    }
}

function isBlocked(wx, wz) {
    const key = `${Math.round(wx)},${Math.round(wz)}`;
    return obstacles.has(key);
}

function astarWorld(sx, sz, tx, tz) {
    // A* on a continuous grid with step size 1
    const step = 1;
    const openList = [];
    const closedSet = new Set();
    const gScore = {};
    const cameFrom = {};

    const startKey = `${sx},${sz}`;
    const goalKey = `${tx},${tz}`;

    gScore[startKey] = 0;
    openList.push({ x: sx, z: sz, f: Math.abs(sx - tx) + Math.abs(sz - tz) });

    const dirs = [
        { dx: step, dz: 0 }, { dx: -step, dz: 0 },
        { dx: 0, dz: step }, { dx: 0, dz: -step }
    ];

    let iterations = 0;
    const maxIterations = 5000;

    while (openList.length > 0 && iterations < maxIterations) {
        iterations++;
        // Get node with lowest f
        openList.sort((a, b) => a.f - b.f);
        const curr = openList.shift();
        const currKey = `${curr.x},${curr.z}`;

        if (Math.abs(curr.x - tx) < 0.5 && Math.abs(curr.z - tz) < 0.5) {
            // Reconstruct path
            const path = [{ x: tx, z: tz }];
            let key = currKey;
            while (cameFrom[key]) {
                const [px, pz] = cameFrom[key].split(',').map(Number);
                path.push({ x: px, z: pz });
                key = cameFrom[key];
            }
            path.reverse();
            return path;
        }

        closedSet.add(currKey);

        for (let d of dirs) {
            const nx = Math.round((curr.x + d.dx) * 10) / 10;
            const nz = Math.round((curr.z + d.dz) * 10) / 10;
            const nKey = `${nx},${nz}`;

            if (closedSet.has(nKey) || isBlocked(nx, nz)) continue;

            // Keep within warehouse bounds
            if (nx < -12 || nx > 22 || nz < -12 || nz > 20) continue;

            const tentativeG = (gScore[currKey] || 0) + step;

            if (tentativeG < (gScore[nKey] || Infinity)) {
                gScore[nKey] = tentativeG;
                const h = Math.abs(nx - tx) + Math.abs(nz - tz);
                cameFrom[nKey] = currKey;

                // Add to open list if not already there
                if (!openList.find(n => `${n.x},${n.z}` === nKey)) {
                    openList.push({ x: nx, z: nz, f: tentativeG + h });
                }
            }
        }
    }

    console.warn(`A* failed: ${sx},${sz} -> ${tx},${tz} after ${iterations} iterations`);
    // Fallback: direct line
    return [{ x: sx, z: sz }, { x: tx, z: tz }];
}

// ===============================
// PICKING LOGIC
// ===============================
let pathQueue = [];      // Array of path arrays (segments)
let segmentIndex = 0;
let stepIndex = 0;
let isAnimating = false;
let lastMoveTime = 0;
const moveDelay = 150;   // ms per step

// Visual indicator cubes for items to be picked
let activeItemMeshes = [];

function startPicking(selectedNames) {
    if (isAnimating) return;
    if (selectedNames.length === 0) return;

    const targets = allItems.filter(item => selectedNames.includes(item.name));
    if (targets.length === 0) return;

    // Clear old visual items
    activeItemMeshes.forEach(m => scene.remove(m));
    activeItemMeshes = [];

    // Spawn yellow boxes at targets
    const boxGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    for (let t of targets) {
        const mesh = new THREE.Mesh(boxGeo, boxMat);
        mesh.position.set(t.worldX, 0.4, t.worldZ);
        scene.add(mesh);
        // Link mesh to target for removal later
        t.mesh = mesh;
        activeItemMeshes.push(mesh);
    }

    let current = { x: robot.position.x, z: robot.position.z };
    const ordered = [];
    const remaining = [...targets];

    while (remaining.length > 0) {
        let bestIdx = 0;
        let bestDist = Infinity;
        for (let i = 0; i < remaining.length; i++) {
            const d = Math.abs(current.x - remaining[i].worldX) + Math.abs(current.z - remaining[i].worldZ);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
            }
        }
        ordered.push(remaining.splice(bestIdx, 1)[0]);
        current = { x: ordered[ordered.length - 1].worldX, z: ordered[ordered.length - 1].worldZ };
    }

    pathQueue = [];
    let cx = Math.round(robot.position.x);
    let cz = Math.round(robot.position.z);

    for (let item of ordered) {
        const tx = Math.round(item.worldX);
        const tz = Math.round(item.worldZ);
        const path = astarWorld(cx, cz, tx, tz);
        // Include item reference in segment
        pathQueue.push({ path, itemName: item.name, mesh: item.mesh });
        cx = tx;
        cz = tz;
    }

    // Go to Drop-Off Station (-8, -12) -> Exit Door
    const dropOffX = -8;
    const dropOffZ = -12;
    const dropPath = astarWorld(cx, cz, dropOffX, dropOffZ);
    pathQueue.push({ path: dropPath, itemName: 'Drop-Off Station' });

    // Return to start position
    const returnPath = astarWorld(dropOffX, dropOffZ, startPos.x, startPos.z);
    pathQueue.push({ path: returnPath, itemName: 'Return to Start' });

    segmentIndex = 0;
    stepIndex = 0;
    isAnimating = true;

    updateStatus('Picking started! ' + ordered.map(i => i.name).join(' → '));
    console.log('Path segments:', pathQueue);
}

function resetRobot() {
    isAnimating = false;
    pathQueue = [];
    segmentIndex = 0;
    stepIndex = 0;
    robot.position.set(startPos.x, 0, startPos.z);
    updateStatus('Robot reset to start position.');
}

function updateStatus(msg) {
    const el = document.getElementById('status');
    if (el) el.textContent = msg;
}

// ===============================
// ANIMATION LOOP
// ===============================
function animate(time) {
    requestAnimationFrame(animate);

    if (isAnimating && segmentIndex < pathQueue.length) {
        const segment = pathQueue[segmentIndex];
        const path = segment.path;

        if (stepIndex < path.length) {
            if (time - lastMoveTime > moveDelay) {
                const p = path[stepIndex];
                robot.position.set(p.x, 0, p.z);
                stepIndex++;
                lastMoveTime = time;
            }
        } else {
            // Segment complete
            if (segment.mesh) {
                segment.mesh.visible = false; // "Pick up" the box
            }

            updateStatus('Reached: ' + segment.itemName);
            segmentIndex++;
            stepIndex = 0;

            if (segmentIndex >= pathQueue.length) {
                isAnimating = false;
                updateStatus('Order dropped off! Ready for next pick.');

                // Clear any remaining boxes just in case
                activeItemMeshes.forEach(m => scene.remove(m));
                activeItemMeshes = [];

                // Uncheck all UI boxes so it's ready for the next order
                document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
            }
        }
    }

    controls.update();
    renderer.render(scene, camera);
}

animate(0);

// ===============================
// POPULATE DROPDOWN
// ===============================
function populateDropdown() {
    const list = document.getElementById('item-list');
    if (!list) return;

    // Group by section
    const grouped = {};
    for (let item of allItems) {
        if (!grouped[item.section]) grouped[item.section] = [];
        grouped[item.section].push(item);
    }

    for (let section of Object.keys(grouped)) {
        const header = document.createElement('div');
        header.className = 'section-header';
        header.textContent = section;
        list.appendChild(header);

        for (let item of grouped[section]) {
            const label = document.createElement('label');
            label.className = 'item-option';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.value = item.name;
            cb.className = 'item-checkbox';
            label.appendChild(cb);
            label.appendChild(document.createTextNode(' ' + item.name));
            list.appendChild(label);
        }
    }
}

// Wire up buttons
window.addEventListener('DOMContentLoaded', () => {
    populateDropdown();

    document.getElementById('start-btn').addEventListener('click', () => {
        const checked = document.querySelectorAll('.item-checkbox:checked');
        const names = Array.from(checked).map(cb => cb.value);
        if (names.length === 0) {
            updateStatus('Please select at least one item.');
            return;
        }
        startPicking(names);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        resetRobot();
        // Uncheck all
        document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
    });

    document.getElementById('dropdown-toggle').addEventListener('click', () => {
        const list = document.getElementById('item-list');
        list.style.display = list.style.display === 'none' ? 'block' : 'none';
    });
});

// ===============================
// VISUAL EXIT DOOR (DROP-OFF)
// ===============================
const dropStationGeo = new THREE.BoxGeometry(2, 0.5, 2);
const dropStationMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
const dropStation = new THREE.Mesh(dropStationGeo, dropStationMat);
dropStation.position.set(-8, 0.25, -12);
scene.add(dropStation);

// Framed door structure for Drop-off station (embedded in outer wall)
const frameMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
// Left Pillar
const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6, 0.8), frameMat);
leftPillar.position.set(-10, 3, -12);
scene.add(leftPillar);
// Right Pillar
const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6, 0.8), frameMat);
rightPillar.position.set(-6, 3, -12);
scene.add(rightPillar);
// Top Lintel
const topLintel = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.5, 0.8), frameMat);
topLintel.position.set(-8, 6.25, -12);
scene.add(topLintel);

const dropLabel = makeTextSprite('EXIT / DROP-OFF', {
    fontSize: 32, bgColor: 'rgba(0,0,0,0.8)', textColor: '#00FF00', scaleX: 3.5, scaleY: 0.7
});
dropLabel.position.set(-8, 7, -12);

scene.add(dropLabel);

// ===============================
// RESIZE HANDLING
// ===============================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
