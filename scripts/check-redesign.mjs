import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const loadCommonJs = createRequire(import.meta.url);

const root = process.cwd();
const output = fs.mkdtempSync(path.join(os.tmpdir(), "beyond-ui-check-"));
try {
  execFileSync(
    path.join(root, "node_modules/.bin/tsc"),
    [
      "lib/redesign/loadHomePage.ts",
      "lib/redesign/loadPreviewProject.ts",
      "lib/redesign/getFooterContent.ts",
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--skipLibCheck",
      "--esModuleInterop",
      "--outDir",
      output,
    ],
    { stdio: "inherit" },
  );
  const load = (name) => loadCommonJs(path.join(output, name + ".js")).default;
  const home = load("loadHomePage")();
  const project = load("loadPreviewProject");
  const footer = load("getFooterContent");
  assert.equal(home.projects.length, 4);
  assert.equal(home.services.length, 7);
  assert.equal(home.services[0].slug, "branding-design");
  assert.equal(home.services.at(-1).slug, "ai-business-automation");
  assert.equal(project("not-a-project"), null);
  const seen = new Set();
  let slug = home.projects[0].slug;
  for (let i = 0; i < home.projects.length; i++) {
    const result = project(slug);
    assert.ok(result);
    assert.equal(result.index, i);
    seen.add(slug);
    slug = result.next.slug;
  }
  assert.equal(seen.size, 4);
  assert.equal(slug, home.projects[0].slug);
  assert.equal(footer("/contact").compact, true);
  assert.equal(footer("/about").compact, false);
  assert.equal(footer("/services/ai-business-automation").title[0], "More time.");
  assert.equal(footer("/ai-automation").title[0], "More time.");

  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const file = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  const files = [...walk("components/redesign"), ...walk("lib/redesign"), ...walk("app/(site)")];
  const migrated = files.filter((file) => !file.endsWith("ContactForm.tsx") && !file.endsWith("actions.ts"));
  for (const file of migrated) {
    if (!/\.(tsx?|css)$/.test(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    if (!file.endsWith(".data.ts")) assert.ok(source.split("\n").length <= 151, `${file}: over 150 lines`);
    assert.ok(!/style=\{\{/.test(source), `${file}: inline styles`);
    assert.ok(
      !/\b(?:bg|text|w|h|p|m|gap|grid-cols|leading|tracking)-\[/.test(source),
      `${file}: arbitrary utility value`,
    );
    for (const match of source.matchAll(/"(\/images\/[^"]+)"/g)) {
      assert.ok(fs.existsSync(path.join(root, "public", match[1])), `${file}: missing ${match[1]}`);
    }
  }
  console.log(
    "Redesign checks passed: project navigation, service order, footer variants, asset references and frontend rules.",
  );
} finally {
  fs.rmSync(output, { recursive: true, force: true });
}
