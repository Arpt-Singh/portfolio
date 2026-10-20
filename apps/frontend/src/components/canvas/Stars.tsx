import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import type { Points as ThreePoints } from "three";
import { CanvasErrorBoundary, WebGLContextGuard } from "./CanvasErrorBoundary";

const Stars = () => {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() => {
    const positions = new Float32Array(4998);
    random.inSphere(positions, { radius: 1.2 });
    return positions;
  });

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='pointer-events-none w-full h-auto absolute inset-0 z-[-1]' aria-hidden='true'>
      <CanvasErrorBoundary name="Decorative star field" fallback={null}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <WebGLContextGuard />
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default StarsCanvas;
