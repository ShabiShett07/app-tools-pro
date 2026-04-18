import * as THREE from 'three';
import {
  WAREHOUSE, AISLE_X, AISLE_HALF_LEN, AISLE_W,
  RACK_DEPTH, RACK_H, SHELF_Y, CROSS_AISLE_Z,
  CONSOLIDATION, ZONES
} from './constants.js';

export class WarehouseBuilder {
  constructor(scene) {
    this.scene = scene;
    this.zonePanels = {}; // zone id → { mesh, canvas, ctx, texture }
  }

  build() {
    this._buildFloor();
    this._buildWalls();
    this._buildAislesAndRacks();
    this._buildCrossAisles();
    this._buildConsolidationPoint();
    this._buildZonePanels();
    this._buildNeonGrid();
  }

  _buildFloor() {
    const geo = new THREE.PlaneGeometry(WAREHOUSE.width, WAREHOUSE.depth, 40, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1e,
      roughness: 0.9,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(geo, mat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Grid lines on floor
    const gridHelper = new THREE.GridHelper(62, 62, 0x1a2340, 0x111928);
    gridHelper.position.y = 0.01;
    this.scene.add(gridHelper);
  }

  _buildWalls() {
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0d1428, roughness: 0.85, metalness: 0.3,
      transparent: true, opacity: 0.7,
    });
    const walls = [
      { s:[WAREHOUSE.width, WAREHOUSE.wallH, 0.3], p:[0, WAREHOUSE.wallH/2, -WAREHOUSE.depth/2] },
      { s:[WAREHOUSE.width, WAREHOUSE.wallH, 0.3], p:[0, WAREHOUSE.wallH/2,  WAREHOUSE.depth/2] },
      { s:[0.3, WAREHOUSE.wallH, WAREHOUSE.depth], p:[-WAREHOUSE.width/2, WAREHOUSE.wallH/2, 0] },
      { s:[0.3, WAREHOUSE.wallH, WAREHOUSE.depth], p:[ WAREHOUSE.width/2,  WAREHOUSE.wallH/2, 0] },
    ];
    walls.forEach(w => {
      const geo = new THREE.BoxGeometry(...w.s);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(...w.p);
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    });

    // Ceiling struts
    const strutMat = new THREE.MeshStandardMaterial({ color: 0x0f1830, roughness: 0.7 });
    for (let x = -28; x <= 28; x += 14) {
      const geo = new THREE.BoxGeometry(0.3, 0.3, WAREHOUSE.depth);
      const m = new THREE.Mesh(geo, strutMat);
      m.position.set(x, WAREHOUSE.wallH - 0.15, 0);
      this.scene.add(m);
    }
  }

  _buildAislesAndRacks() {
    Object.values(ZONES).forEach(zone => {
      zone.aisleIdxs.forEach(ai => {
        const cx = AISLE_X[ai];
        this._buildRackPair(cx, zone.color);
      });
    });
  }

  _buildRackPair(aisleX, zoneColor) {
    const rackLength = AISLE_HALF_LEN * 2; // total aisle length
    const leftX  = aisleX - AISLE_W / 2 - RACK_DEPTH / 2;
    const rightX = aisleX + AISLE_W / 2 + RACK_DEPTH / 2;

    [leftX, rightX].forEach(rx => {
      // Rack frame
      const frameGeo = new THREE.BoxGeometry(RACK_DEPTH, RACK_H, rackLength);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x101c30, roughness: 0.8, metalness: 0.5,
        transparent: true, opacity: 0.6,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(rx, RACK_H / 2, 0);
      frame.castShadow = true;
      frame.receiveShadow = true;
      this.scene.add(frame);

      // Shelf levels
      SHELF_Y.forEach((sy, si) => {
        const shelfGeo = new THREE.BoxGeometry(RACK_DEPTH + 0.05, 0.05, rackLength);
        const shelfMat = new THREE.MeshStandardMaterial({ color: 0x1a2c48, roughness: 0.6, metalness: 0.4 });
        const shelf = new THREE.Mesh(shelfGeo, shelfMat);
        shelf.position.set(rx, sy, 0);
        this.scene.add(shelf);

        // Bins on each shelf (sampled visualization)
        this._buildBins(rx, sy, rackLength, zoneColor, si);
      });

      // Zone color stripe on rack face
      const stripeGeo = new THREE.BoxGeometry(0.05, RACK_H * 0.9, rackLength * 0.98);
      const stripeMat = new THREE.MeshStandardMaterial({
        color: zoneColor, emissive: zoneColor, emissiveIntensity: 0.15,
        transparent: true, opacity: 0.6,
      });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      const faceOffset = rx > 0 ? -RACK_DEPTH/2 - 0.03 : RACK_DEPTH/2 + 0.03;
      stripe.position.set(rx + faceOffset, RACK_H / 2, 0);
      this.scene.add(stripe);
    });
  }

