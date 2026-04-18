import { ZONES, FLOATER_COUNT, OVERLOAD_THRESHOLD } from './constants.js';
import { Worker, STATE } from './worker.js';
import { distributeOrder } from './sku.js';
import { UI } from './ui.js';

export class SimulationManager {
  constructor(scene, warehouseBuilder) {
    this.scene = scene;
    this.wb = warehouseBuilder;
    this.ui = new UI();

    this.running = false;
    this.simTime = 0;   // accumulated sim-seconds
    this.realTime = 0;  // accumulated real-seconds
    this.speedMultiplier = 60; // 60x real-time by default

    this.workers = {};  // zoneId → Worker[]
    this.floaters = []; // Worker[]
    this.freeFloaters = [];

    this.currentOrder = null;  // distribution object
    this.zoneProgress = {};    // zone id → { picked, total }
    this.orderItemsPicked = 0;
    this.orderTotalItems = 0;
    this.ordersCompleted = 0;

    this.activePickersCount = 0;
    this.floatersDeployedCount = 0;

    this._initWorkers();
    this._initUI();
  }

  _initWorkers() {
    // Zone workers
    Object.values(ZONES).forEach(zone => {
      this.workers[zone.id] = [];
      zone.aisleIdxs.forEach(ai => {
        const perAisle = Math.ceil(zone.workerCount / zone.aisleIdxs.length);
        for (let s = 0; s < perAisle; s++) {
          if (this.workers[zone.id].length >= zone.workerCount) break;
          const w = new Worker({
            zoneId: zone.id,
            aisleIdx: ai,
            slotIndex: s,
            isFloater: false,
            scene: this.scene,
          });
          this.workers[zone.id].push(w);
        }
      });
    });

    // Floaters (start at consolidation area)
    for (let f = 0; f < FLOATER_COUNT; f++) {
      const w = new Worker({
        zoneId: 'A',          // default zone, will change when dispatched
        aisleIdx: 0,
        slotIndex: f,
        isFloater: true,
        scene: this.scene,
      });
      this.floaters.push(w);
      this.freeFloaters.push(w);
    }
  }

  _initUI() {
    this.ui.buildZoneStatusList(ZONES);
    this.ui.buildZoneStrip(ZONES);
    // zone dist cards are built dynamically inside showOrderDistribution()

    document.getElementById('btn-start').addEventListener('click', () => this.start());
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-reset').addEventListener('click', () => this.reset());
    document.getElementById('btn-new-order').addEventListener('click', () => this._generateOrder());

    // Speed slider binding
    const speedInput = document.getElementById('input-speed');
    const speedLabel = document.getElementById('speed-label');
    const topBadge = document.querySelector('.speed-badge');
    speedInput.addEventListener('input', (e) => {
      this.speedMultiplier = parseInt(e.target.value);
      speedLabel.textContent = this.speedMultiplier;
      topBadge.textContent = this.speedMultiplier + '×';
    });
  }

  _generateOrder() {
    const skusInput  = parseInt(document.getElementById('input-skus').value)  || 20;
    const itemsInput = parseInt(document.getElementById('input-items').value) || 80;
    const numSkus  = Math.max(1, Math.min(skusInput,  500));
    const numItems = Math.max(numSkus, Math.min(itemsInput, 5000));

    this.currentOrder = distributeOrder(numSkus, numItems);
    this.orderTotalItems = numItems;
    this.orderItemsPicked = 0;

    // Init zone progress
    Object.keys(ZONES).forEach(zk => {
      this.zoneProgress[zk] = { picked: 0, total: this.currentOrder[zk].items };
    });

    this.ui.showOrderDistribution(this.currentOrder, numSkus, numItems);
    this.ui.updateZoneStrip(this.currentOrder, this.zoneProgress, {});
    this.ui.log(`New order: ${numSkus} SKUs / ${numItems} items distributed across zones`, 'info');

    // Update 3D zone panels
    Object.keys(ZONES).forEach(zk => {
      const zd = this.currentOrder[zk];
      this.wb.updatePanel(zk, {
        skus: zd.skus, items: zd.items, picked: 0,
        workers: ZONES[zk].workerCount,
        activeWorkers: 0,
        status: zd.items > 0 ? 'QUEUED' : 'IDLE',
        floater: false,
      });
    });

    document.getElementById('order-progress-wrap').style.display = 'block';
    this.ui.log('Order generated — press Start to begin simulation', 'warn');
  }

