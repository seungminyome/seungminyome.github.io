/**
 * Generates SVG figures for two KAIST vorticity literature review posts.
 *
 * KAIST #1 (Brøns et al. 2014):
 *   fig1a: Poiseuille flow — velocity and vorticity profiles
 *   fig1b: Vorticity diffusion — impulsively started plate, three time steps
 *
 * KAIST #2 (Terrington et al. 2020):
 *   fig2a: Two-fluid Couette — velocity and vorticity for three viscosity ratios
 *   fig2b: Lamb vortex pair below a free surface — streamlines
 */

const fs = require("fs");
const path = require("path");

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  blue: "#1f78b4",
  blue2: "#74aed4",
  blue3: "#bdd7e7",
  red: "#d62728",
  red2: "#e8826a",
  green: "#2ca02c",
  orange: "#e6820e",
  purple: "#9467bd",
  dark: "#222222",
  mid: "#666666",
  lgray: "#e4e4e4",
  bg: "#fafafa",
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function tr(xMin, xMax, yMin, yMax, sl, sr, st, sb) {
  return {
    x: (v) => sl + ((v - xMin) / (xMax - xMin)) * (sr - sl),
    y: (v) => sb - ((v - yMin) / (yMax - yMin)) * (sb - st),
  };
}

function pts(arr) {
  return arr
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join("");
}

