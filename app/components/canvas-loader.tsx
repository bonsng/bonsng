"use client";

import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CanvasLoader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const displayRef = useRef(0);

  const animate = useCallback((target: number) => {
    cancelAnimationFrame(rafRef.current);

    const step = () => {
      const current = displayRef.current;
      const next = current + (target - current) * 0.08;

      if (Math.abs(target - next) < 0.5) {
        displayRef.current = target;
        setDisplay(target);
      } else {
        displayRef.current = next;
        setDisplay(next);
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    animate(progress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress, animate]);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!visible) return null;

  const done = !active && progress === 100;

  return (
    <div className={`canvas-loader ${done ? "canvas-loader-done" : ""}`}>
      <div className="canvas-loader-ring">
        <svg viewBox="0 0 48 48" width="48" height="48">
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="var(--glass-border-strong)"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="var(--ink-soft)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${display * 1.257} 125.7`}
            className="canvas-loader-progress"
          />
        </svg>
        <span className="canvas-loader-pct">
          {Math.round(display)}
        </span>
      </div>
    </div>
  );
}
