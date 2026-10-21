import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { compile, compileString } from "sass";

const root = path.dirname(fileURLToPath(import.meta.url));

function sourceFiles(directory: string, extension = /\.tsx?$/): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(filename, extension) : extension.test(filename) ? [filename] : [];
  });
}

test("all SCSS compiles and custom properties have definitions", () => {
  const stylesheets = sourceFiles(root, /\.scss$/);
  const css = stylesheets.map((filename) => compile(filename).css).join("\n");
  const definitions = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));
  for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) {
    assert.ok(definitions.has(name), `Missing custom property: ${name}`);
  }
  const mixins = compile(path.join(root, "styles/_mixins.scss")).css;
  assert.equal(mixins, "", "Importing mixins must not emit duplicate global styles");
});

test("responsive mixins retain breakpoint boundaries and reject unknown names", () => {
  const options = { loadPaths: [path.join(root, "styles")] };
  const css = compileString(`
    @use "mixins";
    @include mixins.up(sm) { .tablet { display: grid; } }
    @include mixins.below(md) { .phone { display: flex; } }
    @include mixins.up(timeline) { .timeline { display: grid; } }
    @include mixins.reduced-motion { .motion { animation: none; } }
  `, options).css;
  assert.match(css, /min-width: 640px/);
  assert.match(css, /max-width: 767px/);
  assert.match(css, /min-width: 1170px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.throws(() => compileString(`
    @use "mixins";
    @include mixins.up(unknown) { .invalid { display: none; } }
  `, options), /Unknown breakpoint: unknown/);
});

test("presentation source has no inline styles or runtime DOM style access", () => {
  const violations: string[] = [];
  for (const filename of sourceFiles(root)) {
    const source = ts.createSourceFile(filename, readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && node.name.getText(source) === "style") {
        violations.push(`${filename}: inline JSX style`);
      }
      if (ts.isPropertyAccessExpression(node) && ["style", "cssText"].includes(node.name.text)) {
        violations.push(`${filename}: runtime DOM style access`);
      }
      if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) &&
          node.expression.name.text === "setAttribute" &&
          node.arguments[0] && ts.isStringLiteral(node.arguments[0]) && node.arguments[0].text === "style") {
        violations.push(`${filename}: runtime style attribute`);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  assert.deepEqual(violations, []);
});

test("each component with named presentation classes imports its adjacent stylesheet", () => {
  for (const filename of sourceFiles(root).filter((file) => file.endsWith(".tsx"))) {
    const content = readFileSync(filename, "utf8");
    if (!content.includes("className=")) continue;
    const stylesheet = filename.replace(/\.tsx$/, ".scss");
    assert.ok(existsSync(stylesheet), `${filename} is missing a stylesheet`);
    assert.ok(content.includes(`"./${path.basename(stylesheet)}"`), `${filename} does not import its stylesheet`);
  }
});
