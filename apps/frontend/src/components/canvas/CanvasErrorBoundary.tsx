import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";

interface CanvasErrorBoundaryProps {
  name: string;
  fallback: ReactNode;
  children: ReactNode;
  onError?: () => void;
}

export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`${this.props.name} unavailable:`, error, info.componentStack);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function WebGLContextGuard() {
  const { gl } = useThree();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = () => {
      setError(new Error("WebGL context lost"));
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () => canvas.removeEventListener("webglcontextlost", handleContextLost);
  }, [gl]);

  if (error) throw error;
  return null;
}
