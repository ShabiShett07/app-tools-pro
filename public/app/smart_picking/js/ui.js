import { ZONES } from './constants.js';

export class UI {
  constructor() {
    this._zoneStatusEls = {};
    this._zoneCardEls = {};
    this._distCardEls = {};
  }

  // ── Clock ──────────────────────────────────────────────────────────────────
  updateClock(simSec, realSec) {
    document.getElementById('clock-display').textContent = this._fmt(simSec);
    const rm = Math.floor(realSec / 60), rs = Math.floor(realSec % 60);
    document.getElementById('clock-real').textContent =
      `${String(rm).padStart(2,'0')}:${String(rs).padStart(2,'0')}`;
  }

  _fmt(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  // ── Activity Log ──────────────────────────────────────────────────────────
  log(msg, type = 'info') {
    const log = document.getElementById('activity-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    log.insertBefore(entry, log.firstChild);
    if (log.children.length > 60) log.removeChild(log.lastChild);
  }

  // ── Order distribution overlay ────────────────────────────────────────────
  showOrderDistribution(dist, totalSkus, totalItems) {
    document.getElementById('dist-total-label').textContent =
      `${totalSkus} SKUs · ${totalItems} items`;
    const container = document.getElementById('zone-dist-cards');
    container.innerHTML = '';

    Object.keys(ZONES).forEach(zk => {
      const zone = ZONES[zk];
      const zd = dist[zk];
      const card = document.createElement('div');
      card.className = 'zone-dist-card';
      card.style.borderColor = zone.hex + '55';
      card.style.background  = zone.hex + '0d';
      card.id = `dist-card-${zk}`;
      card.innerHTML = `
        <div class="zdc-zone-name" style="color:${zone.hex}">${zone.label}</div>
        <div class="zdc-skus">${zd.skus} SKUs</div>
        <div class="zdc-items">${zd.items} items</div>
        <div class="zdc-bar-bg"><div class="zdc-bar-fill" id="dist-bar-${zk}" style="background:${zone.hex};width:0%"></div></div>
        <div class="zdc-pct" id="dist-pct-${zk}">0%</div>
      `;
      container.appendChild(card);
      this._distCardEls[zk] = { bar: null, pct: null };
    });
    document.getElementById('order-distribution').classList.remove('hidden');
  }

  updateDistCard(zoneId, picked, total) {
    const bar = document.getElementById(`dist-bar-${zoneId}`);
    const pct = document.getElementById(`dist-pct-${zoneId}`);
    if (!bar || !pct) return;
    const p = total > 0 ? Math.min(100, Math.round(picked / total * 100)) : 0;
    bar.style.width = `${p}%`;
    pct.textContent = `${p}% picked`;
  }

  // ── Right-panel zone status list ──────────────────────────────────────────
  buildZoneStatusList(zones) {
    const container = document.getElementById('zone-status-list');
    container.innerHTML = '';
    Object.values(zones).forEach(zone => {
      const el = document.createElement('div');
      el.className = 'zone-status-item';
      el.id = `zsi-${zone.id}`;
      el.innerHTML = `
        <div class="zsi-dot" style="background:${zone.hex};box-shadow:0 0 6px ${zone.hex}"></div>
        <div class="zsi-info">
          <div class="zsi-name">${zone.label}</div>
          <div class="zsi-detail" id="zsi-detail-${zone.id}">${zone.aisleLabel} · ${zone.workerCount} workers</div>
          <div class="zsi-bar-bg"><div class="zsi-bar-fill" id="zsi-bar-${zone.id}" style="background:${zone.hex};width:0%"></div></div>
        </div>
        <div class="zsi-badge idle" id="zsi-badge-${zone.id}">IDLE</div>
      `;
      container.appendChild(el);
    });
  }

  updateZoneStatus(zoneId, { picked, total, status, floater }) {
    const detail = document.getElementById(`zsi-detail-${zoneId}`);
    const bar    = document.getElementById(`zsi-bar-${zoneId}`);
    const badge  = document.getElementById(`zsi-badge-${zoneId}`);
    if (!detail) return;

    const pct = total > 0 ? Math.min(100, Math.round(picked / total * 100)) : 0;
    detail.textContent = total > 0
      ? `${picked}/${total} items · ${pct}%`
      : `${ZONES[zoneId].aisleLabel} · ${ZONES[zoneId].workerCount} workers`;

    if (bar) bar.style.width = `${pct}%`;

    if (badge) {
      badge.className = `zsi-badge ${status === 'IDLE' ? 'idle' : status === 'DONE' ? '' : floater ? 'floater' : 'active'}`;
      badge.textContent = floater && status !== 'DONE' ? '⭐ FLOATER' : status;
    }
  }

  // ── Bottom zone strip ─────────────────────────────────────────────────────
  buildZoneStrip(zones) {
    const strip = document.getElementById('zone-cards-strip');
    strip.innerHTML = '';
    Object.values(zones).forEach(zone => {
      const card = document.createElement('div');
      card.className = 'zone-card';
      card.id = `zcard-${zone.id}`;
      card.style.setProperty('--zc-color', zone.hex);
      card.style.setProperty('--zc-rgbc', zone.rgb.join(','));
      card.innerHTML = `
        <div class="zc-header">
          <div class="zc-dot" style="background:${zone.hex};box-shadow:0 0 8px ${zone.hex}"></div>
          <div class="zc-name">${zone.label}</div>
          <div class="zc-aisles">${zone.aisleLabel}</div>
        </div>
        <div class="zc-stats">
          <div class="zc-stat-item">
            <div class="zc-stat-val" id="zc-skus-${zone.id}">—</div>
            <div class="zc-stat-lbl">SKUs</div>
          </div>
          <div class="zc-stat-item">
            <div class="zc-stat-val" id="zc-items-${zone.id}">—</div>
            <div class="zc-stat-lbl">Items</div>
          </div>
          <div class="zc-stat-item">
            <div class="zc-stat-val" id="zc-picked-${zone.id}" style="color:${zone.hex}">0</div>
            <div class="zc-stat-lbl">Picked</div>
          </div>
          <div class="zc-stat-item">
            <div class="zc-stat-val" id="zc-pct-${zone.id}">0%</div>
            <div class="zc-stat-lbl">Done</div>
          </div>
        </div>
        <div class="zc-bar-bg">
          <div class="zc-bar-fill" id="zc-bar-${zone.id}" style="background:linear-gradient(90deg,${zone.hex},${zone.hex}aa);width:0%"></div>
        </div>
        <div class="zc-status" id="zc-status-${zone.id}" style="color:${zone.hex}">IDLE · ${zone.workerCount} pickers</div>
      `;
      strip.appendChild(card);
    });
  }

  updateZoneStrip(dist, progress, floaterMap) {
    Object.keys(ZONES).forEach(zk => {
      const zd = dist[zk];
      const zp = progress[zk] || { picked: 0, total: zd.items };
      const el = document.getElementById(`zcard-${zk}`);
      if (!el) return;
      const skusEl   = document.getElementById(`zc-skus-${zk}`);
      const itemsEl  = document.getElementById(`zc-items-${zk}`);
      if (skusEl)  skusEl.textContent  = zd.skus || '—';
      if (itemsEl) itemsEl.textContent = zd.items || '—';
    });
  }

  updateZoneCard(zoneId, { skus, items, picked, status, floater }) {
    const el       = document.getElementById(`zcard-${zoneId}`);
    const skusEl   = document.getElementById(`zc-skus-${zoneId}`);
    const itemsEl  = document.getElementById(`zc-items-${zoneId}`);
    const pickedEl = document.getElementById(`zc-picked-${zoneId}`);
    const pctEl    = document.getElementById(`zc-pct-${zoneId}`);
    const barEl    = document.getElementById(`zc-bar-${zoneId}`);
    const statEl   = document.getElementById(`zc-status-${zoneId}`);
    if (!el) return;

    const pct = items > 0 ? Math.min(100, Math.round(picked / items * 100)) : 0;
    if (skusEl)   skusEl.textContent   = skus  || '—';
    if (itemsEl)  itemsEl.textContent  = items || '—';
    if (pickedEl) pickedEl.textContent = picked;
    if (pctEl)    pctEl.textContent    = `${pct}%`;
    if (barEl)    barEl.style.width    = `${pct}%`;

    if (statEl) {
      const zone = ZONES[zoneId];
      statEl.textContent = floater
        ? `⭐ FLOATER ASSIST · ${status}`
        : `${status} · ${zone.workerCount} pickers`;
    }

    if (el) {
      el.classList.toggle('active', status === 'PICKING' || status === 'DROPPING');
      el.classList.toggle('floater-assist', floater && status !== 'DONE' && status !== 'IDLE');
    }
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  resetStats() {
    document.getElementById('stat-items-picked').textContent = '0';
    document.getElementById('stat-orders').textContent = '0';
    document.getElementById('stat-active').textContent = '0';
    document.getElementById('stat-floaters').textContent = '0';
    document.getElementById('op-pct').textContent = '0%';
    document.getElementById('op-bar-fill').style.width = '0%';

    Object.keys(ZONES).forEach(zk => {
      const pct = document.getElementById(`zc-pct-${zk}`);
      const bar = document.getElementById(`zc-bar-${zk}`);
      const picked = document.getElementById(`zc-picked-${zk}`);
      const skus = document.getElementById(`zc-skus-${zk}`);
      const items = document.getElementById(`zc-items-${zk}`);
      if (pct) pct.textContent = '0%';
      if (bar) bar.style.width = '0%';
      if (picked) picked.textContent = '0';
      if (skus) skus.textContent = '—';
      if (items) items.textContent = '—';
    });
  }
}
