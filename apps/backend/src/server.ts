import { createServer } from "node:http";
import {
  HEALTH_PATH,
  type ApiErrorResponse,
  type HealthResponse,
} from "@portfolio/interface";

export function createApp() {
  return createServer((request, response) => {
    response.setHeader("Content-Type", "application/json; charset=utf-8");

    const pathname = request.url?.split("?")[0];
    if (pathname === HEALTH_PATH) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.setHeader("Allow", "GET, HEAD");
        response.writeHead(405);
        response.end(JSON.stringify({ error: "Method not allowed" } satisfies ApiErrorResponse));
        return;
      }

      const body: HealthResponse = { status: "ok", service: "portfolio-backend" };
      response.writeHead(200);
      response.end(request.method === "HEAD" ? undefined : JSON.stringify(body));
      return;
    }

    response.writeHead(404);
    response.end(JSON.stringify({ error: "Not found" } satisfies ApiErrorResponse));
  });
}
