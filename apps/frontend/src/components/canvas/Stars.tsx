import { useRef } from "react";
import { BufferGeometry, Float32BufferAttribute, Group, PerspectiveCamera, Points, PointsMaterial, Scene } from "three";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { disposeScene, useCanvasRenderer, type CanvasSetup } from "./useCanvasRenderer";
import "./Stars.scss";

const setupStars: CanvasSetup = ({ canvas, renderer, isActive, fail }) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 1, .1, 1000);
  camera.position.set(0, 0, 1);
  const positions = new Float32Array(4998);
  for (let index = 0; index < positions.length; index += 3) {
    const radius = Math.cbrt(Math.random()) * 1.2;
    const z = Math.random() * 2 - 1;
    const angle = Math.random() * Math.PI * 2;
    const radial = Math.sqrt(1 - z * z);
    positions[index] = radius * radial * Math.cos(angle);
    positions[index + 1] = radius * radial * Math.sin(angle);
    positions[index + 2] = radius * z;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({
    color: "#f272c8", size: .002, transparent: true, sizeAttenuation: true, depthWrite: false,
  });
  const points = new Points(geometry, material);
  const group = new Group();
  group.rotation.z = Math.PI / 4;
  group.add(points);
  scene.add(group);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let previousTime: number | undefined;
  const draw = (time: number) => {
    if (!isActive()) return;
    const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, .1);
    previousTime = time;
    if (!reducedMotion.matches) {
      points.rotation.x -= delta / 10;
      points.rotation.y -= delta / 15;
    }
    try {
      renderer.render(scene, camera);
      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    } catch (error) {
      fail(error);
    }
  };
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    cancelAnimationFrame(frame);
    previousTime = undefined;
    draw(performance.now());
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  reducedMotion.addEventListener("change", resize);
  resize();
  return () => {
    observer.disconnect();
    reducedMotion.removeEventListener("change", resize);
    cancelAnimationFrame(frame);
    disposeScene(scene);
  };
};

const Stars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasRenderer(canvasRef, setupStars);
  return <canvas ref={canvasRef} className="stars__canvas" />;
};

const StarsCanvas = () => (
  <div className="stars" aria-hidden="true">
    <CanvasErrorBoundary name="Decorative star field" fallback={null}>
      <Stars />
    </CanvasErrorBoundary>
  </div>
);

export default StarsCanvas;
