/**
 * Disclaimer: This component is not entirely my own
 */

"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { usePreloader } from "../preloader";
import { useMediaQuery } from "@/hooks/use-media-query";

// Gsap Ticker Function with frame rate limiting
function useTicker(callback: any, paused: boolean) {
  const frameSkipRef = React.useRef(0);
  useEffect(() => {
    if (!paused && callback) {
      const throttledCallback = () => {
        frameSkipRef.current++;
        // Limit to ~30fps for cursor animation
        if (frameSkipRef.current % 2 === 0) {
          callback();
        }
      };
      gsap.ticker.add(throttledCallback);
      return () => {
        gsap.ticker.remove(throttledCallback);
      };
    }
  }, [callback, paused]);
}

const EMPTY = {} as Record<string, any>;
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

// Function for Mouse Move Scale Change
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Function For Mouse Movement Angle in Degrees
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

/** Returns the element that has cursor-can-hover (self or nearest ancestor), or null. */
function getCursorHoverElement(el: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = el;
  while (node) {
    if (node.classList?.contains("cursor-can-hover")) return node;
    node = node.parentElement;
  }
  return null;
}

const CURSOR_DIAMETER = 50;

function ElasticCursor() {
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // React Refs for Jelly Blob and Text
  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCrispOverlay, setIsCrispOverlay] = useState(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Save pos and velocity Objects
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  // Set GSAP quick setter Values on useLayoutEffect Update
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.height = gsap.quickSetter(jellyRef.current, "height", "px");
    set.opacity = gsap.quickSetter([jellyRef.current, dotRef.current], "opacity");
  }, []);

  // Start Animation loop - optimized with memoization
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;

    const dot = dotRef.current;
    if (dot) {
      dot.style.left = lastMouseRef.current.x + "px";
      dot.style.top = lastMouseRef.current.y + "px";
    }

    // Only calculate if needed
    if (!isHovering && !isLoading) {
      const rotation = getAngle(+vel.x, +vel.y);
      const scale = getScale(+vel.x, +vel.y);

      set.x(pos.x);
      set.y(pos.y);
      set.width(50 + scale * 300);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    } else {
      set.r(0);
    }

    set.opacity?.(isHidden ? 0 : 1);
  }, [isHovering, isLoading, isHidden, pos, vel, set]);

  const loopRef = useRef(loop);
  loopRef.current = loop;
  const hoveredRef = useRef(false);
  const movedOnceRef = useRef(false);

  const [cursorMoved, setCursorMoved] = useState(false);
  const lastMouseMoveTime = useRef(0);
  const rafId = useRef<number>();

  // Run on Mouse Move with throttling - stable deps so we don't re-subscribe on every hover change
  useLayoutEffect(() => {
    if (isMobile) return;

    const setFromEvent = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTime.current < 16) return;
      lastMouseMoveTime.current = now;

      const x = e.clientX;
      const y = e.clientY;
      lastMouseRef.current = { x, y };

      const dot = dotRef.current;
      if (dot) {
        dot.style.left = x + "px";
        dot.style.top = y + "px";
      }

      if (!jellyRef.current) return;
      if (!movedOnceRef.current) {
        movedOnceRef.current = true;
        setCursorMoved(true);
      }

      const el = e.target as HTMLElement;
      const hoverEl = getCursorHoverElement(el);
      const isOverHeader = !!hoverEl?.closest("[data-cursor-crisp]");
      setIsCrispOverlay(isOverHeader);

      if (hoverEl) {
        hoveredRef.current = true;
        const rect = hoverEl.getBoundingClientRect();
        setIsHovering(true);
        gsap.to(jellyRef.current, {
          rotate: 0,
          duration: 0,
        });
        gsap.to(jellyRef.current, {
          width: rect.width + 20,
          height: rect.height + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        if (hoveredRef.current) {
          hoveredRef.current = false;
          gsap.to(jellyRef.current, {
            borderRadius: 50,
            width: CURSOR_DIAMETER,
            height: CURSOR_DIAMETER,
            duration: 0.25,
            ease: "power2.out",
          });
          setIsHovering(false);
        }
      }

      const shouldHide = !!el.closest('[data-no-custom-cursor="true"]');
      setIsHidden(shouldHide);
      if (shouldHide) document.body.style.cursor = "auto";

      gsap.to(pos, {
        x,
        y,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          (vel as { x: number; y: number }).x = (x - pos.x) * 1.2;
          (vel as { x: number; y: number }).y = (y - pos.y) * 1.2;
        },
      });

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => loopRef.current());
    };

    if (!isLoading) window.addEventListener("mousemove", setFromEvent, { passive: true });
    return () => {
      if (!isLoading) window.removeEventListener("mousemove", setFromEvent);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isLoading, isMobile]);

  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem"; // "8rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  // Reset jelly to default circle when loading finishes (prevents pill shape on initial load)
  useEffect(() => {
    if (isLoading || !jellyRef.current) return;
    const el = jellyRef.current;
    el.style.width = CURSOR_DIAMETER + "px";
    el.style.height = CURSOR_DIAMETER + "px";
    el.style.borderRadius = "50px";
  }, [isLoading]);

  useTicker(loop, isLoading || !cursorMoved || isMobile);
  if (isMobile) return null;

  // Return UI
  return (
    <>
      <div
        ref={jellyRef}
        id={"jelly-id"}
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px] border-2 border-black dark:border-white`,
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{
          zIndex: 10051,
          ...(isCrispOverlay
            ? {
                background: "hsl(0 0% 100%)",
                mixBlendMode: "difference",
                border: "2px solid hsl(0 0% 100% / 0.9)",
                backdropFilter: "none",
              }
            : { backdropFilter: "invert(100%)" }),
        }}
      ></div>
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none transition-none duration-300"
        style={{
          left: 0,
          top: 0,
          backdropFilter: "invert(100%)",
          zIndex: 10052,
        }}
      ></div>
    </>
  );
}

export default ElasticCursor;