function rng(a, b, n) {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

function erfc(x) {
  // Abramowitz & Stegun approximation
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly =
    t *
    (0.254829592 +
      t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = poly * Math.exp(-x * x);
  return x >= 0 ? result : 2 - result;
}

function svgWrap(W, H, content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="white"/>
<style>
  text { font-family: Georgia, 'Times New Roman', serif; fill: ${C.dark}; }
  .tick { font-size: 11px; }
  .lab  { font-size: 13px; font-style: italic; }
  .ptit { font-size: 13px; font-weight: bold; }
  .ann  { font-size: 11px; font-style: italic; }
  .curve { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2.3; }
  .thin  { fill: none; stroke-linecap: round; stroke-width: 1.2; }
  .wall  { stroke: ${C.dark}; stroke-width: 3; fill: none; }
  .hatch { stroke: ${C.dark}; stroke-width: 0.9; }
  .grid  { stroke: ${C.lgray}; stroke-width: 0.7; }
  .ax    { stroke: ${C.dark}; stroke-width: 1.4; fill: none; }
  .dash  { stroke-dasharray: 5,3; }
  .surf  { stroke: ${C.blue}; stroke-width: 2; fill: none; }
</style>
${content}
</svg>`;
}

function hatchLine(x, yt, yb, dx, dy) {
  return `<line x1="${x.toFixed(1)}" y1="${yt.toFixed(1)}" x2="${(x + dx).toFixed(1)}" y2="${(yt + dy).toFixed(1)}" class="hatch"/>
<line x1="${x.toFixed(1)}" y1="${yb.toFixed(1)}" x2="${(x + dx).toFixed(1)}" y2="${(yb - dy).toFixed(1)}" class="hatch"/>`;
}

function panelRect(P) {
  return `<rect x="${P.l}" y="${P.t}" width="${P.r - P.l}" height="${P.b - P.t}" fill="${C.bg}" stroke="#ccc" stroke-width="0.5"/>`;
}

// ── Figure 1a: Poiseuille Flow ───────────────────────────────────────────────

function fig1a() {
  const W = 660,
    H = 300;
  const mt = 38,
    mb = 55,
    ml = 58,
    mr = 22,
    gap = 52;
  const pw = (W - ml - mr - gap) / 2;
  const ph = H - mt - mb;

  const P1 = { l: ml, r: ml + pw, t: mt, b: mt + ph };
  const P2 = { l: ml + pw + gap, r: W - mr, t: mt, b: mt + ph };

  const N = 200;
  const ys = rng(-1, 1, N);
  const T1 = tr(-0.04, 1.1, -1.06, 1.06, P1.l, P1.r, P1.t, P1.b);
  const T2 = tr(-2.3, 2.3, -1.06, 1.06, P2.l, P2.r, P2.t, P2.b);

  const velCurve = pts(ys.map((y) => [T1.x(1 - y * y), T1.y(y)]));
  const vorCurve = pts(ys.map((y) => [T2.x(2 * y), T2.y(y)]));

  // grids
  let g = "";
  for (const y of [-1, -0.5, 0, 0.5, 1]) {
    g += `<line x1="${P1.l}" y1="${T1.y(y)}" x2="${P1.r}" y2="${T1.y(y)}" class="grid"/>`;
    g += `<line x1="${P2.l}" y1="${T2.y(y)}" x2="${P2.r}" y2="${T2.y(y)}" class="grid"/>`;
  }
  for (const u of [0.25, 0.5, 0.75, 1.0])
    g += `<line x1="${T1.x(u)}" y1="${P1.t}" x2="${T1.x(u)}" y2="${P1.b}" class="grid"/>`;
  for (const w of [-2, -1, 1, 2])
    g += `<line x1="${T2.x(w)}" y1="${P2.t}" x2="${T2.x(w)}" y2="${P2.b}" class="grid"/>`;

  // walls + hatches
  let walls = "";
  for (const P of [P1, P2]) {
    const T = P === P1 ? T1 : T2;
    const x0 = P.l,
      x1 = P.r;
    walls += `<line x1="${x0}" y1="${T.y(1)}" x2="${x1}" y2="${T.y(1)}" class="wall"/>`;
    walls += `<line x1="${x0}" y1="${T.y(-1)}" x2="${x1}" y2="${T.y(-1)}" class="wall"/>`;
    const dx = P.r - P.l;
    for (let f = 0; f <= 1.02; f += 0.06) {
      const x = P.l + f * dx;
      walls += hatchLine(x, T.y(1), T.y(-1), -5, -7);
    }
  }

  // axes
  const axes = `
<line x1="${P1.l}" y1="${T1.y(-1.0)}" x2="${P1.r}" y2="${T1.y(-1.0)}" class="ax"/>
<line x1="${P1.l}" y1="${P1.b}" x2="${P1.l}" y2="${P1.t - 6}" class="ax"/>
<line x1="${T2.x(0)}" y1="${P2.t}" x2="${T2.x(0)}" y2="${P2.b}" class="ax dash"/>
<line x1="${P2.l}" y1="${P2.b}" x2="${P2.l}" y2="${P2.t - 6}" class="ax"/>
<line x1="${P2.l}" y1="${T2.y(0)}" x2="${P2.r}" y2="${T2.y(0)}" class="ax"/>`;

  // ticks
  let ticks = "";
  for (const y of [-1, -0.5, 0, 0.5, 1]) {
    ticks += `<text x="${P1.l - 5}" y="${T1.y(y) + 4}" text-anchor="end" class="tick">${y}</text>`;
    ticks += `<text x="${P2.l - 5}" y="${T2.y(y) + 4}" text-anchor="end" class="tick">${y}</text>`;
  }
  for (const u of [0, 0.5, 1.0])
    ticks += `<text x="${T1.x(u)}" y="${P1.b + 16}" text-anchor="middle" class="tick">${u.toFixed(1)}</text>`;
  for (const w of [-2, -1, 0, 1, 2])
    ticks += `<text x="${T2.x(w)}" y="${P2.b + 16}" text-anchor="middle" class="tick">${w}</text>`;

  // labels
  const cx1 = (P1.l + P1.r) / 2,
    cx2 = (P2.l + P2.r) / 2,
    cy = (mt + H - mb) / 2;
  const labels = `
<text x="${cx1}" y="${H - 8}" text-anchor="middle" class="lab">u / u<tspan dy="3" font-size="9">max</tspan></text>
<text transform="rotate(-90 ${ml - 40} ${cy})" x="${ml - 40}" y="${cy + 5}" text-anchor="middle" class="lab">y / h</text>
<text x="${cx2}" y="${H - 8}" text-anchor="middle" class="lab">ω · h / U</text>
<text transform="rotate(-90 ${P2.l - 40} ${cy})" x="${P2.l - 40}" y="${cy + 5}" text-anchor="middle" class="lab">y / h</text>
<text x="${cx1}" y="${mt - 12}" text-anchor="middle" class="ptit">(a)  Velocity Profile</text>
<text x="${cx2}" y="${mt - 12}" text-anchor="middle" class="ptit">(b)  Vorticity Profile</text>
<text x="${T1.x(0.82)}" y="${T1.y(0.0) - 14}" fill="${C.blue}" class="ann">u = U(1 − y²/h²)</text>
<text x="${T2.x(1.55)}" y="${T2.y(0.72)}" fill="${C.red}" class="ann">ω = 2Uy/h</text>`;

  return svgWrap(
    W,
    H,
    `${panelRect(P1)}${panelRect(P2)}${g}${walls}${axes}
<path d="${velCurve}" class="curve" stroke="${C.blue}"/>
<path d="${vorCurve}" class="curve" stroke="${C.red}"/>
${ticks}${labels}`
  );
}

// ── Figure 1b: Vorticity Diffusion ──────────────────────────────────────────
// Impulsively started flat plate; exact solution: ω(y,t) ∝ exp(−y²/4νt)
// Normalised: δ = √(νt)/h; ω̃ = ω·h/U = (1/δ√π)·exp(−ỹ²/4δ²)  (ỹ = y/h)

function fig1b() {
  const W = 620,
    H = 320;
  const mt = 38,
    mb = 55,
    ml = 62,
    mr = 30;
  const P = { l: ml, r: W - mr, t: mt, b: H - mb };
  const N = 300;

  // Three diffusion times (normalised δ = √(νt)/h)
  const deltas = [0.08, 0.2, 0.45];
  const colors = [C.blue, C.orange, C.red];
  const labels_d = ["t₁", "t₂", "t₃"];

  const yMax = 1.0;
  const wMax = 6.0;
  const T = tr(-0.05, wMax * 1.05, -0.02, yMax * 1.05, P.l, P.r, P.t, P.b);

  // Steady-state: ω = constant = 1 (Couette)
  const ys = rng(0, yMax, N);
  const steadyCurve = pts([
    [T.x(1.0), T.y(0)],
    [T.x(1.0), T.y(yMax)],
  ]);

  // Diffusion curves: ω(y) = (1/(δ√π))·exp(−y²/(4δ²))
  const curves = deltas.map((d) => {
    const arr = ys.map((y) => {
      const w = (1 / (d * Math.sqrt(Math.PI))) * Math.exp((-y * y) / (4 * d * d));
      return [T.x(Math.min(w, wMax * 0.98)), T.y(y)];
    });
    return pts(arr);
  });

  // Grid
  let g = "";
  for (const y of [0.2, 0.4, 0.6, 0.8, 1.0])
    g += `<line x1="${P.l}" y1="${T.y(y)}" x2="${P.r}" y2="${T.y(y)}" class="grid"/>`;
  for (const w of [1, 2, 3, 4, 5])
    g += `<line x1="${T.x(w)}" y1="${P.t}" x2="${T.x(w)}" y2="${P.b}" class="grid"/>`;

  // Wall (y=0)
  const wall = `<line x1="${P.l}" y1="${T.y(0)}" x2="${P.r}" y2="${T.y(0)}" class="wall"/>`;
  // Hatch on wall
  let hatch = "";
  for (let f = 0; f <= 1.02; f += 0.04)
    hatch += `<line x1="${P.l + f * (P.r - P.l)}" y1="${T.y(0)}" x2="${P.l + f * (P.r - P.l) - 5}" y2="${T.y(0) + 7}" class="hatch"/>`;

  // Axes
  const axes = `
<line x1="${P.l}" y1="${T.y(0)}" x2="${P.r}" y2="${T.y(0)}" class="ax"/>
<line x1="${P.l}" y1="${P.b}" x2="${P.l}" y2="${P.t - 6}" class="ax"/>`;

  // Ticks
  let ticks = "";
  for (const y of [0.2, 0.4, 0.6, 0.8, 1.0])
    ticks += `<text x="${P.l - 6}" y="${T.y(y) + 4}" text-anchor="end" class="tick">${y.toFixed(1)}</text>`;
  for (const w of [0, 1, 2, 3, 4, 5])
    ticks += `<text x="${T.x(w)}" y="${P.b + 16}" text-anchor="middle" class="tick">${w}</text>`;

  // Legend
  let legend = "";
  const lx = T.x(wMax * 0.6),
    ly0 = T.y(yMax * 0.9);
  deltas.forEach((_, i) => {
    const ly = ly0 + i * 20;
    legend += `<line x1="${lx}" y1="${ly}" x2="${lx + 28}" y2="${ly}" stroke="${colors[i]}" stroke-width="2.3" fill="none"/>`;
    legend += `<text x="${lx + 34}" y="${ly + 4}" class="tick" fill="${colors[i]}">${labels_d[i]}</text>`;
  });
  legend += `<line x1="${lx}" y1="${ly0 + 60}" x2="${lx + 28}" y2="${ly0 + 60}" stroke="${C.green}" stroke-width="1.5" stroke-dasharray="6,3" fill="none"/>`;
  legend += `<text x="${lx + 34}" y="${ly0 + 64}" class="tick" fill="${C.green}">steady</text>`;

  // Labels
  const cx = (P.l + P.r) / 2,
    cy = (P.t + P.b) / 2;
  const labs = `
<text x="${cx}" y="${H - 8}" text-anchor="middle" class="lab">ω · h / U</text>
<text transform="rotate(-90 ${ml - 42} ${cy})" x="${ml - 42}" y="${cy + 5}" text-anchor="middle" class="lab">y / h</text>
<text x="${cx}" y="${mt - 12}" text-anchor="middle" class="ptit">Vorticity diffusion from an impulsively started wall</text>
<text x="${T.x(wMax * 0.48)}" y="${T.y(0.03)}" text-anchor="middle" class="ann">moving wall (u = U at y = 0)</text>
<text x="${T.x(wMax * 0.05)}" y="${T.y(yMax * 0.9)}" class="ann" fill="${C.mid}">fluid</text>`;

  const curveSVG = curves
    .map(
      (d, i) =>
        `<path d="${d}" class="curve" stroke="${colors[i]}"/>`
    )
    .join("");

  return svgWrap(
    W,
    H,
    `${panelRect(P)}${g}${wall}${hatch}${axes}
${curveSVG}
<path d="${steadyCurve}" class="thin dash" stroke="${C.green}"/>
${ticks}${legend}${labs}`
  );
}

// ── Figure 2a: Two-Fluid Couette ─────────────────────────────────────────────

function fig2a() {
  const W = 660,
    H = 310;
  const mt = 38,
    mb = 55,
    ml = 58,
    mr = 22,
    gap = 52;
  const pw = (W - ml - mr - gap) / 2;
  const ph = H - mt - mb;

  const P1 = { l: ml, r: ml + pw, t: mt, b: mt + ph };
  const P2 = { l: ml + pw + gap, r: W - mr, t: mt, b: mt + ph };

  // Viscosity ratios μ₁/μ₂ = 0.25, 1, 4
  // Bottom plate at y=−1 moves at u=−1; top at y=+1 moves at u=+1
  // Interface at y=0, equal layer thicknesses h=1
  // A₂ = 2μ₁/(μ₁+μ₂), A₁ = 2μ₂/(μ₁+μ₂), u_int = (μ₁−μ₂)/(μ₁+μ₂)
  // ω₁ = −A₁, ω₂ = −A₂ (constant per layer)

  const cases = [
    { r: 0.25, color: C.blue, label: "μ₁/μ₂ = ¼" },
    { r: 1.0, color: C.green, label: "μ₁/μ₂ = 1" },
    { r: 4.0, color: C.red, label: "μ₁/μ₂ = 4" },
  ];

  const T1 = tr(-1.15, 1.15, -1.08, 1.08, P1.l, P1.r, P1.t, P1.b);
  // vorticity: range determined by cases
  const T2 = tr(-2.3, 2.3, -1.08, 1.08, P2.l, P2.r, P2.t, P2.b);

  let velCurves = "",
    vorCurves = "";

  cases.forEach(({ r, color }) => {
    const mu1 = r,
      mu2 = 1.0;
    const A2 = (2 * mu1) / (mu1 + mu2);
    const A1 = (2 * mu2) / (mu1 + mu2);
    const u_int = (mu1 - mu2) / (mu1 + mu2);

    // velocity: piecewise linear
    // layer 1 (y from -1 to 0): u = -1 + (u_int+1)*(y+1)  (linear from -1 to u_int)
    // layer 2 (y from 0 to 1):  u = u_int + (1-u_int)*y   (linear from u_int to 1)
    const velPts = [
      [T1.x(-1.0), T1.y(-1)],
      [T1.x(u_int), T1.y(0)],
      [T1.x(1.0), T1.y(1)],
    ];
    velCurves += `<path d="${pts(velPts)}" class="curve" stroke="${color}"/>`;

    // vorticity: constant per layer with jump
    const w1 = -A1; // = -2μ₂/(μ₁+μ₂)
    const w2 = -A2; // = -2μ₁/(μ₁+μ₂)
    const vorPts = [
      [T2.x(w1), T2.y(-1.0)],
      [T2.x(w1), T2.y(0)],
      [T2.x(w2), T2.y(0)],
      [T2.x(w2), T2.y(1.0)],
    ];
    vorCurves += `<path d="${pts(vorPts)}" class="curve" stroke="${color}"/>`;
    // vertical jump at interface
    vorCurves += `<path d="${pts([[T2.x(w1), T2.y(0)], [T2.x(w2), T2.y(0)]])}" class="thin" stroke="${color}" stroke-dasharray="4,2"/>`;
  });

  // Interface line
  const intf1 = `<line x1="${P1.l}" y1="${T1.y(0)}" x2="${P1.r}" y2="${T1.y(0)}" stroke="#999" stroke-width="1" stroke-dasharray="5,3" fill="none"/>`;
  const intf2 = `<line x1="${P2.l}" y1="${T2.y(0)}" x2="${P2.r}" y2="${T2.y(0)}" stroke="#999" stroke-width="1" stroke-dasharray="5,3" fill="none"/>`;

  // Walls
  let walls = "";
  for (const [P, T] of [
    [P1, T1],
    [P2, T2],
  ]) {
    walls += `<line x1="${P.l}" y1="${T.y(1)}" x2="${P.r}" y2="${T.y(1)}" class="wall"/>`;
    walls += `<line x1="${P.l}" y1="${T.y(-1)}" x2="${P.r}" y2="${T.y(-1)}" class="wall"/>`;
    for (let f = 0; f <= 1.02; f += 0.06)
      walls += hatchLine(P.l + f * (P.r - P.l), T.y(1), T.y(-1), -5, -7);
  }

  // Grid
  let g = "";
  for (const y of [-0.5, 0, 0.5])
    g += `<line x1="${P1.l}" y1="${T1.y(y)}" x2="${P1.r}" y2="${T1.y(y)}" class="grid"/>`;
  for (const u of [-0.5, 0, 0.5])
    g += `<line x1="${T1.x(u)}" y1="${P1.t}" x2="${T1.x(u)}" y2="${P1.b}" class="grid"/>`;
  for (const y of [-0.5, 0.5])
    g += `<line x1="${P2.l}" y1="${T2.y(y)}" x2="${P2.r}" y2="${T2.y(y)}" class="grid"/>`;
  for (const w of [-2, -1, 0, 1, 2])
    g += `<line x1="${T2.x(w)}" y1="${P2.t}" x2="${T2.x(w)}" y2="${P2.b}" class="grid"/>`;

  // Axes
  const axes = `
<line x1="${P1.l}" y1="${P1.b}" x2="${P1.r}" y2="${P1.b}" class="ax"/>
<line x1="${P1.l}" y1="${P1.b}" x2="${P1.l}" y2="${P1.t - 6}" class="ax"/>
<line x1="${T2.x(0)}" y1="${P2.t}" x2="${T2.x(0)}" y2="${P2.b}" class="ax"/>
<line x1="${P2.l}" y1="${P2.b}" x2="${P2.l}" y2="${P2.t - 6}" class="ax"/>
<line x1="${P2.l}" y1="${T2.y(0)}" x2="${P2.r}" y2="${T2.y(0)}" class="ax"/>`;

  // Ticks
  let ticks = "";
  for (const y of [-1, -0.5, 0, 0.5, 1]) {
    ticks += `<text x="${P1.l - 5}" y="${T1.y(y) + 4}" text-anchor="end" class="tick">${y}</text>`;
    ticks += `<text x="${P2.l - 5}" y="${T2.y(y) + 4}" text-anchor="end" class="tick">${y}</text>`;
  }
  for (const u of [-1, 0, 1])
    ticks += `<text x="${T1.x(u)}" y="${P1.b + 16}" text-anchor="middle" class="tick">${u}</text>`;
  for (const w of [-2, -1, 0, 1, 2])
    ticks += `<text x="${T2.x(w)}" y="${P2.b + 16}" text-anchor="middle" class="tick">${w}</text>`;

  // Legend
  const lx = T1.x(0.55),
    ly0 = T1.y(-0.45);
  let legend = "";
  cases.forEach(({ color, label }, i) => {
    const ly = ly0 + i * 18;
    legend += `<line x1="${lx}" y1="${ly}" x2="${lx + 24}" y2="${ly}" stroke="${color}" stroke-width="2.3" fill="none"/>`;
    legend += `<text x="${lx + 30}" y="${ly + 4}" class="tick" fill="${color}">${label}</text>`;
  });

  const cx1 = (P1.l + P1.r) / 2,
    cx2 = (P2.l + P2.r) / 2,
    cy = (mt + H - mb) / 2;
  const labs = `
<text x="${cx1}" y="${H - 8}" text-anchor="middle" class="lab">u / U</text>
<text transform="rotate(-90 ${ml - 40} ${cy})" x="${ml - 40}" y="${cy + 5}" text-anchor="middle" class="lab">y / h</text>
<text x="${cx2}" y="${H - 8}" text-anchor="middle" class="lab">ω · h / U</text>
<text transform="rotate(-90 ${P2.l - 40} ${cy})" x="${P2.l - 40}" y="${cy + 5}" text-anchor="middle" class="lab">y / h</text>
<text x="${cx1}" y="${mt - 12}" text-anchor="middle" class="ptit">(a)  Velocity Profile</text>
<text x="${cx2}" y="${mt - 12}" text-anchor="middle" class="ptit">(b)  Vorticity Profile</text>
<text x="${T1.x(0.07)}" y="${T1.y(0.08) - 6}" class="ann" fill="#999">interface</text>
<text x="${T2.x(-1.8)}" y="${T2.y(0.55)}" class="ann" fill="#999">fluid 1 (μ₁)</text>
<text x="${T2.x(-1.8)}" y="${T2.y(-0.45)}" class="ann" fill="#999">fluid 2 (μ₂)</text>`;

  return svgWrap(
    W,
    H,
    `${panelRect(P1)}${panelRect(P2)}${g}${intf1}${intf2}${walls}${axes}
${velCurves}${vorCurves}
${ticks}${legend}${labs}`
  );
}

// ── Figure 2b: Lamb Vortex Pair ──────────────────────────────────────────────
// +Γ vortex at (−d, −h_v), −Γ at (+d, −h_v)
// Images: −Γ at (−d, +h_v), +Γ at (+d, +h_v)   [rigid-lid / free surface]
// ψ = (Γ/4π)[ln r₁² − ln r₂² − ln r₃² + ln r₄²]
// where r₁²=(x+d)²+(y+h_v)², r₂²=(x−d)²+(y+h_v)²,
//       r₃²=(x+d)²+(y−h_v)², r₄²=(x−d)²+(y−h_v)²

function fig2b() {
  const W = 640,
    H = 340;
  const mt = 42,
    mb = 52,
    ml = 55,
    mr = 30;
  const P = { l: ml, r: W - mr, t: mt, b: H - mb };

  const d = 1.0; // half-separation of vortex pair
  const h_v = 1.2; // depth of vortices below surface

  const xRange = 3.8,
    yMin = -2.8,
    yMax = 0.9;
  const T = tr(-xRange, xRange, yMin, yMax, P.l, P.r, P.t, P.b);

  function psi(x, y) {
    const r1sq = (x + d) ** 2 + (y + h_v) ** 2;
    const r2sq = (x - d) ** 2 + (y + h_v) ** 2;
    const r3sq = (x + d) ** 2 + (y - h_v) ** 2;
    const r4sq = (x - d) ** 2 + (y - h_v) ** 2;
    if (r1sq < 0.01 || r2sq < 0.01 || r3sq < 0.01 || r4sq < 0.01) return NaN;
    return (Math.log(r1sq) - Math.log(r2sq) - Math.log(r3sq) + Math.log(r4sq)) / (4 * Math.PI);
  }

  // Draw streamlines by iso-contour marching on a grid
  const NX = 280,
    NY = 220;
  const xs = rng(-xRange, xRange, NX);
  const ys_g = rng(yMin, yMax, NY);

  // Compute psi grid
  const grid = ys_g.map((y) => xs.map((x) => psi(x, y)));

  // Marching squares: find crossings for given level
  function contour(level) {
    const segs = [];
    for (let j = 0; j < NY - 1; j++) {
      for (let i = 0; i < NX - 1; i++) {
        const v = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
        const c = v.map((val) => (isNaN(val) ? null : val >= level ? 1 : 0));
        if (c.some((x) => x === null)) continue;
        const idx = c[0] * 8 + c[1] * 4 + c[2] * 2 + c[3];
        if (idx === 0 || idx === 15) continue;

        function lerp(a, b, va, vb) {
          if (Math.abs(vb - va) < 1e-10) return (a + b) / 2;
          return a + ((level - va) / (vb - va)) * (b - a);
        }

        const x0 = xs[i],
          x1 = xs[i + 1],
          y0 = ys_g[j],
          y1 = ys_g[j + 1];
        const midB = lerp(x0, x1, v[0], v[1]);
        const midR = lerp(y0, y1, v[1], v[2]);
        const midT = lerp(x0, x1, v[3], v[2]);
        const midL = lerp(y0, y1, v[0], v[3]);
        const edges = {
          B: [midB, y0],
          R: [x1, midR],
          T: [midT, y1],
          L: [x0, midL],
        };

        const pairs = [
          [0, 15, ["B", "L"]],
          [1, 14, ["B", "L"]],
          [2, 13, ["B", "R"]],
          [3, 12, ["L", "R"]],
          [4, 11, ["T", "R"]],
          [5, 10, ["B", "T"]],
          [6, 9, ["L", "T"]],
          [7, 8, ["T", "R"]],
        ];
        // simplified: find two edge crossings
        const crossed = [];
        if (c[0] !== c[1]) crossed.push(edges.B);
        if (c[1] !== c[2]) crossed.push(edges.R);
        if (c[2] !== c[3]) crossed.push(edges.T);
        if (c[3] !== c[0]) crossed.push(edges.L);
        if (crossed.length === 2) {
          segs.push([crossed[0], crossed[1]]);
        }
      }
    }
    return segs;
  }

  // Choose streamline levels
  const levels = [];
  for (let v = -0.5; v <= 0.5; v += 0.04) levels.push(v);

  let streamlines = "";
  for (const lv of levels) {
    const segs = contour(lv);
    for (const [[ax2, ay], [bx, by]] of segs) {
      if (ay > yMax * 0.98 || by > yMax * 0.98) continue; // clip at surface
      const x1s = T.x(ax2).toFixed(1),
        y1s = T.y(ay).toFixed(1);
      const x2s = T.x(bx).toFixed(1),
        y2s = T.y(by).toFixed(1);
      streamlines += `<line x1="${x1s}" y1="${y1s}" x2="${x2s}" y2="${y2s}" stroke="${C.mid}" stroke-width="0.9" fill="none" opacity="0.7"/>`;
    }
  }

  // Free surface
  const surfY = T.y(0);
  const surface = `<line x1="${P.l}" y1="${surfY}" x2="${P.r}" y2="${surfY}" stroke="${C.blue}" stroke-width="2" fill="none"/>`;
  // Hatch above surface
  let surfHatch = "";
  for (let f = 0; f <= 1.02; f += 0.03)
    surfHatch += `<line x1="${P.l + f * (P.r - P.l)}" y1="${surfY}" x2="${P.l + f * (P.r - P.l) - 5}" y2="${surfY - 7}" class="hatch" opacity="0.5"/>`;

  // Vortex symbols
  function vortexSymbol(x, y, sign, color, id) {
    const sx = T.x(x).toFixed(1),
      sy = T.y(y).toFixed(1);
    const r = 9;
    const arrow = sign > 0 ? "⊕" : "⊖";
    return `<circle cx="${sx}" cy="${sy}" r="${r}" fill="white" stroke="${color}" stroke-width="1.5"/>
<text x="${sx}" y="${parseFloat(sy) + 5}" text-anchor="middle" font-size="13" fill="${color}">${arrow}</text>`;
  }

  const vSymbols =
    vortexSymbol(-d, -h_v, 1, C.red, "v1") +
    vortexSymbol(d, -h_v, -1, C.blue, "v2") +
    vortexSymbol(-d, h_v, -1, C.red, "iv1") +
    vortexSymbol(d, h_v, 1, C.blue, "iv2");

  // Image region indicator
  const imgRegion = `<rect x="${P.l}" y="${P.t}" width="${P.r - P.l}" height="${surfY - P.t}" fill="${C.blue}" fill-opacity="0.03"/>`;

  // Axes
  const axes = `
<line x1="${P.l}" y1="${P.b}" x2="${P.r}" y2="${P.b}" class="ax"/>
<line x1="${T.x(0)}" y1="${P.b}" x2="${T.x(0)}" y2="${P.t - 6}" class="ax"/>`;

  // Ticks
  let ticks = "";
  for (const x of [-3, -2, -1, 0, 1, 2, 3])
    ticks += `<text x="${T.x(x)}" y="${P.b + 16}" text-anchor="middle" class="tick">${x}</text>`;
  for (const y of [-2, -1, 0])
    ticks += `<text x="${T.x(0) - 7}" y="${T.y(y) + 4}" text-anchor="end" class="tick">${y}</text>`;

  const cx = (P.l + P.r) / 2;
  const labs = `
<text x="${cx}" y="${H - 8}" text-anchor="middle" class="lab">x / d</text>
<text transform="rotate(-90 ${ml - 40} ${(P.t + P.b) / 2})" x="${ml - 40}" y="${(P.t + P.b) / 2 + 5}" text-anchor="middle" class="lab">y / d</text>
<text x="${cx}" y="${mt - 14}" text-anchor="middle" class="ptit">Lamb vortex pair below a free surface (Fr → 0)</text>
<text x="${T.x(2.6)}" y="${T.y(0.5)}" class="ann" fill="${C.blue}">image vortices</text>
<text x="${T.x(-3.5)}" y="${T.y(0.1) - 6}" class="ann" fill="${C.blue}">free surface</text>
<text x="${T.x(2.6)}" y="${T.y(-h_v)}" class="ann" fill="${C.mid}">real vortices</text>`;

  return svgWrap(
    W,
    H,
    `${panelRect(P)}${imgRegion}${streamlines}${surface}${surfHatch}${axes}${vSymbols}${ticks}${labs}`
  );
}

// ── Write files ──────────────────────────────────────────────────────────────

const outDir = path.join(__dirname);
fs.mkdirSync(outDir, { recursive: true });

const figures = [
  ["kaist1_fig1_poiseuille.svg", fig1a],
  ["kaist1_fig2_diffusion.svg", fig1b],
  ["kaist2_fig1_couette.svg", fig2a],
  ["kaist2_fig2_lamb.svg", fig2b],
];

for (const [name, fn] of figures) {
  const p = path.join(outDir, name);
  fs.writeFileSync(p, fn(), "utf8");
  console.log(`wrote ${name}`);
}