  start() {
    if (!this.currentOrder) {
      this._generateOrder();
    }
    this._dispatchOrder();
    this.running = true;
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-pause').disabled = false;
    this.ui.log('Simulation started', 'success');
  }

  togglePause() {
    this.running = !this.running;
    document.getElementById('btn-pause').textContent = this.running ? '⏸ Pause' : '▶ Resume';
    this.ui.log(this.running ? 'Resumed' : 'Paused', 'info');
  }

  reset() {
    this.running = false;
    this.simTime = 0;
    this.realTime = 0;
    this.orderItemsPicked = 0;
    this.activePickersCount = 0;
    this.floatersDeployedCount = 0;
    this.ordersCompleted = 0;
    this.currentOrder = null;

    // Reset workers
    Object.values(this.workers).flat().forEach(w => w.setIdle());
    this.floaters.forEach(w => { w.setIdle(); w.zoneId = 'A'; w.aisleIdx = 0; });
    this.freeFloaters = [...this.floaters];

    // Reset UI
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-pause').disabled = true;
    document.getElementById('btn-pause').textContent = '⏸ Pause';
    document.getElementById('order-progress-wrap').style.display = 'none';
    document.getElementById('order-distribution').classList.add('hidden');
    this.ui.resetStats();
    this.ui.updateClock(0, 0);

    Object.keys(ZONES).forEach(zk => {
      this.wb.updatePanel(zk, { skus: 0, items: 0, picked: 0, workers: ZONES[zk].workerCount, status: 'IDLE' });
      this.ui.updateZoneStatus(zk, { picked: 0, total: 0, status: 'IDLE', floater: false });
      this.ui.updateZoneCard(zk, { skus: 0, items: 0, picked: 0, status: 'IDLE', floater: false });
    });
    this.ui.log('Simulation reset', 'info');
  }

  _dispatchOrder() {
    if (!this.currentOrder) return;

    Object.keys(ZONES).forEach(zk => {
      const zd = this.currentOrder[zk];
      if (!zd.picks || zd.picks.length === 0) return;

      const zoneWorkers = this.workers[zk].filter(w => w.isAvailable);

      // Check for overload: picks per worker ratio
      const picksPerWorker = zd.picks.length / zoneWorkers.length;
      let extraWorker = null;
      if (picksPerWorker > OVERLOAD_THRESHOLD && this.freeFloaters.length > 0) {
        extraWorker = this.freeFloaters.pop();
        extraWorker.zoneId = zk;
        const aisleIdx = ZONES[zk].aisleIdxs[0];
        extraWorker.aisleIdx = aisleIdx;
        this.floatersDeployedCount++;
        this.ui.log(`⭐ Floater dispatched to Zone ${zk} (${zd.picks.length} picks, ${zoneWorkers.length} workers)`, 'warn');
      }

      const allWorkers = extraWorker ? [...zoneWorkers, extraWorker] : zoneWorkers;
      if (allWorkers.length === 0) return;

      // Distribute picks round-robin across available workers
      const workerQueues = allWorkers.map(() => []);
      zd.picks.forEach((pick, i) => workerQueues[i % allWorkers.length].push(pick));

      // Track how many active workers per zone for panel updates
      let zoneActive = 0;

      allWorkers.forEach((worker, wi) => {
        if (workerQueues[wi].length === 0) return;
        zoneActive++;

        worker.assignPicks(
          workerQueues[wi],
          (zoneId) => {
            // On each item picked
            this.zoneProgress[zoneId].picked++;
            this.orderItemsPicked++;
            this._updatePanelForZone(zoneId);
            this._updateUIStats();
          },
          (zoneId) => {
            // On drop complete
            this.activePickersCount = Math.max(0, this.activePickersCount - 1);
            this._updateUIStats();
            this.ui.log(`Zone ${zoneId} worker dropped items at consolidation`, 'pick');

            // Check order complete
            const allDone = Object.keys(ZONES).every(z =>
              (this.zoneProgress[z]?.picked || 0) >= (this.zoneProgress[z]?.total || 0)
            );
            if (allDone && this.orderTotalItems > 0) {
              this.ordersCompleted++;
              this.running = false; // Stop the simulation & timer
              this.ui.log(`✅ Order complete! All ${this.orderTotalItems} items picked in ${this._formatSimTime(this.simTime)}`, 'success');
              document.getElementById('stat-orders').textContent = this.ordersCompleted;
            }
          }
        );
        this.activePickersCount++;
      });

      this.wb.updatePanel(zk, {
        skus: zd.skus, items: zd.items, picked: 0,
        workers: allWorkers.length,
        activeWorkers: zoneActive,
        status: 'PICKING',
        floater: extraWorker !== null,
      });
    });

    this._updateUIStats();
  }

