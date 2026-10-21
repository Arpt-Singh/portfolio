import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.dirname(fileURLToPath(import.meta.url));

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(filename) : /\.tsx?$/.test(filename) ? [filename] : [];
  });
}

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
    const stylesheet = filename.replace(/\.tsx$/, ".css");
    assert.ok(existsSync(stylesheet), `${filename} is missing a stylesheet`);
    assert.ok(content.includes(`"./${path.basename(stylesheet)}"`), `${filename} does not import its stylesheet`);
  }
});
