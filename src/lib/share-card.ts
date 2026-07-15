import type { Apparition } from "@/data/apparitions";
import { STATUS_LABEL } from "@/data/apparitions";
import { apparitionImage } from "@/data/apparition-images";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
) {
  const ir = img.width / img.height;
  const dr = dw / dh;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (ir > dr) {
    sw = img.height * dr;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / dr;
    sy = 0; // top-align
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

const W = 1080;
const H = 1350;

function statusColor(status: Apparition["status"]) {
  switch (status) {
    case "approved": return "#6ee7b7";
    case "worthy": return "#7dd3fc";
    case "investigation": return "#fcd34d";
    case "not_approved": return "#fda4af";
  }
}

async function ensureFonts() {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.all([
      (document as any).fonts.load("italic 700 96px 'Cormorant Garamond'"),
      (document as any).fonts.load("600 32px 'Karla'"),
      (document as any).fonts.load("500 24px 'Karla'"),
    ]);
  } catch {}
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderShareCard(a: Apparition, url: string): Promise<Blob> {
  await ensureFonts();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Aurora background
  const bg = ctx.createRadialGradient(W * 0.25, H * 0.05, 50, W * 0.5, H * 0.5, H);
  bg.addColorStop(0, "#3b3f8f");
  bg.addColorStop(0.55, "#1a2050");
  bg.addColorStop(1, "#0a0f2c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Devotional artwork (top-cover full frame under the aurora scrim)
  const imgSrc = apparitionImage(a.slug);
  if (imgSrc) {
    try {
      const img = await loadImage(imgSrc);
      drawCover(ctx, img, 0, 0, W, H);
    } catch {}
  }

  // Halo glows
  const glow1 = ctx.createRadialGradient(W * 0.85, H * 0.15, 0, W * 0.85, H * 0.15, 500);
  glow1.addColorStop(0, "rgba(140, 200, 255, 0.35)");
  glow1.addColorStop(1, "rgba(140, 200, 255, 0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, W, H);

  const glow2 = ctx.createRadialGradient(W * 0.15, H * 0.85, 0, W * 0.15, H * 0.85, 550);
  glow2.addColorStop(0, "rgba(240, 200, 120, 0.25)");
  glow2.addColorStop(1, "rgba(240, 200, 120, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  // Stars
  const rand = mulberry32(hash(a.slug));
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let i = 0; i < 140; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = rand() * 1.8 + 0.3;
    ctx.globalAlpha = 0.3 + rand() * 0.7;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Watermark year
  ctx.font = "italic 700 360px 'Cormorant Garamond', serif";
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.textAlign = "right";
  ctx.fillText(String(a.year), W - 40, 340);

  // Bottom scrim
  const scrim = ctx.createLinearGradient(0, H * 0.4, 0, H);
  scrim.addColorStop(0, "rgba(0,0,0,0)");
  scrim.addColorStop(1, "rgba(0,0,0,0.75)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, W, H);

  // Eyebrow
  ctx.textAlign = "left";
  ctx.fillStyle = "#e8c86a";
  ctx.font = "600 22px 'Karla', sans-serif";
  ctx.fillText("MARIAN APPARITIONS", 72, 110);

  // Status pill
  const label = STATUS_LABEL[a.status].toUpperCase();
  ctx.font = "700 22px 'Karla', sans-serif";
  const pillW = ctx.measureText(label).width + 56;
  const pillY = H - 520;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, 72, pillY, pillW, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = statusColor(a.status);
  ctx.beginPath();
  ctx.arc(72 + 22, pillY + 26, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 72 + 38, pillY + 34);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 600 96px 'Cormorant Garamond', serif";
  const titleLines = wrap(ctx, a.title, W - 144);
  let ty = H - 380;
  for (const line of titleLines.slice(0, 3)) {
    ctx.fillText(line, 72, ty);
    ty += 104;
  }

  // Gold hairline
  const grad = ctx.createLinearGradient(72, 0, 72 + 220, 0);
  grad.addColorStop(0, "#e8c86a");
  grad.addColorStop(1, "rgba(232,200,106,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(72, ty + 6, 220, 2);

  // Location
  ctx.font = "500 30px 'Karla', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(`${a.location} · ${a.country}`, 72, ty + 60);

  // Summary
  ctx.font = "italic 500 30px 'Cormorant Garamond', serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  const sumLines = wrap(ctx, `"${a.summary}"`, W - 144);
  let sy = ty + 120;
  for (const line of sumLines.slice(0, 4)) {
    ctx.fillText(line, 72, sy);
    sy += 40;
  }

  // Footer URL
  ctx.font = "600 22px 'Karla', sans-serif";
  ctx.fillStyle = "#e8c86a";
  ctx.textAlign = "left";
  ctx.fillText("✦", 72, H - 72);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText(shortUrl(url), 100, H - 72);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png", 0.95);
  });
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

function shortUrl(u: string) {
  try {
    const url = new URL(u);
    return url.host + url.pathname;
  } catch {
    return u;
  }
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

export function apparitionUrl(slug: string): string {
  if (typeof window === "undefined") return `/apparition/${slug}`;
  return `${window.location.origin}/apparition/${slug}`;
}
