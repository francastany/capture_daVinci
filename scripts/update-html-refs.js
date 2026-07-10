import { readFileSync, writeFileSync } from "node:fs";

const FILES = ["index.html", "articulo.html"];
const EXCLUDE_NAMES = ["iconoChrome.png"];

// Matches any assets/... path ending in .jpg/.jpeg/.png, wherever it appears
// (src=, srcset=, Tailwind bg-[url(...)], or absolute og:image/twitter:image URLs).
const IMAGE_PATH_RE = /assets\/[^"'\s]+\.(?:jpe?g|png)\b/gi;

for (const file of FILES) {
  const original = readFileSync(file, "utf8");
  let count = 0;

  const updated = original.replace(IMAGE_PATH_RE, (match) => {
    if (EXCLUDE_NAMES.some((name) => match.endsWith(name))) return match;
    count += 1;
    return match.replace(/\.(?:jpe?g|png)$/i, ".webp");
  });

  writeFileSync(file, updated, "utf8");
  console.log(`${file}: ${count} replacement(s)`);
}
