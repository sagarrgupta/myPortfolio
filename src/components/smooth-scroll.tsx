"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll - no-op for performance
  });

  useEffect(() => {
    const handleDOMReady = () => {
      lenis?.stop();
      lenis?.start();
    };
    
    if (document.readyState === "complete") {
      handleDOMReady();
    } else {
      document.addEventListener("DOMContentLoaded", handleDOMReady);
    }
    
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMReady);
    };
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.5, // Reduced from 2 for snappier feel
        lerp: 0.1, // Smoother interpolation
        smoothWheel: true,
        wheelMultiplier: 1, // Reduce scroll sensitivity
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
