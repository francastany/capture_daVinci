import { readdirSync, statSync, existsSync, unlinkSync } from "node:fs";
import { join, extname, basename } from "node:path";

const TARGET_DIRS = ["assets/desktop", "assets/tablet", "assets/mobile", "assets"];
const CONVERTIBLE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const EXCLUDE_NAMES = new Set(["iconoChrome.png"]);

let deleted = 0;

for (const dir of TARGET_DIRS) {
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_NAMES.has(name)) continue;
    if (!CONVERTIBLE_EXT.has(extname(name).toLowerCase())) continue;

    const filePath = join(dir, name);
    if (!statSync(filePath).isFile()) continue;

    const webpPath = join(dir, basename(name, extname(name)) + ".webp");
    if (existsSync(webpPath)) {
      unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
      deleted += 1;
    } else {
      console.log(`SKIP (no .webp sibling): ${filePath}`);
    }
  }
}

console.log(`\nDeleted ${deleted} original file(s).`);
