"use client";

import React from "react";
import { ReactLenis } from "@/lib/lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {

  return (
    <ReactLenis
      root
      options={{
        duration: 1.0, // Snappier — less intermediate scroll events
        lerp: 0.1, // Faster interpolation — reduces per-frame work downstream
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false, // Avoid double-processing touch events
        prevent: (node) => {
          if (isInsideModal) return true;
          return Boolean(node?.closest?.(".modall"));
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
