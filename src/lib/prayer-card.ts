import type { Prayer } from "@/data/prayers";
import { CATEGORY_LABEL } from "@/data/prayers";

const W = 1080;
const H = 1350;

async function ensureFonts() {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.all([
      (document as any).fonts.load("italic 600 92px 'Cormorant Garamond'"),
      (document as any).fonts.load("500 34px 'Cormorant Garamond'"),
      (document as any).fonts.load("600 22px 'Karla'"),
    ]);
  } catch {}
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    if (!para.trim()) {
      out.push("");
      continue;
    }
    let line = "";
    for (const w of para.split(" ")) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        out.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Renders a 1080×1350 devotional prayer card as a PNG blob. */
export async function renderPrayerCard(prayer: Prayer, url: string): Promise<Blob> {
  await ensureFonts();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Night-sky aurora ground
  const bg = ctx.createRadialGradient(W * 0.3, H * 0.08, 40, W * 0.5, H * 0.55, H);
  bg.addColorStop(0, "#3a3f8c");
  bg.addColorStop(0.5, "#1a2050");
  bg.addColorStop(1, "#080d26");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.5, H * 0.2, 0, W * 0.5, H * 0.2, 560);
  glow.addColorStop(0, "rgba(240, 205, 130, 0.22)");
  glow.addColorStop(1, "rgba(240, 205, 130, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Stars
  const rand = mulberry32(hash(prayer.slug));
  for (let i = 0; i < 150; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = rand() * 1.7 + 0.3;
    ctx.globalAlpha = 0.25 + rand() * 0.65;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Gold frame
  ctx.strokeStyle = "rgba(232,200,106,0.55)";
  ctx.lineWidth = 2;
  roundRect(ctx, 44, 44, W - 88, H - 88, 28);
  ctx.stroke();
  ctx.strokeStyle = "rgba(232,200,106,0.22)";
  ctx.lineWidth = 1;
  roundRect(ctx, 60, 60, W - 120, H - 120, 20);
  ctx.stroke();

  const M = 108; // text margin
  const maxW = W - M * 2;

  // Eyebrow
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8c86a";
  ctx.font = "600 22px 'Karla', sans-serif";
  ctx.fillText(CATEGORY_LABEL[prayer.category].toUpperCase(), W / 2, 150);

  // Title
  ctx.fillStyle = "#ffffff";
  let titleSize = 86;
  let titleLines: string[] = [];
  do {
    ctx.font = `italic 600 ${titleSize}px 'Cormorant Garamond', serif`;
    titleLines = wrap(ctx, prayer.title, maxW);
    titleSize -= 6;
  } while (titleLines.length > 2 && titleSize > 48);
  ctx.font = `italic 600 ${titleSize + 6}px 'Cormorant Garamond', serif`;
  let y = 250;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, y);
    y += titleSize + 12;
  }

  if (prayer.latinTitle) {
    ctx.font = "italic 500 32px 'Cormorant Garamond', serif";
    ctx.fillStyle = "rgba(232,200,106,0.85)";
    ctx.fillText(prayer.latinTitle, W / 2, y + 6);
    y += 48;
  }

  // Ornament
  y += 18;
  const orn = ctx.createLinearGradient(W / 2 - 150, 0, W / 2 + 150, 0);
  orn.addColorStop(0, "rgba(232,200,106,0)");
  orn.addColorStop(0.5, "#e8c86a");
  orn.addColorStop(1, "rgba(232,200,106,0)");
  ctx.fillStyle = orn;
  ctx.fillRect(W / 2 - 150, y, 300, 2);
  ctx.fillStyle = "#e8c86a";
  ctx.font = "600 22px 'Karla', sans-serif";
  ctx.fillText("✦", W / 2, y + 44);
  y += 86;

  // Body text — auto-fit
  const bottomLimit = H - 190;
  let size = 38;
  let lines: string[] = [];
  let lh = 0;
  for (; size >= 18; size -= 1) {
    ctx.font = `500 ${size}px 'Cormorant Garamond', serif`;
    lines = wrap(ctx, prayer.text, maxW);
    lh = Math.round(size * 1.42);
    if (y + lines.length * lh <= bottomLimit) break;
  }
  ctx.font = `500 ${size}px 'Cormorant Garamond', serif`;
  ctx.fillStyle = "rgba(255,255,255,0.94)";
  for (const line of lines) {
    if (y > bottomLimit) break;
    if (line) ctx.fillText(line, W / 2, y);
    y += line ? lh : Math.round(lh * 0.6);
  }

  // Source
  if (prayer.source) {
    ctx.font = "italic 500 24px 'Cormorant Garamond', serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    const srcLines = wrap(ctx, prayer.source, maxW).slice(0, 2);
    let sy = H - 150;
    for (const line of srcLines) {
      ctx.fillText(line, W / 2, sy);
      sy += 30;
    }
  }

  // Footer URL
  ctx.font = "600 20px 'Karla', sans-serif";
  ctx.fillStyle = "#e8c86a";
  ctx.fillText(shortUrl(url), W / 2, H - 92);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png", 0.95);
  });
}