  _buildBins(rackX, shelfY, rackLength, zoneColor, shelfIdx) {
    const binW = 0.38, binH = 0.28, binD = 0.36;
    const spacing = 0.45;
    const count = Math.floor(rackLength / spacing);
    const startZ = -rackLength / 2 + spacing / 2;

    // Fast-moving bins (waist shelf) get accent color
    const isFastShelf = shelfIdx === 1;
    const binColor = isFastShelf ? 0xff8f00 : (shelfIdx === 0 ? 0x1e3050 : 0x162540);
    const binMat = new THREE.MeshStandardMaterial({
      color: binColor, roughness: 0.7,
      emissive: isFastShelf ? 0xff8f00 : 0x000000,
      emissiveIntensity: isFastShelf ? 0.08 : 0,
    });

    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.75) continue; // sparse for performance
      const geo = new THREE.BoxGeometry(binW, binH, binD);
      const bin = new THREE.Mesh(geo, binMat);
      bin.position.set(rackX, shelfY + binH / 2 + 0.06, startZ + i * spacing);
      bin.castShadow = true;
      this.scene.add(bin);
    }
  }

  _buildCrossAisles() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x0d1730, roughness: 0.9 });
    CROSS_AISLE_Z.forEach(cz => {
      const geo = new THREE.BoxGeometry(WAREHOUSE.width - 2, 0.02, 3.5);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(0, 0.01, cz);
      this.scene.add(m);

      // Yellow dashed lines
      const lineCount = 20;
      for (let i = 0; i < lineCount; i++) {
        const lGeo = new THREE.BoxGeometry(1.8, 0.02, 0.12);
        const lMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.6 });
        const lm = new THREE.Mesh(lGeo, lMat);
        lm.position.set(-WAREHOUSE.width/2 + 2 + i * (WAREHOUSE.width - 4) / lineCount, 0.02, cz);
        this.scene.add(lm);
      }
    });
  }

  _buildConsolidationPoint() {
    // Platform
    const geo = new THREE.CylinderGeometry(2.5, 2.5, 0.12, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3,
      roughness: 0.4, metalness: 0.6,
    });
    const platform = new THREE.Mesh(geo, mat);
    platform.position.set(CONSOLIDATION.x, 0.06, CONSOLIDATION.z);
    this.scene.add(platform);

    // Glowing ring
    const ringGeo = new THREE.TorusGeometry(2.5, 0.12, 8, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x29B6F6, emissive: 0x29B6F6, emissiveIntensity: 1,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(CONSOLIDATION.x, 0.12, CONSOLIDATION.z);
    this.scene.add(ring);

    // Vertical beacon
    const beaconGeo = new THREE.CylinderGeometry(0.08, 0.08, 5, 8);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x29B6F6, emissive: 0x29B6F6, emissiveIntensity: 0.8,
      transparent: true, opacity: 0.85,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(CONSOLIDATION.x, 2.5, CONSOLIDATION.z);
    this.scene.add(beacon);

    // Point light
    const light = new THREE.PointLight(0x29B6F6, 2, 10);
    light.position.set(CONSOLIDATION.x, 1, CONSOLIDATION.z);
    this.scene.add(light);

    this.consolidationLight = light;
  }

  _buildZonePanels() {
    Object.values(ZONES).forEach(zone => {
      // Calculate panel x position: average of zone aisles
      const avgX = zone.aisleIdxs.reduce((s, i) => s + AISLE_X[i], 0) / zone.aisleIdxs.length;
      const panelPos = new THREE.Vector3(avgX, RACK_H + 1.0, 0);

      // Canvas
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 300;
      const ctx = canvas.getContext('2d');
      const texture = new THREE.CanvasTexture(canvas);

      const geo = new THREE.PlaneGeometry(4.5, 2.6);
      const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(panelPos);
      this.scene.add(mesh);

      this.zonePanels[zone.id] = { mesh, canvas, ctx, texture, zone };
      this._drawPanel(zone.id, { skus: 0, items: 0, picked: 0, workers: zone.workerCount, status: 'IDLE', floater: false });
    });
  }

  _buildNeonGrid() {
    // Overhead neon tubes along aisles for atmosphere
    AISLE_X.forEach(ax => {
      const geo = new THREE.CylinderGeometry(0.05, 0.05, AISLE_HALF_LEN * 2, 6);
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xddeeff, emissiveIntensity: 0.3 });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(ax, WAREHOUSE.wallH - 0.5, 0);
      this.scene.add(m);
    });
  }

  _drawPanel(zoneId, data) {
    const p = this.zonePanels[zoneId];
    if (!p) return;
    const { ctx, zone } = p;
    const W = 512, H = 300;

    ctx.clearRect(0, 0, W, H);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(8, 14, 32, 0.96)');
    grad.addColorStop(1, 'rgba(5, 9, 22, 0.96)');
    this._roundRect(ctx, 4, 4, W - 8, H - 8, 18);
    ctx.fillStyle = grad;
    ctx.fill();

    // Border
    this._roundRect(ctx, 4, 4, W - 8, H - 8, 18);
    ctx.strokeStyle = zone.hex;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Header band
    this._roundRect(ctx, 4, 4, W - 8, 56, 18);
    ctx.fillStyle = zone.hex + '25';
    ctx.fill();

    // Zone label
    ctx.fillStyle = zone.hex;
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(zone.label, 22, 40);

    // Aisle label
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(zone.aisleLabel, W - 22 - ctx.measureText(zone.aisleLabel).width, 40);

    // Status badge
    const statusColor = data.status === 'PICKING' ? '#66BB6A'
                      : data.status === 'DROPPING' ? '#29B6F6'
                      : data.floater ? '#FFD700' : '#4a5568';
    ctx.fillStyle = statusColor + '22';
    this._roundRect(ctx, W - 110, 68, 100, 26, 6);
    ctx.fill();
    ctx.fillStyle = statusColor;
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText(data.floater ? '⭐ FLOATER' : `● ${data.status}`, W - 100, 86);

    // Stats
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('SKUs Assigned', 22, 84);
    ctx.fillText('Items to Pick', 180, 84);
    ctx.fillText('Workers', 360, 84);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px JetBrains Mono, monospace';
    ctx.fillText(data.skus || '—', 22, 124);

    ctx.fillStyle = zone.hex;
    ctx.fillText(data.items || '—', 180, 124);

    ctx.fillStyle = data.floater ? '#FFD700' : '#ffffff';
    ctx.fillText(data.workers, 360, 124);

    // Progress bar
    const barX = 22, barY = 145, barW = W - 44, barH = 20;
    this._roundRect(ctx, barX, barY, barW, barH, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fill();

    const pct = data.items > 0 ? Math.min(1, data.picked / data.items) : 0;
    if (pct > 0) {
      const fillGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
      fillGrad.addColorStop(0, zone.hex);
      fillGrad.addColorStop(1, zone.hex + 'aa');
      this._roundRect(ctx, barX, barY, barW * pct, barH, 6);
      ctx.fillStyle = fillGrad;
      ctx.fill();
    }

    // Progress label
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '13px Inter, sans-serif';
    const pctLabel = data.items > 0 ? `${data.picked}/${data.items} items (${Math.round(pct*100)}%)` : 'Awaiting order';
    ctx.fillText(pctLabel, barX, barY + barH + 18);

    // Worker dots
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Active Workers:', barX, barY + barH + 44);
    for (let w = 0; w < data.workers; w++) {
      const wx = barX + 120 + w * 22;
      ctx.beginPath();
      ctx.arc(wx, barY + barH + 38, 7, 0, Math.PI * 2);
      ctx.fillStyle = data.status !== 'IDLE' && w < (data.activeWorkers || 0) ? zone.hex : 'rgba(255,255,255,0.15)';
      ctx.fill();
    }

    p.texture.needsUpdate = true;
  }

  updatePanel(zoneId, data) {
    this._drawPanel(zoneId, data);
  }

  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  animateConsolidation(time) {
    if (this.consolidationLight) {
      this.consolidationLight.intensity = 1.5 + Math.sin(time * 2) * 0.5;
    }
  }
}
