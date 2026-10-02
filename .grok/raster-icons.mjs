import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const svg = readFileSync(resolve("/workspace/.grok/favicon.svg.tmp"), "utf8");
const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();

async function raster(size, outPath) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><html><head><style>
      html,body{margin:0;padding:0;background:#070b14;width:${size}px;height:${size}px;overflow:hidden}
      img{display:block;width:${size}px;height:${size}px}
    </style></head><body><img src="${dataUrl}" width="${size}" height="${size}" /></body></html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({ path: outPath });
}

await raster(16, "/workspace/.grok/favicon-16.png");
await raster(32, "/workspace/.grok/favicon-32.png");
await raster(192, "/workspace/.grok/icon-192.hand.png");
await raster(512, "/workspace/.grok/icon-512.hand.png");
await browser.close();
console.log("ok");
