import { Component, type ErrorInfo, type ReactNode } from "react";

interface CanvasErrorBoundaryProps {
  name: string;
  fallback: ReactNode;
  children: ReactNode;
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
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
