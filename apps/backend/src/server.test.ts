import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { HEALTH_PATH, isHealthResponse } from "@portfolio/interface";
import { createApp } from "./server.js";

const server = createApp();
let baseUrl: string;

before(async () => {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.removeListener("error", reject);
      resolve();
    });
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Expected a TCP address");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeIdleConnections();
  });
});

test("GET health returns the exact shared contract", async () => {
  const response = await fetch(`${baseUrl}${HEALTH_PATH}`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  const body: unknown = await response.json();
  assert.deepEqual(body, { status: "ok", service: "portfolio-backend" });
  assert.equal(isHealthResponse(body), true);
});

test("health accepts query strings and HEAD without a body", async () => {
  assert.equal((await fetch(`${baseUrl}${HEALTH_PATH}?check=1`)).status, 200);
  const response = await fetch(`${baseUrl}${HEALTH_PATH}`, { method: "HEAD" });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "");
});

test("unknown routes return a JSON 404", async () => {
  const response = await fetch(`${baseUrl}/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Not found" });
});

test("unsupported health methods return 405 with allowed methods", async () => {
  const response = await fetch(`${baseUrl}${HEALTH_PATH}`, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
  assert.deepEqual(await response.json(), { error: "Method not allowed" });
});
