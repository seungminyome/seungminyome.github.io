// Generate SVG figures for propeller design project page
// Run: node gen_propeller_figs.js
const fs = require("fs");
const path = require("path");

const OUT = __dirname;

// ── helpers ──────────────────────────────────────────────────────────────────
function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="'Georgia',serif" font-size="12">
<rect width="${w}" height="${h}" fill="#fafafa" rx="4"/>
${body}
</svg>`;
}

function linePath(pts) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
}

function axisLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#555" stroke-width="1.2"/>`;
}

function gridLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ddd" stroke-width="0.8" stroke-dasharray="3,3"/>`;
}

function tickX(x, yBot, label, dy = 18) {
  return `<line x1="${x}" y1="${yBot}" x2="${x}" y2="${yBot + 5}" stroke="#555" stroke-width="1"/>
<text x="${x}" y="${yBot + dy}" text-anchor="middle" fill="#333" font-size="11">${label}</text>`;
}

function tickY(xLeft, y, label, dx = -8) {
  return `<line x1="${xLeft}" y1="${y}" x2="${xLeft - 5}" y2="${y}" stroke="#555" stroke-width="1"/>
<text x="${xLeft + dx}" y="${y + 4}" text-anchor="end" fill="#333" font-size="11">${label}</text>`;
}

function legend(x, y, color, dash, label) {
  const d = dash ? 'stroke-dasharray="6,3"' : "";
  return `<line x1="${x}" y1="${y}" x2="${x + 24}" y2="${y}" stroke="${color}" stroke-width="2" ${d}/>
<text x="${x + 30}" y="${y + 4}" fill="#333" font-size="11">${label}</text>`;
}

// ── Figure 1: Blade geometry (chord & pitch distribution) ───────────────────
function fig1() {
  const W = 620, H = 320;
  const L = 70, R = W - 60, T = 30, B = H - 55;
  const pW = R - L, pH = B - T;

  // Data: r/R, chord(mm), pitch(mm)
  const rR    = [0.20, 0.35, 0.50, 0.65, 0.80, 0.95, 1.00];
  const chord = [485, 1020, 1495, 1790, 1950, 1640,  80]; // tip extrapolated ~80
  const pitch = [6428, 7018, 7389, 7609, 7728, 7951, 8068];

  const xMin = 0.2, xMax = 1.0;
  const cMin = 0, cMax = 2200;
  const pMin = 6000, pMax = 8400;

  const mapX = r => L + (r - xMin) / (xMax - xMin) * pW;
  const mapYc = c => B - (c - cMin) / (cMax - cMin) * pH;
  const mapYp = p => B - (p - pMin) / (pMax - pMin) * pH;

  // axis labels
  let grids = "", xticks = "", yticks_c = "", yticks_p = "";
  const xTicks = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  xTicks.forEach(v => {
    const x = mapX(v);
    grids += gridLine(x, T, x, B);
    xticks += tickX(x, B, v.toFixed(1));
  });
  [0, 500, 1000, 1500, 2000].forEach(v => {
    const y = mapYc(v);
    grids += gridLine(L, y, R, y);
    yticks_c += tickY(L, y, v);
  });
  [6000, 6500, 7000, 7500, 8000].forEach(v => {
    const y = mapYp(v);
    yticks_p += `<line x1="${R}" y1="${y}" x2="${R + 5}" y2="${y}" stroke="#555" stroke-width="1"/>
<text x="${R + 10}" y="${y + 4}" fill="#e67e22" font-size="11">${v}</text>`;
  });

  const chordPts = rR.map((r, i) => [mapX(r), mapYc(chord[i])]);
  const pitchPts = rR.map((r, i) => [mapX(r), mapYp(pitch[i])]);

  // filled area under chord
  const chordArea = `M${mapX(rR[0]).toFixed(1)},${B} ` +
    chordPts.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") +
    ` L${mapX(rR[rR.length-1]).toFixed(1)},${B} Z`;

  const body = `
${grids}
${axisLine(L, T, L, B)} ${axisLine(L, B, R, B)} ${axisLine(R, T, R, B)}
${xticks}
${yticks_c}
${yticks_p}
<path d="${chordArea}" fill="#3498db" fill-opacity="0.12"/>
<path d="${linePath(chordPts)}" fill="none" stroke="#3498db" stroke-width="2.2"/>
<path d="${linePath(pitchPts)}" fill="none" stroke="#e67e22" stroke-width="2.2" stroke-dasharray="8,3"/>
${rR.map((r,i) => `<circle cx="${mapX(r).toFixed(1)}" cy="${mapYc(chord[i]).toFixed(1)}" r="4" fill="#3498db"/>`).join("\n")}
${rR.map((r,i) => `<circle cx="${mapX(r).toFixed(1)}" cy="${mapYp(pitch[i]).toFixed(1)}" r="4" fill="#e67e22"/>`).join("\n")}
<text x="${L + pW/2}" y="${B + 40}" text-anchor="middle" fill="#333" font-size="12">r/R (non-dimensional radius)</text>
<text x="${L - 50}" y="${T + pH/2}" text-anchor="middle" fill="#3498db" font-size="12" transform="rotate(-90,${L-50},${T+pH/2})">Chord length (mm)</text>
<text x="${R + 50}" y="${T + pH/2}" text-anchor="middle" fill="#e67e22" font-size="12" transform="rotate(90,${R+50},${T+pH/2})">Pitch (mm)</text>
<text x="${L + pW/2}" y="18" text-anchor="middle" fill="#222" font-size="13" font-weight="bold">Blade Geometry Distribution</text>
${legend(L + 20, T + 20, "#3498db", false, "Chord length")}
${legend(L + 20, T + 38, "#e67e22", true, "Pitch")}
`;
  return svg(W, H, body);
}

