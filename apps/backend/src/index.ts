import { createApp } from "./server.js";

const portValue = process.env.PORT ?? "3001";
if (!/^\d+$/.test(portValue) || Number(portValue) < 1 || Number(portValue) > 65535) {
  throw new Error(`PORT must be an integer between 1 and 65535; received "${portValue}"`);
}

const port = Number(portValue);
const host = process.env.HOST ?? "127.0.0.1";
const server = createApp();

server.on("error", (error) => {
  console.error("Backend server error:", error);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Portfolio backend listening on http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    server.close((error) => {
      if (error) {
        console.error("Failed to close backend server:", error);
        process.exitCode = 1;
      }
    });
    server.closeIdleConnections();
  });
}
