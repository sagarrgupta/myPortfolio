"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const SectionWrapper = React.memo(({ id, className, children, ...props }: SectionWrapperProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <div
        className={cn(
          "w-full h-full transition-all duration-700 ease-out",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
        )}
      >
        {children}
      </div>
    </section>
  );
});

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
