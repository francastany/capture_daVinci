import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const TARGET_DIRS = ["assets/desktop", "assets/tablet", "assets/mobile", "assets"];
const CONVERTIBLE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const EXCLUDE_NAMES = new Set(["iconoChrome.png"]);
const HIGH_QUALITY_NAMES = new Set(["logo_capture.png", "logo_dark.png"]);

function listImageFiles(dir) {
  return readdirSync(dir)
    .filter((name) => {
      if (EXCLUDE_NAMES.has(name)) return false;
      if (!CONVERTIBLE_EXT.has(extname(name).toLowerCase())) return false;
      return statSync(join(dir, name)).isFile();
    })
    .map((name) => join(dir, name));
}

async function convertFile(inputPath) {
  const outputPath = join(
    inputPath.slice(0, -extname(inputPath).length) + ".webp"
  );

  if (existsSync(outputPath)) {
    console.log(`SKIP (exists): ${inputPath}`);
    return null;
  }

  const quality = HIGH_QUALITY_NAMES.has(basename(inputPath)) ? 92 : 82;
  const beforeBytes = statSync(inputPath).size;

  await sharp(inputPath).webp({ quality }).toFile(outputPath);

  const afterBytes = statSync(outputPath).size;
  const beforeKB = (beforeBytes / 1024).toFixed(1);
  const afterKB = (afterBytes / 1024).toFixed(1);
  const pct = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1);
  console.log(`${inputPath} | ${beforeKB}KB -> ${afterKB}KB | -${pct}%`);

  return { beforeBytes, afterBytes };
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let converted = 0;

  for (const dir of TARGET_DIRS) {
    for (const file of listImageFiles(dir)) {
      const result = await convertFile(file);
      if (result) {
        totalBefore += result.beforeBytes;
        totalAfter += result.afterBytes;
        converted += 1;
      }
    }
  }

  if (converted === 0) {
    console.log("\nNo new files converted.");
    return;
  }

  const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(
    `\nConverted ${converted} file(s): ${(totalBefore / 1024).toFixed(1)}KB -> ${(totalAfter / 1024).toFixed(1)}KB (-${totalPct}%)`
  );
}

main();
