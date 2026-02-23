import { useEffect, useRef, useCallback } from "react";

type useMouseType = {
  allowPage?: boolean;
  allowAngle?: boolean;
  allowAcc?: boolean;
};

/**
 * High-performance mouse hook.
 * Returns a stable ref object that is mutated in-place — no React re-renders.
 * Components using this should read from the ref in an animation loop (rAF / gsap.ticker).
 */
export const useMouse = ({
  allowPage,
  allowAngle,
  allowAcc,
}: useMouseType = {}) => {
  const state = useRef({ x: 0, y: 0, angle: 0, acceleration: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      state.current.x = allowPage ? e.pageX : e.clientX;
      state.current.y = allowPage ? e.pageY : e.clientY;

      if (allowAcc) {
        state.current.acceleration =
          Math.abs(e.movementX) + Math.abs(e.movementY);
      }
      if (allowAngle) {
        state.current.angle = Math.atan2(e.movementY, e.movementX);
      }
    },
    [allowPage, allowAngle, allowAcc]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return state.current;
};
