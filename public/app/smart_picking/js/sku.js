import {
  ZONES, AISLE_X, AISLE_HALF_LEN, RACK_DEPTH, AISLE_W,
  SHELF_Y, TOTAL_SKUS, FAST_SKUS
} from './constants.js';

// SKU database (in-memory, not rendered individually)
let skuDb = null;

function buildSkuDatabase() {
  if (skuDb) return skuDb;
  const db = [];
  const zoneKeys = Object.keys(ZONES);

  const DB_SIZE = 10000; // model 10K representative SKUs (covers fast-moving set)
  for (let id = 0; id < DB_SIZE; id++) {
    const isFast = id < FAST_SKUS;
    // Distribute SKUs across zones roughly proportionally to aisle count
    const totalAisles = zoneKeys.reduce((s, z) => s + ZONES[z].aisleIdxs.length, 0);
    let rnd = Math.random() * totalAisles;
    let chosenZone = zoneKeys[0];
    let chosenAisle = ZONES[chosenZone].aisleIdxs[0];
    for (const zk of zoneKeys) {
      const cnt = ZONES[zk].aisleIdxs.length;
      if (rnd < cnt) {
        chosenZone = zk;
        const aisleOffset = Math.floor(rnd);
        chosenAisle = ZONES[zk].aisleIdxs[Math.min(aisleOffset, ZONES[zk].aisleIdxs.length - 1)];
        break;
      }
      rnd -= cnt;
    }

    // Fast-moving: waist shelf (1); slow: top (2) or bottom (0)
    const shelfLevel = isFast ? 1 : (Math.random() < 0.5 ? 2 : 0);

    // Random position along aisle
    const binZ = -AISLE_HALF_LEN + Math.random() * AISLE_HALF_LEN * 2;
    const side = Math.random() < 0.5 ? -1 : 1;
    const binX = AISLE_X[chosenAisle] + side * (AISLE_W / 2 + RACK_DEPTH / 2);

    db.push({ id, zone: chosenZone, aisleIdx: chosenAisle, x: binX, z: binZ, shelfLevel, isFast });
  }
  skuDb = db;
  return db;
}

export function getSkuDatabase() {
  return buildSkuDatabase();
}

/**
 * Given an order (numSkus, numItems), distribute picks across zones.
 * Returns an object: { A: {skus, items, picks:[{skuId,binPos,shelfLevel}]}, B: ..., ... }
 */
export function distributeOrder(numSkus, numItems) {
  const db = buildSkuDatabase();

  // Sample numSkus unique random SKUs
  const shuffled = db.slice().sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(numSkus, db.length));

  // Distribute quantities across the selected SKUs
  const qtys = new Array(selected.length).fill(1);
  let remaining = Math.max(0, numItems - selected.length);
  // Give extra items to random SKUs (batch for large quantities)
  const batchSize = Math.max(1, Math.floor(remaining / 50));
  while (remaining > 0) {
    const idx = Math.floor(Math.random() * selected.length);
    const give = Math.min(batchSize, remaining);
    qtys[idx] += give;
    remaining -= give;
  }

  // Group by zone
  const distribution = {};
  Object.keys(ZONES).forEach(zk => {
    distribution[zk] = { zone: zk, skus: 0, items: 0, picks: [] };
  });

  selected.forEach((sku, i) => {
    const qty = qtys[i];
    const zd = distribution[sku.zone];
    zd.skus++;
    zd.items += qty;
    // Each unit = one pick visit to the bin
    for (let q = 0; q < qty; q++) {
      zd.picks.push({
        skuId: sku.id,
        x: sku.x,
        z: sku.z,
        shelfLevel: sku.shelfLevel,
        isFast: sku.isFast,
        aisleIdx: sku.aisleIdx,
      });
    }
  });

  // Sort picks by Z position for efficient route (nearest-first heuristic)
  Object.values(distribution).forEach(zd => {
    zd.picks.sort((a, b) => a.z - b.z);
  });

  return distribution;
}
