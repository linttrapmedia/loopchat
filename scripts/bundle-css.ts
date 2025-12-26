/**
 * CSS Bundler Script
 *
 * Bundles all CSS files from ./src/styles into a single minified file at ./public/styles.css
 * Uses Bun's native bundler with CSS support.
 *
 * Usage: bun run scripts/bundle-css.ts
 */

import { readdir } from "node:fs/promises";
import { join } from "node:path";

const STYLES_DIR = "./src/styles";
const OUTPUT_DIR = "./src/public";
const OUTPUT_FILE = "styles.css";

/**
 * Minify CSS by removing comments, extra whitespace, and unnecessary characters
 */
function minifyCSS(css: string): string {
  return (
    css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove newlines and carriage returns
      .replace(/[\r\n]+/g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      // Remove space around brackets, colons, semicolons, commas
      .replace(/\s*([{};:,>~+])\s*/g, "$1")
      // Remove space around media query parentheses
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")")
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, "}")
      // Remove leading/trailing whitespace
      .trim()
  );
}

async function bundleCSS() {
  console.log("🎨 Bundling CSS files...");

  // Get all CSS files from the styles directory
  const files = await readdir(STYLES_DIR);
  const cssFiles = files
    .filter((file) => file.endsWith(".css"))
    .sort((a, b) => {
      // Sort so that files starting with underscore (tokens) come first
      const aIsToken = a.startsWith("_");
      const bIsToken = b.startsWith("_");
      if (aIsToken && !bIsToken) return -1;
      if (!aIsToken && bIsToken) return 1;
      return a.localeCompare(b);
    });

  console.log(`📁 Found ${cssFiles.length} CSS files`);

  // Read and concatenate all CSS files
  const cssContents: string[] = [];

  for (const file of cssFiles) {
    const filePath = join(STYLES_DIR, file);
    const content = await Bun.file(filePath).text();
    cssContents.push(content);
  }

  // Concatenate and minify
  const bundled = cssContents.join("\n");
  const minified = minifyCSS(bundled);

  // Write the bundled CSS
  const outputPath = join(OUTPUT_DIR, OUTPUT_FILE);
  await Bun.write(outputPath, minified);

  const originalSize = new TextEncoder().encode(bundled).length;
  const minifiedSize = new TextEncoder().encode(minified).length;
  const savings = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1);

  console.log(`✅ Bundled CSS written to ${outputPath}`);
  console.log(
    `📦 Original: ${(originalSize / 1024).toFixed(2)} KB → Minified: ${(minifiedSize / 1024).toFixed(
      2
    )} KB (${savings}% smaller)`
  );
}

bundleCSS().catch((error) => {
  console.error("❌ Error bundling CSS:", error);
  process.exit(1);
});
