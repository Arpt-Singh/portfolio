import { useEffect, useState, type RefObject } from "react";
import { ACESFilmicToneMapping, Mesh, Points, Texture, WebGLRenderer, sRGBEncoding, type Object3D } from "three";

interface CanvasContext {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  isActive: () => boolean;
  fail: (error: unknown) => void;
}

export type CanvasSetup = (context: CanvasContext) => () => void;

export function useCanvasRenderer(ref: RefObject<HTMLCanvasElement>, setup: CanvasSetup) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let active = true;
    let renderer: WebGLRenderer | undefined;
    let cleanup: (() => void) | undefined;
    const fail = (reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason : new Error(String(reason)));
    };
    const handleContextLost = () => fail(new Error("WebGL context lost"));
    canvas.addEventListener("webglcontextlost", handleContextLost);
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.outputEncoding = sRGBEncoding;
      renderer.toneMapping = ACESFilmicToneMapping;
      renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1), 2));
      renderer.setClearColor(0x000000, 0);
      cleanup = setup({ canvas, renderer, isActive: () => active, fail });
    } catch (reason) {
      fail(reason);
    }
    return () => {
      active = false;
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      cleanup?.();
      renderer?.dispose();
      // StrictMode reuses the mounted canvas for its second effect setup.
      queueMicrotask(() => {
        if (!canvas.isConnected) renderer?.forceContextLoss();
      });
    };
  }, [ref, setup]);

  if (error) throw error;
}

export function disposeScene(scene: Object3D) {
  const textures = new Set<Texture>();
  scene.traverse((object) => {
    if (!(object instanceof Mesh) && !(object instanceof Points)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof Texture) textures.add(value);
      }
      material.dispose();
    }
  });
  textures.forEach((texture) => texture.dispose());
}