  _updatePanelForZone(zoneId) {
    const zp = this.zoneProgress[zoneId];
    const zd = this.currentOrder[zoneId];
    this.wb.updatePanel(zoneId, {
      skus: zd.skus,
      items: zd.items,
      picked: zp.picked,
      workers: ZONES[zoneId].workerCount,
      activeWorkers: this.workers[zoneId].filter(w => w.state !== STATE.IDLE).length,
      status: zp.picked >= zp.total ? 'DONE' : 'PICKING',
      floater: this.floaters.some(f => f.zoneId === zoneId && f.state !== STATE.IDLE),
    });
    this.ui.updateZoneStatus(zoneId, {
      picked: zp.picked, total: zp.total,
      status: zp.picked >= zp.total ? 'DONE' : 'PICKING',
      floater: this.floaters.some(f => f.zoneId === zoneId && f.state !== STATE.IDLE),
    });
    this.ui.updateZoneCard(zoneId, {
      skus: zd.skus, items: zd.items, picked: zp.picked,
      status: zp.picked >= zp.total ? 'DONE' : 'PICKING',
      floater: this.floaters.some(f => f.zoneId === zoneId && f.state !== STATE.IDLE),
    });
    this.ui.updateDistCard(zoneId, zp.picked, zp.total);
  }

  _updateUIStats() {
    document.getElementById('stat-items-picked').textContent = this.orderItemsPicked;
    document.getElementById('stat-active').textContent = this.activePickersCount;
    document.getElementById('stat-floaters').textContent = this.floatersDeployedCount;

    const pct = this.orderTotalItems > 0
      ? Math.min(100, Math.round(this.orderItemsPicked / this.orderTotalItems * 100))
      : 0;
    document.getElementById('op-pct').textContent = `${pct}%`;
    document.getElementById('op-bar-fill').style.width = `${pct}%`;
  }

  tick(realDelta) {
    if (!this.running) return;

    const simDelta = realDelta * this.speedMultiplier;
    this.simTime  += simDelta;
    this.realTime += realDelta;

    const time = performance.now() / 1000;

    // Update all workers
    Object.values(this.workers).flat().forEach(w => w.update(simDelta, time));
    this.floaters.forEach(w => w.update(simDelta, time));

    // Clock update
    this.ui.updateClock(this.simTime, this.realTime);
  }

  _formatSimTime(simSec) {
    const h = Math.floor(simSec / 3600);
    const m = Math.floor((simSec % 3600) / 60);
    const s = Math.floor(simSec % 60);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
}
