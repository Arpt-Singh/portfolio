import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Box3, Mesh, PerspectiveCamera, Vector3 } from "three";
import { CanvasErrorBoundary, WebGLContextGuard } from "./CanvasErrorBoundary";

const WORKSPACE_MODEL = `${import.meta.env.BASE_URL}desktop_pc/workstation01/scene.glb`;
const WORKSPACE_PREVIEW = `${import.meta.env.BASE_URL}desktop_pc/workstation01/textures/workstation01.png`;
const MODEL_SCALE = 1.35;

const CanvasSizer = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const container = gl.domElement.parentElement;
    if (!container) return;
    if (!(camera instanceof PerspectiveCamera)) {
      throw new Error("Workstation canvas requires a perspective camera");
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      gl.setSize(width, height, false);
      gl.domElement.style.width = "100%";
      gl.domElement.style.height = "100%";

      const aspect = width / height;
      const halfFov = (camera.fov * Math.PI) / 360;
      const fitWidth = (3 * MODEL_SCALE) / (2 * aspect * Math.tan(halfFov));
      const fitHeight = (2 * MODEL_SCALE) / (2 * Math.tan(halfFov));
      const distance = Math.max(fitWidth, fitHeight) * 1.02;
      camera.aspect = aspect;
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, [camera, gl]);

  return null;
};

const WorkspaceModel = ({ onReady }: { onReady: () => void }) => {
  const { scene } = useGLTF(WORKSPACE_MODEL);
  const { gl, invalidate } = useThree();
  const rendered = useRef(false);
  const [renderError, setRenderError] = useState<Error | null>(null);
  useFrame((state) => {
    if (renderError) return;
    try {
      state.gl.render(state.scene, state.camera);
    } catch (error) {
      // Frame callbacks run outside React, so rethrow through the next render.
      setRenderError(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    if (state.gl.getContext().isContextLost()) return;
    if (!rendered.current) {
      rendered.current = true;
      onReady();
    }
  }, 1);
  const model = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    return { position: center.multiplyScalar(-1), scale: 3 / size.x };
  }, [scene]);

  useEffect(() => {
    const anisotropy = gl.capabilities.getMaxAnisotropy();

    scene.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (!("map" in material) || !material.map) continue;
        material.map.anisotropy = anisotropy;
        material.map.needsUpdate = true;
        material.toneMapped = false;
        material.needsUpdate = true;
      }
    });
    invalidate();
  }, [gl, scene, invalidate]);

  if (renderError) throw renderError;

  return (
    <group scale={MODEL_SCALE * model.scale}>
      <primitive object={scene} position={model.position} />
    </group>
  );
};

const WorkstationImage = () => (
  <img
    src={WORKSPACE_PREVIEW}
    alt=""
    aria-hidden="true"
    loading="eager"
    fetchpriority="high"
    className="absolute inset-0 z-10 h-full w-full object-contain"
    style={{ transform: "scale(0.9803921569)" }}
  />
);

const WorkstationFallback = () => (
  <>
    <WorkstationImage />
    <p role="status" className="absolute inset-x-0 bottom-8 z-20 text-center text-sm text-secondary">
      3D view unavailable. Showing the workstation image.
    </p>
  </>
);

const ComputersCanvas = () => {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setReady(false), []);

  return (
    <div className="relative h-full w-full" data-workspace-ready={ready}>
      <CanvasErrorBoundary
        name="Workstation 3D view"
        fallback={<WorkstationFallback />}
        onError={handleError}
      >
        {!ready && <WorkstationImage />}
        <Canvas
          fallback={<WorkstationFallback />}
          frameloop={ready ? "demand" : "always"}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }}
          gl={{ antialias: true }}
        >
          <WebGLContextGuard />
          <CanvasSizer />
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 1, 5]} intensity={1.2} />
            <WorkspaceModel onReady={handleReady} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.06}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

useGLTF.preload(WORKSPACE_MODEL);

export default ComputersCanvas;