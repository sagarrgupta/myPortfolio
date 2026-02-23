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

// Gsap Ticker — runs at native refresh rate for buttery-smooth animation
function useTicker(callback: () => void, paused: boolean) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (paused) return;
    const tick = () => cbRef.current();
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [paused]);
}

const EMPTY = {} as Record<string, any>;
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

// Fast math helpers — avoid Math.pow overhead
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

/** Walk up from `el` to find nearest `.cursor-can-hover` ancestor. */
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

  // DOM refs
  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // ---- HOT-PATH FLAGS: refs instead of state to avoid React re-renders ----
  const isHoveringRef = useRef(false);
  const isHiddenRef = useRef(false);
  const isCrispOverlayRef = useRef(false);
  const hoveredRef = useRef(false);
  const lastHoverEl = useRef<HTMLElement | null>(null);
  const movedOnceRef = useRef(false);

  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Mutable pos / vel objects — never trigger renders
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  // One-shot state for "cursor has moved at least once" (gate for ticker start)
  const [cursorMoved, setCursorMoved] = useState(false);

  // GSAP quick-setters — set once, reused every frame
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.height = gsap.quickSetter(jellyRef.current, "height", "px");
    set.opacity = gsap.quickSetter(
      [jellyRef.current, dotRef.current],
      "opacity"
    );
  }, []);

  // ---- RENDER LOOP (runs every frame via gsap.ticker) ----
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;

    // Update dot position directly — no React state involved
    const dot = dotRef.current;
    if (dot) {
      dot.style.left = lastMouseRef.current.x + "px";
      dot.style.top = lastMouseRef.current.y + "px";
    }

    // Apply crisp-overlay style change via direct DOM mutation (not React)
    const jelly = jellyRef.current;
    if (jelly) {
      if (isCrispOverlayRef.current) {
        jelly.style.background = "hsl(0 0% 100%)";
        jelly.style.mixBlendMode = "difference";
        jelly.style.border = "2px solid hsl(0 0% 100% / 0.9)";
        jelly.style.backdropFilter = "none";
      } else {
        jelly.style.background = "";
        jelly.style.mixBlendMode = "";
        jelly.style.border = "";
        jelly.style.backdropFilter = "invert(100%)";
      }
    }

    // Elastic jelly blob transform
    if (!isHoveringRef.current && !isLoading) {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);

      set.x(pos.x);
      set.y(pos.y);
      set.width(50 + scale * 300);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    } else {
      set.r(0);
    }

    set.opacity?.(isHiddenRef.current ? 0 : 1);
  }, [isLoading, pos, vel, set]);

  // ---- MOUSE MOVE HANDLER (passive, zero React state on hot path) ----
  useLayoutEffect(() => {
    if (isMobile) return;

    const setFromEvent = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      lastMouseRef.current.x = x;
      lastMouseRef.current.y = y;

      if (!jellyRef.current) return;

      // Gate: fire setCursorMoved(true) exactly once
      if (!movedOnceRef.current) {
        movedOnceRef.current = true;
        setCursorMoved(true);
      }

      // Hover detection — only getBoundingClientRect when hover target changes
      const el = e.target as HTMLElement;
      const hoverEl = getCursorHoverElement(el);
      isCrispOverlayRef.current = !!hoverEl?.closest("[data-cursor-crisp]");

      if (hoverEl) {
        const isNewHover = !hoveredRef.current || lastHoverEl.current !== hoverEl;
        if (isNewHover) {
          hoveredRef.current = true;
          lastHoverEl.current = hoverEl;
          isHoveringRef.current = true;
          gsap.to(jellyRef.current, {
            rotate: 0,
            duration: 0,
          });
        }
        // Always re-read rect — element may be mid-animation (e.g. menu opening)
        const rect = hoverEl.getBoundingClientRect();
        gsap.to(jellyRef.current, {
          width: rect.width + 20,
          height: rect.height + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: isNewHover ? 0.25 : 0.15,
          ease: "power2.out",
          overwrite: true,
        });
      } else if (hoveredRef.current) {
        hoveredRef.current = false;
        lastHoverEl.current = null;
        isHoveringRef.current = false;
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      // Custom-cursor hide (e.g. over inputs)
      const shouldHide = !!el.closest('[data-no-custom-cursor="true"]');
      isHiddenRef.current = shouldHide;
      document.body.style.cursor = shouldHide ? "auto" : "";

      // Smooth position tween — velocity is derived inside onUpdate
      gsap.to(pos, {
        x,
        y,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          vel.x = (x - pos.x) * 1.2;
          vel.y = (y - pos.y) * 1.2;
        },
      });
    };

    if (!isLoading)
      window.addEventListener("mousemove", setFromEvent, { passive: true });
    return () => {
      if (!isLoading) window.removeEventListener("mousemove", setFromEvent);
      document.body.style.cursor = "";
      // Kill any in-flight GSAP tween on the pos object
      gsap.killTweensOf(pos);
    };
  }, [isLoading, isMobile, pos, vel]);

  // Loading-bar width sync
  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  // Reset jelly to circle after loading finishes
  useEffect(() => {
    if (isLoading || !jellyRef.current) return;
    const el = jellyRef.current;
    el.style.width = CURSOR_DIAMETER + "px";
    el.style.height = CURSOR_DIAMETER + "px";
    el.style.borderRadius = "50px";
  }, [isLoading]);

  // Start ticker only after first move, not while loading, never on mobile
  useTicker(loop, isLoading || !cursorMoved || isMobile);
  if (isMobile) return null;

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
          backdropFilter: "invert(100%)",
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
