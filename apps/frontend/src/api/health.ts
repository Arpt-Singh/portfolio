import { HEALTH_PATH, isHealthResponse, type HealthResponse } from "@portfolio/interface";

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(HEALTH_PATH, { signal });
  if (!response.ok) {
    throw new Error(`Health request failed with HTTP ${response.status}`);
  }

  const body: unknown = await response.json();
  if (!isHealthResponse(body)) {
    throw new Error("Backend returned an invalid health response");
  }
  return body;
}