function shortUrl(u: string) {
  try {
    const url = new URL(u);
    return url.host + url.pathname;
  } catch {
    return u;
  }
}

export function prayerUrl(slug: string): string {
  if (typeof window === "undefined") return `/prayers/${slug}`;
  return `${window.location.origin}/prayers/${slug}`;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Opens a print-ready A5 devotional sheet in a hidden iframe and triggers Print / Save as PDF. */
export function printPrayer(prayer: Prayer, url: string) {
  const body = esc(prayer.text)
    .split("\n\n")
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8" />
<title>${esc(prayer.title)} — Prayer Card</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Karla:wght@400;600&display=swap" rel="stylesheet" />
<style>
  @page { size: A5 portrait; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; }
  .sheet {
    width: 148mm; min-height: 210mm; padding: 16mm 16mm 14mm;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    color: #1d2440; background: #fdfaf3;
    font-family: 'Cormorant Garamond', Georgia, serif;
    position: relative;
  }
  .frame { position: absolute; inset: 8mm; border: 0.6pt solid #b9973f; border-radius: 3mm; }
  .frame::after { content: ''; position: absolute; inset: 2.5mm; border: 0.4pt solid rgba(185,151,63,0.4); border-radius: 2mm; }
  .eyebrow { font-family: 'Karla', sans-serif; font-size: 8pt; letter-spacing: 0.28em; text-transform: uppercase; color: #a5842f; margin-bottom: 6mm; }
  h1 { font-size: 26pt; font-style: italic; font-weight: 600; margin: 0; line-height: 1.15; }
  .latin { font-style: italic; font-size: 11pt; color: #a5842f; margin-top: 2mm; }
  .rule { width: 42mm; height: 0.6pt; background: #b9973f; margin: 7mm 0 2mm; }
  .star { color: #b9973f; font-size: 9pt; margin-bottom: 6mm; }
  .intro { font-style: italic; font-size: 10pt; color: #55597a; max-width: 100mm; margin: 0 0 6mm; line-height: 1.5; }
  .body p { font-size: 13pt; line-height: 1.62; margin: 0 0 4mm; max-width: 106mm; }
  .how { font-family: 'Karla', sans-serif; font-size: 8.5pt; color: #55597a; max-width: 100mm; margin-top: 6mm; line-height: 1.5; }
  footer { margin-top: auto; padding-top: 8mm; }
  .source { font-style: italic; font-size: 8.5pt; color: #6b6f8c; }
  .url { font-family: 'Karla', sans-serif; font-size: 7.5pt; letter-spacing: 0.12em; color: #a5842f; margin-top: 2mm; text-transform: uppercase; }
</style></head>
<body><div class="sheet"><div class="frame"></div>
  <div class="eyebrow">${esc(CATEGORY_LABEL[prayer.category])}</div>
  <h1>${esc(prayer.title)}</h1>
  ${prayer.latinTitle ? `<div class="latin">${esc(prayer.latinTitle)}</div>` : ""}
  <div class="rule"></div><div class="star">&#10022;</div>
  ${prayer.intro ? `<p class="intro">${esc(prayer.intro)}</p>` : ""}
  <div class="body">${body}</div>
  ${prayer.howToPray ? `<div class="how">${esc(prayer.howToPray)}</div>` : ""}
  <footer>
    ${prayer.source ? `<div class="source">${esc(prayer.source)}</div>` : ""}
    <div class="url">${esc(shortUrl(url))}</div>
  </footer>
</div></body></html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(html);
  doc.close();

  const go = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {}
    setTimeout(() => iframe.remove(), 60000);
  };
  // give webfonts a moment so the sheet prints in its proper type
  setTimeout(go, 700);
}
