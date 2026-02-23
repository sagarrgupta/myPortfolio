"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useMousePosition } from "@/utils/mouse";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  // Reduce particle count on mobile/low-end devices
  const effectiveQuantity = useMemo(() => {
    if (typeof window === "undefined") return quantity;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 ||
      (navigator as any).deviceMemory <= 4;
    const isMobileDevice = window.innerWidth < 768;
    return (isLowEndDevice || isMobileDevice) ? Math.floor(quantity * 0.6) : quantity;
  }, [quantity]);
  // Frame rate limiting - only animate when visible and reduce frame rate on low-end devices
  const [isVisible, setIsVisible] = useState(true);
  const targetFPS = useMemo(() => {
    if (typeof window === "undefined") return 60;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 ||
      (navigator as any).deviceMemory <= 4;
    return isLowEndDevice ? 30 : 60; // 30 FPS for low-end, 60 for high-end
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const canvasRectRef = useRef<DOMRect | null>(null);
  const isVisibleRef = useRef(true);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1; // Cap DPR at 2 for performance

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    if (typeof window === "undefined" || !canvasContainerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "50px" }
    );
    observer.observe(canvasContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Helper functions - defined before animate
  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      // Update cached rect on resize
      canvasRectRef.current = canvasRef.current.getBoundingClientRect();
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const drawParticles = useCallback(() => {
    clearContext();
    const particleCount = effectiveQuantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [effectiveQuantity]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  // Define animate before useEffect that uses it
  const lastFrameTimeRef = useRef(0);
  const animate = useCallback(() => {
    if (!context.current || !isVisibleRef.current) return;

    // Timestamp-based frame rate limiting
    const now = performance.now();
    const frameInterval = 1000 / targetFPS;
    if (now - lastFrameTimeRef.current < frameInterval) {
      return;
    }
    lastFrameTimeRef.current = now;

    // Read mouse position from mutable ref (zero re-renders)
    // Use cached rect instead of per-frame getBoundingClientRect
    if (canvasRef.current) {
      const rect = canvasRectRef.current;
      if (rect) {
        const { w, h } = canvasSize.current;
        const mx = mousePosition.x - rect.left - w / 2;
        const my = mousePosition.y - rect.top - h / 2;
        const inside = mx < w / 2 && mx > -w / 2 && my < h / 2 && my > -h / 2;
        if (inside) {
          mouse.current.x = mx;
          mouse.current.y = my;
        }
      }
    }

    clearContext();

    // Batch operations for better performance
    const circlesToUpdate: Circle[] = [];
    const circlesToRemove: number[] = [];

    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value - simplified calculation
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = Math.min(...edge);
      const remapClosestEdge = Math.min(Math.max(remapValue(closestEdge, 0, 20, 0, 1), 0), 1);

      if (remapClosestEdge >= 1) {
        circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      // Update position
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      // Check if out of bounds
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circlesToRemove.push(i);
      } else {
        circlesToUpdate.push(circle);
      }
    });

    // Remove circles that went out of bounds (in reverse to maintain indices)
    circlesToRemove.reverse().forEach(idx => {
      circles.current.splice(idx, 1);
      const newCircle = circleParams();
      drawCircle(newCircle);
    });

    // Batch draw all circles
    circlesToUpdate.forEach(circle => {
      drawCircle(circle, true);
    });
  }, [targetFPS, staticity, ease, mousePosition]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d", { alpha: true, desynchronized: true });
    }
    initCanvas();

    let animationId: number;
    const startAnimation = () => {
      const frame = () => {
        animate();
        animationId = requestAnimationFrame(frame);
      };
      animationId = requestAnimationFrame(frame);
    };

    startAnimation();

    // Throttle resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
    };
  }, [animate]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  return (
    <div
      className={cn(
        className,
        "dark:bg-gradient-to-tl from-black via-zinc-600/20 to-black"
      )}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
