"use client";

import React, { useMemo } from "react";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";
import RadialMenu from "@/components/radial-menu/index";

export default React.memo(function AppOverlays() {
  // Adaptive particle count based on device performance
  const particleQuantity = useMemo(() => {
    if (typeof window === "undefined") return 50;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || 
                           (navigator as any).deviceMemory <= 4;
    return isLowEndDevice ? 30 : 50;
  }, []);

  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={particleQuantity}
      />
      <RemoteCursors />
      <EasterEggs />
      <ElasticCursor />
      <RadialMenu />
    </>
  );
});