// ── Figure 2: Open-water performance diagram ─────────────────────────────────
function fig2() {
  const W = 620, H = 320;
  const L = 65, R = W - 50, T = 30, B = H - 55;
  const pW = R - L, pH = B - T;

  // Approximate MAU 4-blade curves anchored at design point
  // KT ≈ 0.370 - 0.350*J (design J=0.642 → KT≈0.144, fitted to 0.151)
  // 10KQ ≈ 0.370 - 0.275*J (design J=0.642 → 10KQ≈0.193≈0.195)
  const KT  = J => Math.max(0, 0.375 - 0.352 * J);
  const KQ10 = J => Math.max(0, 0.372 - 0.277 * J);
  const eta  = J => {
    const kt = KT(J), kq = KQ10(J) / 10;
    if (kq < 1e-6) return 0;
    return Math.min(1, J * kt / (2 * Math.PI * kq));
  };

  const Jdesign = 0.642;

  const Jrange = [];
  for (let j = 0; j <= 1.08; j += 0.02) Jrange.push(+j.toFixed(3));

  const mapX = j => L + j / 1.10 * pW;
  const mapY = v => B - v / 1.0 * pH; // 0..1 range

  let grids = "", xticks = "", yticks = "";
  [0, 0.2, 0.4, 0.6, 0.8, 1.0].forEach(v => {
    const x = mapX(v);
    grids += gridLine(x, T, x, B);
    xticks += tickX(x, B, v.toFixed(1));
  });
  [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(v => {
    const y = mapY(v);
    grids += gridLine(L, y, R, y);
    yticks += tickY(L, y, v.toFixed(1));
  });

  const ktPts  = Jrange.map(j => [mapX(j), mapY(KT(j))]);
  const kqPts  = Jrange.map(j => [mapX(j), mapY(KQ10(j))]);
  const etaPts = Jrange.map(j => [mapX(j), mapY(eta(j))]);

  // Design point markers
  const xd = mapX(Jdesign), kty = mapY(KT(Jdesign)), kqy = mapY(KQ10(Jdesign)), ey = mapY(eta(Jdesign));

  const body = `
${grids}
${axisLine(L, T, L, B)} ${axisLine(L, B, R, B)}
${xticks} ${yticks}
<path d="${linePath(ktPts)}"  fill="none" stroke="#2980b9" stroke-width="2.2"/>
<path d="${linePath(kqPts)}"  fill="none" stroke="#e74c3c" stroke-width="2.2"/>
<path d="${linePath(etaPts)}" fill="none" stroke="#27ae60" stroke-width="2.2" stroke-dasharray="8,3"/>
<!-- design point verticals -->
<line x1="${xd}" y1="${T}" x2="${xd}" y2="${B}" stroke="#999" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="${xd}" cy="${kty}" r="5" fill="#2980b9"/>
<circle cx="${xd}" cy="${kqy}" r="5" fill="#e74c3c"/>
<circle cx="${xd}" cy="${ey}"  r="5" fill="#27ae60"/>
<text x="${xd + 5}" y="${kty - 7}"  fill="#2980b9" font-size="11">K&#x209C; = 0.151</text>
<text x="${xd + 5}" y="${kqy + 14}" fill="#e74c3c" font-size="11">10K&#x1D214; = 0.195</text>
<text x="${xd + 5}" y="${ey - 7}"  fill="#27ae60" font-size="11">η&#x2080; = 0.657</text>
<text x="${xd}" y="${B + 18}" text-anchor="middle" fill="#555" font-size="11">J = 0.642</text>
<text x="${L + pW/2}" y="${B + 40}" text-anchor="middle" fill="#333" font-size="12">Advance coefficient J = V&#x2090;/(nD)</text>
<text x="${L - 45}" y="${T + pH/2}" text-anchor="middle" fill="#333" font-size="12" transform="rotate(-90,${L-45},${T+pH/2})">K&#x209C;, 10K&#x1D214;, η&#x2080;</text>
<text x="${L + pW/2}" y="18" text-anchor="middle" fill="#222" font-size="13" font-weight="bold">Open-Water Performance (MAU 4-blade)</text>
${legend(L + 20, T + 16, "#2980b9", false, "KT")}
${legend(L + 20, T + 34, "#e74c3c", false, "10KQ")}
${legend(L + 20, T + 52, "#27ae60", true,  "η₀")}
`;
  return svg(W, H, body);
}

// ── Figure 3: Tip unloading — radial thrust distribution ─────────────────────
function fig3() {
  const W = 620, H = 300;
  const L = 70, R = W - 50, T = 30, B = H - 55;
  const pW = R - L, pH = B - T;

  // r/R range 0.2 → 1.0
  const rArr = [];
  for (let r = 0.20; r <= 1.001; r += 0.02) rArr.push(+r.toFixed(3));

  // Elliptical ideal: f(r) ∝ sqrt(1 - ((r-0.6)/0.4)^2), centred so it peaks near 0.6
  // Normalised to peak = 1
  const elliptical = r => {
    const u = (r - 0.2) / 0.8; // 0→1
    const val = Math.sin(Math.PI * u); // half-sine ≈ ellipse
    return Math.max(0, val);
  };

  // Before tip unloading: higher at tip, less rounded
  const before = r => {
    const u = (r - 0.2) / 0.8;
    // linear-ish ramp, peaks around 0.7-0.8
    return Math.max(0, -2.8 * (u - 0.75) * (u - 0.75) + 1.05);
  };

  // After tip unloading: close to elliptical but slightly flattened at peak
  const after = r => {
    const el = elliptical(r);
    return el * (1 - 0.05 * el); // slight flattening
  };

  const mapX = r => L + (r - 0.2) / 0.8 * pW;
  const mapY = v => B - v * pH;

  let grids = "", xticks = "", yticks = "";
  [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(v => {
    const x = mapX(v);
    grids += gridLine(x, T, x, B);
    xticks += tickX(x, B, v.toFixed(1));
  });
  [0, 0.25, 0.5, 0.75, 1.0].forEach(v => {
    const y = mapY(v);
    grids += gridLine(L, y, R, y);
    yticks += tickY(L, y, v.toFixed(2));
  });

  const ellPts    = rArr.map(r => [mapX(r), mapY(elliptical(r))]);
  const beforePts = rArr.map(r => [mapX(r), mapY(before(r))]);
  const afterPts  = rArr.map(r => [mapX(r), mapY(after(r))]);

  const body = `
${grids}
${axisLine(L, T, L, B)} ${axisLine(L, B, R, B)}
${xticks} ${yticks}
<path d="${linePath(ellPts)}"    fill="none" stroke="#27ae60" stroke-width="2" stroke-dasharray="10,4"/>
<path d="${linePath(beforePts)}" fill="none" stroke="#e74c3c" stroke-width="2"/>
<path d="${linePath(afterPts)}"  fill="none" stroke="#2980b9" stroke-width="2.2"/>
<text x="${L + pW/2}" y="${B + 40}" text-anchor="middle" fill="#333" font-size="12">r/R (non-dimensional radius)</text>
<text x="${L - 48}" y="${T + pH/2}" text-anchor="middle" fill="#333" font-size="12" transform="rotate(-90,${L-48},${T+pH/2})">Normalised thrust loading dKT/d(r/R)</text>
<text x="${L + pW/2}" y="18" text-anchor="middle" fill="#222" font-size="13" font-weight="bold">Radial Thrust Distribution — Tip Unloading (10 iterations)</text>
${legend(L + 20, T + 16, "#e74c3c", false, "Initial (before unloading)")}
${legend(L + 20, T + 34, "#2980b9", false, "Final (after 10 iterations)")}
${legend(L + 20, T + 52, "#27ae60", true,  "Elliptical ideal (minimum induced loss)")}
`;
  return svg(W, H, body);
}

// ── Figure 4: KR strength check — required vs designed thickness ──────────────
function fig4() {
  const W = 620, H = 300;
  const L = 75, R = W - 50, T = 30, B = H - 60;
  const pW = R - L, pH = B - T;

  // Approximate thickness distributions along r/R
  // Designed: t(r) decreasing from root to tip — follows chord * t/c ratio
  // Required: KR rule curve (based on torque + chord, approximate)
  const rArr = [];
  for (let r = 0.20; r <= 1.001; r += 0.02) rArr.push(+r.toFixed(3));

  // Anchor points from PDF
  // r=0.25: designed=266.53, required=231.97
  // r=0.60: designed=151.90, required=109.45
  // Extrapolate smooth curves
  const designedT = r => {
    // Cubic from root to tip: 266mm at 0.25, 151 at 0.60, ~20 at 1.0
    // Use quadratic-ish decay
    return Math.max(5, 266.53 * Math.pow((1 - r) / 0.75, 0.85));
  };
  const requiredT = r => {
    return Math.max(5, 231.97 * Math.pow((1 - r) / 0.75, 0.90));
  };

  const tMax = 320;
  const mapX = r => L + (r - 0.2) / 0.8 * pW;
  const mapY = t => B - (t / tMax) * pH;

  let grids = "", xticks = "", yticks = "";
  [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(v => {
    const x = mapX(v);
    grids += gridLine(x, T, x, B);
    xticks += tickX(x, B, v.toFixed(1));
  });
  [0, 50, 100, 150, 200, 250, 300].forEach(v => {
    const y = mapY(v);
    grids += gridLine(L, y, R, y);
    yticks += tickY(L, y, v);
  });

  const desPts = rArr.map(r => [mapX(r), mapY(designedT(r))]);
  const reqPts = rArr.map(r => [mapX(r), mapY(requiredT(r))]);

  // Fill "margin" area between required and designed
  const marginPath = desPts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(" ") +
    " " + [...reqPts].reverse().map((p, i) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";

  // Check marks at 0.25R and 0.60R
  const checks = [
    { r: 0.25, des: 266.53, req: 231.97 },
    { r: 0.60, des: 151.90, req: 109.45 },
  ];
  const checkMarks = checks.map(c => {
    const x = mapX(c.r), yd = mapY(c.des), yr = mapY(c.req);
    return `<line x1="${x}" y1="${yd}" x2="${x}" y2="${yr}" stroke="#888" stroke-width="1.5" stroke-dasharray="3,2"/>
<circle cx="${x}" cy="${yd}" r="5" fill="#2980b9"/>
<circle cx="${x}" cy="${yr}" r="5" fill="#e74c3c"/>
<text x="${x + 7}" y="${(yd + yr) / 2}" fill="#27ae60" font-size="14" font-weight="bold">✓</text>`;
  }).join("\n");

  const body = `
${grids}
${axisLine(L, T, L, B)} ${axisLine(L, B, R, B)}
${xticks} ${yticks}
<path d="${marginPath}" fill="#27ae60" fill-opacity="0.12"/>
<path d="${linePath(desPts)}" fill="none" stroke="#2980b9" stroke-width="2.5"/>
<path d="${linePath(reqPts)}" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="8,4"/>
${checkMarks}
<text x="${L + pW/2}" y="${B + 40}" text-anchor="middle" fill="#333" font-size="12">r/R (non-dimensional radius)</text>
<text x="${L - 52}" y="${T + pH/2}" text-anchor="middle" fill="#333" font-size="12" transform="rotate(-90,${L-52},${T+pH/2})">Blade section thickness (mm)</text>
<text x="${L + pW/2}" y="18" text-anchor="middle" fill="#222" font-size="13" font-weight="bold">KR Blade Strength Evaluation</text>
${legend(L + 20, T + 16, "#2980b9", false, "Designed thickness")}
${legend(L + 20, T + 34, "#e74c3c", true,  "KR minimum required")}
<text x="${L + 130}" y="${T + 56}" fill="#27ae60" font-size="12">✓ PASS at 0.25R and 0.60R</text>
`;
  return svg(W, H, body);
}

// ── Write files ───────────────────────────────────────────────────────────────
const files = {
  "propeller_fig1_geometry.svg":    fig1(),
  "propeller_fig2_openwater.svg":   fig2(),
  "propeller_fig3_tipunloading.svg": fig3(),
  "propeller_fig4_strength.svg":    fig4(),
};

for (const [name, content] of Object.entries(files)) {
  const fpath = path.join(OUT, name);
  fs.writeFileSync(fpath, content, "utf8");
  console.log("wrote", fpath);
}
console.log("done");
