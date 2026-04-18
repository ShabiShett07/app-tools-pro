// ─── CONSTANTS ───────────────────────────────────────────────────────────────

export const SIM_SPEED = 60; // 1 real minute = 1 simulation second

export const WAREHOUSE = {
  width: 62,
  depth: 30,
  wallH: 7,
};

export const AISLE_X = [-24, -14, -4, 6, 16, 26]; // center x of each aisle
export const AISLE_HALF_LEN = 13;   // aisle runs from z=-13 to z=+13
export const AISLE_W = 3.0;         // walking corridor width
export const RACK_DEPTH = 1.3;      // rack depth on each side
export const RACK_H = 4.5;
export const SHELF_Y = [0.6, 2.0, 3.5]; // bottom / waist / top
export const CROSS_AISLE_Z = [-13, 0, 13]; // front, mid, back
export const CONSOLIDATION = { x: 0, z: -16 }; // drop-off point (front-centre)

export const ZONES = {
  A: { id:'A', aisleIdxs:[0], color:0x29B6F6, hex:'#29B6F6', rgb:[41,182,246],  workerCount:3, label:'Zone A', aisleLabel:'Aisle 1' },
  B: { id:'B', aisleIdxs:[1], color:0x66BB6A, hex:'#66BB6A', rgb:[102,187,106], workerCount:3, label:'Zone B', aisleLabel:'Aisle 2' },
  C: { id:'C', aisleIdxs:[2,3], color:0xFFA726, hex:'#FFA726', rgb:[255,167,38], workerCount:5, label:'Zone C', aisleLabel:'Aisles 3-4' },
  D: { id:'D', aisleIdxs:[4], color:0xAB47BC, hex:'#AB47BC', rgb:[171,71,188],  workerCount:3, label:'Zone D', aisleLabel:'Aisle 5' },
  E: { id:'E', aisleIdxs:[5], color:0xEF5350, hex:'#EF5350', rgb:[239,83,80],   workerCount:2, label:'Zone E', aisleLabel:'Aisle 6' },
};

export const FLOATER_COUNT = 3;
export const TOTAL_SKUS    = 40000;
export const FAST_SKUS     = 10000;

// Real-life durations (seconds) — multiplied by SIM_SPEED for display
export const PICK_TIME_MIN = 8;   // seconds per pick (slow item, top shelf)
export const PICK_TIME_MAX = 25;
export const DROP_DWELL    = 6;   // seconds at consolidation

export const WALK_SPEED_MIN = 1.2; // m/s
export const WALK_SPEED_MAX = 1.5;

export const OVERLOAD_THRESHOLD = 10; // picks per worker → dispatch floater
