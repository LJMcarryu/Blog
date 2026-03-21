"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useDarkMode } from "@/hooks/useDarkMode";

interface Ball {
  el: HTMLDivElement | null;
  currentX: number;
  currentY: number;
  speed: number;
  range: number;
}

const BALL_CONFIG = [
  { size: 350, speed: 0.02, range: 40, lightColor: "rgba(34, 197, 94, 0.15)", darkColor: "rgba(34, 197, 94, 0.08)", top: "15%", left: "20%" },
  { size: 280, speed: 0.015, range: 30, lightColor: "rgba(59, 130, 246, 0.12)", darkColor: "rgba(59, 130, 246, 0.06)", top: "50%", left: "60%" },
  { size: 220, speed: 0.025, range: 35, lightColor: "rgba(168, 85, 247, 0.10)", darkColor: "rgba(168, 85, 247, 0.05)", top: "70%", left: "30%" },
];

export default function BlurBalls() {
  const mousePos = useMousePosition();
  const isDark = useDarkMode();
  const ballsRef = useRef<Ball[]>(BALL_CONFIG.map((c) => ({ el: null, currentX: 0, currentY: 0, speed: c.speed, range: c.range })));
  const rafRef = useRef(0);

  useEffect(() => {
    function animate() {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      ballsRef.current.forEach((ball) => {
        if (!ball.el) return;
        // Lerp towards target
        const targetX = (mx - 0.5) * 2 * ball.range;
        const targetY = (my - 0.5) * 2 * ball.range;
        ball.currentX += (targetX - ball.currentX) * ball.speed;
        ball.currentY += (targetY - ball.currentY) * ball.speed;
        ball.el.style.transform = `translate(${ball.currentX}px, ${ball.currentY}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    // Skip animation on reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -5 }} aria-hidden="true">
      {BALL_CONFIG.map((config, i) => (
        <div
          key={i}
          ref={(el) => { ballsRef.current[i].el = el; }}
          className="blur-ball"
          style={{
            width: config.size,
            height: config.size,
            top: config.top,
            left: config.left,
            background: isDark ? config.darkColor : config.lightColor,
          }}
        />
      ))}
    </div>
  );
}
