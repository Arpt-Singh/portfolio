import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { HEALTH_PATH, isHealthResponse, type HealthResponse } from "@portfolio/interface";
import { getHealth } from "./health";

afterEach(() => mock.restoreAll());

test("health client uses the shared route and validates the response", async () => {
  const body: HealthResponse = { status: "ok", service: "portfolio-backend" };
  const fetchMock = mock.method(globalThis, "fetch", async () => Response.json(body));
  const signal = new AbortController().signal;

  assert.deepEqual(await getHealth(signal), body);
  assert.deepEqual(fetchMock.mock.calls[0].arguments, [HEALTH_PATH, { signal }]);
});

test("health client rejects HTTP failures", async () => {
  mock.method(globalThis, "fetch", async () => new Response(null, { status: 503 }));
  await assert.rejects(getHealth(), /HTTP 503/);
});

test("health client rejects invalid response shapes", async () => {
  for (const body of [null, {}, { status: "ok" }, { status: "error", service: "portfolio-backend" }]) {
    assert.equal(isHealthResponse(body), false);
    mock.method(globalThis, "fetch", async () => Response.json(body));
    await assert.rejects(getHealth(), /invalid health response/);
    mock.restoreAll();
  }
});

test("health client propagates network errors and invalid JSON", async () => {
  mock.method(globalThis, "fetch", async () => { throw new Error("Network unavailable"); });
  await assert.rejects(getHealth(), /Network unavailable/);
  mock.restoreAll();
  mock.method(globalThis, "fetch", async () => new Response("not json"));
  await assert.rejects(getHealth(), SyntaxError);
});
