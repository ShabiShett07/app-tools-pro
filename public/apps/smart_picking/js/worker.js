import * as THREE from 'three';
import {
  AISLE_X, AISLE_HALF_LEN, AISLE_W, RACK_DEPTH, SHELF_Y,
  CROSS_AISLE_Z, CONSOLIDATION, WALK_SPEED_MIN, WALK_SPEED_MAX,
  PICK_TIME_MIN, PICK_TIME_MAX, DROP_DWELL, ZONES
} from './constants.js';

export const STATE = {
  IDLE: 'IDLE',
  MOVING_TO_BIN: 'MOVING_TO_BIN',
  PICKING: 'PICKING',
  MOVING_TO_DROP: 'MOVING_TO_DROP',
  DROPPING: 'DROPPING',
  RETURNING: 'RETURNING',
};

let workerIdCounter = 0;

export class Worker {
  constructor({ zoneId, aisleIdx, slotIndex, isFloater = false, scene }) {
    this.id = workerIdCounter++;
    this.zoneId = zoneId;
    this.aisleIdx = aisleIdx;
    this.isFloater = isFloater;
    this.scene = scene;

    this.state = STATE.IDLE;
    this.speed = WALK_SPEED_MIN + Math.random() * (WALK_SPEED_MAX - WALK_SPEED_MIN);

    // Start position: staggered along their aisle
    const aisleX = AISLE_X[aisleIdx];
    const startZ = -AISLE_HALF_LEN + 2 + slotIndex * 3;
    this.pos = new THREE.Vector3(aisleX, 0, startZ);

    // Waypoints queue
    this.waypoints = [];
    this.waypointIdx = 0;

    // Current pick task
    this.picks = [];     // [{binPos, shelfLevel}]
    this.pickIdx = 0;
    this.pickDwell = 0;  // remaining dwell (sim-seconds)
    this.itemsPicked = 0;
    this.onPickComplete = null;
    this.onDropComplete = null;

    // 3D mesh
    this.mesh = this._buildMesh();
    scene.add(this.mesh);
    this._buildLabel();

    // Bobbing state
    this._bobPhase = Math.random() * Math.PI * 2;
    this._lastPickFlash = 0;
  }

  _buildMesh() {
    const zone = this.isFloater ? null : ZONES[this.zoneId];
    const color = this.isFloater ? 0xFFD700 : zone.color;
    const emissiveInt = this.isFloater ? 0.5 : 0.25;

    const bodyGeo = new THREE.CylinderGeometry(0.25, 0.25, 1.6, 10);
    const bodyMat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: emissiveInt, roughness: 0.4,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);

    const headGeo = new THREE.SphereGeometry(0.22, 10, 8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.0;
    body.add(head);

    const group = new THREE.Group();
    group.add(body);
    group.position.copy(this.pos);
    group.position.y = 0.8;

    // Glow ring at feet
    const ringGeo = new THREE.TorusGeometry(0.35, 0.04, 6, 20);
    const ringMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.78;
    group.add(ring);

    this._body = body;
    this._ring = ring;
    this._bodyMat = bodyMat;
    this._ringMat = ringMat;
    return group;
  }

