// debounce function
function debounce<Func extends (...args: any[]) => void>(func: Func, wait: number): Func {
  let timeout: number | undefined;
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as Func;
}

// --- color helpers ---
function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number) {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// --- RGB <-> OKLAB ---
function rgbToOklab(r: number, g: number, b: number) {
  // convert to linear
  r = srgbToLinear(r);
  g = srgbToLinear(g);
  b = srgbToLinear(b);

  // LMS
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

function oklabToRgb(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b_ = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  r = linearToSrgb(r);
  g = linearToSrgb(g);
  b_ = linearToSrgb(b_);

  return {
    r: clamp01(r),
    g: clamp01(g),
    b: clamp01(b_),
  };
}

// --- OKLAB <-> OKLCH ---
function oklabToOklch({ L, a, b }: { L: number; a: number; b: number }) {
  const C = Math.sqrt(a * a + b * b);
  const H = C === 0 ? 0 : (Math.atan2(b, a) * 180) / Math.PI;
  return { L, C, H };
}

function oklchToOklab({ L, C, H }: { L: number; C: number; H: number }) {
  const hRad = (H * Math.PI) / 180;
  return {
    L,
    a: C * Math.cos(hRad),
    b: C * Math.sin(hRad),
  };
}

// --- Parsing hex only (easy to extend later) ---
function parseHex(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

// --- Formatting ---
function formatRgb({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
}

// --- Color API functions ---
function lighten(hex: string, amt: number) {
  const rgb = parseHex(hex);
  const lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
  const lch = oklabToOklch(lab);

  lch.L = clamp01(lch.L + amt);

  const oklab = oklchToOklab(lch);
  return formatRgb(oklabToRgb(oklab.L, oklab.a, oklab.b));
}

function darken(hex: string, amt: number) {
  const rgb = parseHex(hex);
  const lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
  const lch = oklabToOklch(lab);

  lch.L = clamp01(lch.L - amt);

  const oklab = oklchToOklab(lch);
  return formatRgb(oklabToRgb(oklab.L, oklab.a, oklab.b));
}

function alpha(hex: string, alpha: number) {
  const rgb = parseHex(hex);
  return `rgba(${Math.round(rgb.r * 255)} ${Math.round(rgb.g * 255)} ${Math.round(rgb.b * 255)} / ${clamp01(alpha)})`;
}

export default { darken, debounce, alpha, lighten };
