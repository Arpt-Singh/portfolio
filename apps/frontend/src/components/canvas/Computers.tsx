import { useRef, useState } from "react";
import { Box3, Group, Mesh, PerspectiveCamera, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { disposeScene, useCanvasRenderer, type CanvasSetup } from "./useCanvasRenderer";
import "./Computers.css";

const WORKSPACE_MODEL = `${import.meta.env.BASE_URL}desktop_pc/workstation01/scene.glb`;
const WORKSPACE_PREVIEW = `${import.meta.env.BASE_URL}desktop_pc/workstation01/textures/workstation01.png`;
const MODEL_SCALE = 1.35;

const WorkstationImage = () => (
  <img src={WORKSPACE_PREVIEW} alt="" aria-hidden="true" loading="eager"
    fetchpriority="high" className="workstation__preview" />
);

const WorkstationFallback = () => (
  <div className="workstation" data-workspace-ready="false">
    <WorkstationImage />
    <p role="status" className="workstation__status">
      3D view unavailable. Showing the workstation image.
    </p>
  </div>
);

const Workstation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const setupRef = useRef<CanvasSetup>(({ renderer, canvas, isActive, fail }) => {
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    const scene = new Group();
    let loaded = false;
    let firstFrame = true;
    let frame = 0;
    let previousTime: number | undefined;
    let targetX = 0;
    let targetY = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = canvas.closest<HTMLElement>(".hero");

    const render = () => {
      if (!isActive() || !loaded) return false;
      try {
        renderer.render(scene, camera);
        if (renderer.getContext().isContextLost()) return false;
        if (firstFrame) {
          firstFrame = false;
          setReady(true);
        }
        return true;
      } catch (error) {
        fail(error);
        return false;
      }
    };

    const animate = (time: number) => {
      frame = 0;
      if (!isActive() || !loaded) return;
      const delta = previousTime === undefined ? 1 / 60 : Math.min((time - previousTime) / 1000, .1);
      previousTime = time;
      const blend = 1 - Math.exp(-10 * delta);
      scene.rotation.x += (targetX - scene.rotation.x) * blend;
      scene.rotation.y += (targetY - scene.rotation.y) * blend;
      const settled = Math.abs(targetX - scene.rotation.x) < .0001 &&
        Math.abs(targetY - scene.rotation.y) < .0001;
      if (settled) scene.rotation.set(targetX, targetY, 0);
      if (render() && !settled) frame = requestAnimationFrame(animate);
      else previousTime = undefined;
    };

    const requestMotion = () => {
      if (!frame && loaded && isActive()) frame = requestAnimationFrame(animate);
    };
    const resetMotion = () => {
      targetX = 0;
      targetY = 0;
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = undefined;
        scene.rotation.set(0, 0, 0);
        render();
      } else {
        requestMotion();
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion.matches || !hero) return;
      const bounds = hero.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      targetX = -y * .045;
      targetY = x * .065;
      requestMotion();
    };
    const handleVisibility = () => {
      if (document.hidden) resetMotion();
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      const halfFov = (camera.fov * Math.PI) / 360;
      camera.aspect = aspect;
      camera.position.set(0, 0, Math.max(
        (3 * MODEL_SCALE) / (2 * aspect * Math.tan(halfFov)),
        (2 * MODEL_SCALE) / (2 * Math.tan(halfFov)),
      ) * 1.02);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    hero?.addEventListener("pointermove", handlePointerMove);
    hero?.addEventListener("pointerleave", resetMotion);
    window.addEventListener("blur", resetMotion);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", resetMotion);

    new GLTFLoader().load(WORKSPACE_MODEL, ({ scene: model }) => {
      if (!isActive()) {
        disposeScene(model);
        return;
      }
      try {
        const bounds = new Box3().setFromObject(model);
        const size = bounds.getSize(new Vector3());
        if (!Number.isFinite(size.x) || size.x <= 0) {
          throw new Error("Workstation model has invalid bounds");
        }
        model.position.copy(bounds.getCenter(new Vector3()).multiplyScalar(-1));
        scene.scale.setScalar(MODEL_SCALE * 3 / size.x);
        scene.add(model);
        model.traverse((object) => {
          if (!(object instanceof Mesh)) return;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) {
            material.toneMapped = false;
            if ("map" in material && material.map) {
              material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
              material.map.needsUpdate = true;
            }
          }
        });
        loaded = true;
        resize();
        requestMotion();
      } catch (error) {
        fail(error);
      }
    }, undefined, fail);

    return () => {
      cancelAnimationFrame(frame);
      hero?.removeEventListener("pointermove", handlePointerMove);
      hero?.removeEventListener("pointerleave", resetMotion);
      window.removeEventListener("blur", resetMotion);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", resetMotion);
      observer.disconnect();
      disposeScene(scene);
    };
  });
  useCanvasRenderer(canvasRef, setupRef.current);

  return (
    <div className={`workstation${ready ? " workstation--ready" : ""}`} data-workspace-ready={ready}>
      {!ready && <WorkstationImage />}
      <canvas ref={canvasRef} className="workstation__canvas" aria-hidden="true" />
    </div>
  );
};

const ComputersCanvas = () => (
  <CanvasErrorBoundary name="Workstation 3D view" fallback={<WorkstationFallback />}>
    <Workstation />
  </CanvasErrorBoundary>
);

export default ComputersCanvas;