  _buildLabel() {
    // Small canvas sprite for the worker ID label
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 48;
    const ctx = canvas.getContext('2d');

    // Manual rounded rect — ctx.roundRect() not supported in all browsers
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    const r = 8;
    ctx.beginPath();
    ctx.moveTo(r, 0); ctx.lineTo(128 - r, 0);
    ctx.quadraticCurveTo(128, 0, 128, r);
    ctx.lineTo(128, 48 - r);
    ctx.quadraticCurveTo(128, 48, 128 - r, 48);
    ctx.lineTo(r, 48);
    ctx.quadraticCurveTo(0, 48, 0, 48 - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    const zone = this.isFloater ? null : ZONES[this.zoneId];
    const col = this.isFloater ? '#FFD700' : zone.hex;
    // Coloured top bar
    ctx.fillStyle = col;
    ctx.fillRect(0, 0, 128, 5);

    ctx.fillStyle = this.isFloater ? '#FFD700' : '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.isFloater ? `★ F${this.id}` : `${this.zoneId}-W${this.id}`, 64, 27);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(1.4, 0.52, 1);
    sprite.position.set(0, 1.9, 0);
    this.mesh.add(sprite);
  }

  assignPicks(picks, onPickComplete, onDropComplete) {
    this.picks = picks;
    this.pickIdx = 0;
    this.itemsPicked = 0;
    this.onPickComplete = onPickComplete;
    this.onDropComplete = onDropComplete;
    this._goToNextBin();
  }

  _goToNextBin() {
    if (this.pickIdx >= this.picks.length) {
      this._goToDrop();
      return;
    }
    const bin = this.picks[this.pickIdx];
    const aisleX = AISLE_X[this.aisleIdx];
    // Waypoints: move along aisle Z → approach rack X
    this.waypoints = [
      new THREE.Vector3(aisleX, 0, bin.z),
    ];
    this.waypointIdx = 0;
    this.state = STATE.MOVING_TO_BIN;
  }

  _goToDrop() {
    const aisleX = AISLE_X[this.aisleIdx];
    const frontZ = CROSS_AISLE_Z[0]; // -13
    this.waypoints = [
      new THREE.Vector3(aisleX, 0, frontZ),
      new THREE.Vector3(CONSOLIDATION.x, 0, frontZ),
      new THREE.Vector3(CONSOLIDATION.x, 0, CONSOLIDATION.z),
    ];
    this.waypointIdx = 0;
    this.state = STATE.MOVING_TO_DROP;
  }

  _goToStart() {
    const aisleX = AISLE_X[this.aisleIdx];
    const frontZ = CROSS_AISLE_Z[0];
    const startZ = -AISLE_HALF_LEN + 2 + (this.id % 4) * 3;
    this.waypoints = [
      new THREE.Vector3(CONSOLIDATION.x, 0, frontZ),
      new THREE.Vector3(aisleX, 0, frontZ),
      new THREE.Vector3(aisleX, 0, startZ),
    ];
    this.waypointIdx = 0;
    this.state = STATE.RETURNING;
  }

  update(simDelta, time) {
    switch (this.state) {
      case STATE.IDLE:
        this._bob(time, 0.03);
        break;

      case STATE.MOVING_TO_BIN:
      case STATE.MOVING_TO_DROP:
      case STATE.RETURNING:
        this._moveAlongWaypoints(simDelta, time);
        break;

      case STATE.PICKING:
        this.pickDwell -= simDelta;
        this._bob(time, 0.08);
        if (this.pickDwell <= 0) {
          this.itemsPicked++;
          this.pickIdx++;
          if (this.onPickComplete) this.onPickComplete(this.zoneId, this.aisleIdx);
          this._goToNextBin();
        }
        break;

      case STATE.DROPPING:
        this.pickDwell -= simDelta;
        this._bob(time, 0.12);
        if (this.pickDwell <= 0) {
          if (this.onDropComplete) this.onDropComplete(this.zoneId);
          this._goToStart();
        }
        break;
    }

    // Sync mesh position
    this.mesh.position.x = this.pos.x;
    this.mesh.position.z = this.pos.z;
  }

  _moveAlongWaypoints(simDelta, time) {
    if (this.waypointIdx >= this.waypoints.length) {
      // Reached final destination
      if (this.state === STATE.MOVING_TO_BIN) {
        const pick = this.picks[this.pickIdx];
        const realDwell = PICK_TIME_MIN + Math.random() * (PICK_TIME_MAX - PICK_TIME_MIN);
        // Faster picks at waist level (shelf 1)
        const factor = pick.shelfLevel === 1 ? 0.6 : pick.shelfLevel === 2 ? 1.4 : 1.0;
        this.pickDwell = realDwell * factor;
        this.state = STATE.PICKING;
      } else if (this.state === STATE.MOVING_TO_DROP) {
        this.pickDwell = DROP_DWELL;
        this.state = STATE.DROPPING;
      } else if (this.state === STATE.RETURNING) {
        this.state = STATE.IDLE;
      }
      return;
    }

    const target = this.waypoints[this.waypointIdx];
    const toTarget = new THREE.Vector3().subVectors(target, this.pos);
    toTarget.y = 0;
    const dist = toTarget.length();
    const move = this.speed * simDelta;

    if (dist <= move) {
      this.pos.copy(target);
      this.waypointIdx++;
    } else {
      toTarget.normalize();
      this.pos.addScaledVector(toTarget, move);
    }

    // Walking bob
    this._bob(time, 0.05);

    // Face direction of movement
    if (dist > 0.01) {
      const angle = Math.atan2(toTarget.x, toTarget.z);
      this.mesh.rotation.y = angle;
    }
  }

  _bob(time, amp) {
    this.mesh.position.y = 0.8 + Math.sin(time * 4 + this._bobPhase) * amp;
  }

  setIdle() {
    this.state = STATE.IDLE;
    this.picks = [];
    this.pickIdx = 0;
  }

  get isAvailable() {
    return this.state === STATE.IDLE;
  }

  remove() {
    this.scene.remove(this.mesh);
  }
}
