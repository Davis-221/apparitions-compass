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

const PRINT_CSS = `
  @page { size: A5 portrait; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; }
  .sheet {
    width: 148mm; height: 205mm; padding: 14mm 16mm 12mm;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    color: #1d2440; background: #fdfaf3; overflow: hidden;
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 13pt;
    position: relative; page-break-after: always; break-after: page;
    page-break-inside: avoid; break-inside: avoid;
  }
  .sheet:last-child { page-break-after: auto; break-after: auto; }

  .frame { position: absolute; inset: 8mm; border: 0.6pt solid #b9973f; border-radius: 3mm; }
  .frame::after { content: ''; position: absolute; inset: 2.5mm; border: 0.4pt solid rgba(185,151,63,0.4); border-radius: 2mm; }
  .eyebrow { font-family: 'Karla', sans-serif; font-size: 0.62em; letter-spacing: 0.28em; text-transform: uppercase; color: #a5842f; margin-bottom: 5mm; }
  h1 { font-size: 2em; font-style: italic; font-weight: 600; margin: 0; line-height: 1.15; }
  .latin { font-style: italic; font-size: 0.85em; color: #a5842f; margin-top: 2mm; }
  .rule { width: 42mm; height: 0.6pt; background: #b9973f; margin: 6mm 0 2mm; }
  .star { color: #b9973f; font-size: 0.7em; margin-bottom: 5mm; }
  .intro { font-style: italic; font-size: 0.77em; color: #55597a; max-width: 100mm; margin: 0 0 5mm; line-height: 1.5; }
  .body p { font-size: 1em; line-height: 1.6; margin: 0 0 3.5mm; max-width: 106mm; }
  .how { font-family: 'Karla', sans-serif; font-size: 0.65em; color: #55597a; max-width: 100mm; margin-top: 5mm; line-height: 1.5; }
  footer { margin-top: auto; padding-top: 6mm; }
  .source { font-style: italic; font-size: 0.65em; color: #6b6f8c; }
  .url { font-family: 'Karla', sans-serif; font-size: 0.58em; letter-spacing: 0.12em; color: #a5842f; margin-top: 2mm; text-transform: uppercase; }
  .cover h1 { font-size: 2.6em; }
  .toc { font-family: 'Karla', sans-serif; font-size: 0.69em; color: #3a3f5c; text-align: left; max-width: 108mm; column-count: 2; column-gap: 8mm; margin-top: 6mm; }
  .toc div { break-inside: avoid; margin-bottom: 1.6mm; }

`;

const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Karla:wght@400;600&display=swap" rel="stylesheet" />`;

function sheetHtml(prayer: Prayer, url: string) {
  const body = esc(prayer.text)
    .split("\n\n")
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `<div class="sheet"><div class="frame"></div>
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
</div>`;
}

const FIT_SCRIPT = `
<script>
  window.__fit = function () {
    var sheets = document.querySelectorAll('.sheet');
    for (var i = 0; i < sheets.length; i++) {
      var s = sheets[i], size = 13;
      while (s.scrollHeight > s.clientHeight + 1 && size > 6.5) {
        size -= 0.3;
        s.style.fontSize = size + 'pt';
      }
    }
  };

<\/script>`;

function printDocument(title: string, inner: string) {
  const html = `<!doctype html><html><head><meta charset="utf-8" />
<title>${esc(title)}</title>
${FONT_LINKS}
<style>${PRINT_CSS}</style></head><body>${inner}${FIT_SCRIPT}</body></html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:210mm;height:297mm;border:0;opacity:0;";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(html);
  doc.close();

  const go = () => {
    try {
      (iframe.contentWindow as any)?.__fit?.();
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {}
    setTimeout(() => iframe.remove(), 60000);
  };
  // give webfonts a moment so the sheet prints in its proper type
  setTimeout(go, 900);

}

/** Opens a print-ready A5 devotional sheet in a hidden iframe and triggers Print / Save as PDF. */
export function printPrayer(prayer: Prayer, url: string) {
  printDocument(`${prayer.title} — Prayer Card`, sheetHtml(prayer, url));
}

/** Prints every prayer as one A5 booklet (cover + contents + one sheet per prayer). */
export function printAllPrayers(prayers: Prayer[], origin?: string) {
  const base = origin ?? (typeof window === "undefined" ? "" : window.location.origin);
  const toc = prayers
    .map((p, i) => `<div>${i + 1}. ${esc(p.title)}</div>`)
    .join("");

  const cover = `<div class="sheet cover"><div class="frame"></div>
  <div class="eyebrow">A devotional booklet</div>
  <h1>Prayers to Our Mother</h1>
  <div class="latin">Ad Jesum per Mariam</div>
  <div class="rule"></div><div class="star">&#10022;</div>
  <p class="intro">${prayers.length} authentic Marian prayers — from the Hail Mary and the Rosary to the litanies, consecrations and the words she herself gave at her apparitions.</p>
  <div class="toc">${toc}</div>
  <footer><div class="url">${esc(shortUrl(`${base}/prayers`))}</div></footer>
</div>`;

  const sheets = prayers.map((p) => sheetHtml(p, `${base}/prayers/${p.slug}`)).join("");
  printDocument("Prayers to Our Mother — Booklet", cover + sheets);
}

/* ---------------- ZIP of prayer-card PNGs ---------------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf: Uint8Array) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Minimal store-only (uncompressed) ZIP writer. */
function makeZip(files: { name: string; data: Uint8Array }[]): Blob {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  const u32 = (v: number) => new Uint8Array([v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]);
  const u16 = (v: number) => new Uint8Array([v & 255, (v >>> 8) & 255]);
  const concat = (parts: Uint8Array[]) => {
    const len = parts.reduce((s, p) => s + p.length, 0);
    const out = new Uint8Array(len);
    let o = 0;
    for (const p of parts) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  };

  for (const f of files) {
    const name = enc.encode(f.name);
    const crc = crc32(f.data);
    const local = concat([
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0),
      u32(crc), u32(f.data.length), u32(f.data.length), u16(name.length), u16(0),
      name, f.data,
    ]);
    chunks.push(local);
    central.push(
      concat([
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(f.data.length), u32(f.data.length),
        u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset),
        name,
      ]),
    );
    offset += local.length;
  }

  const cd = concat(central);
  const end = concat([
    u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
    u32(cd.length), u32(offset), u16(0),
  ]);
  return new Blob([concat(chunks), cd, end], { type: "application/zip" });
}

/** Renders every prayer card to PNG and packs them into a single ZIP download. */
export async function exportPrayerCardsZip(
  prayers: Prayer[],
  onProgress?: (done: number, total: number) => void,
  origin?: string,
): Promise<Blob> {
  const base = origin ?? (typeof window === "undefined" ? "" : window.location.origin);
  const files: { name: string; data: Uint8Array }[] = [];
  for (let i = 0; i < prayers.length; i++) {
    const p = prayers[i];
    const blob = await renderPrayerCard(p, `${base}/prayers/${p.slug}`);
    files.push({
      name: `${String(i + 1).padStart(2, "0")}-${p.slug}.png`,
      data: new Uint8Array(await blob.arrayBuffer()),
    });
    onProgress?.(i + 1, prayers.length);
    await new Promise((r) => setTimeout(r, 0));
  }
  return makeZip(files);
}

