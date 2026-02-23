"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const SectionWrapper = React.memo(({ id, className, children, ...props }: SectionWrapperProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false, // Use effect instead of layoutEffect for better performance
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        style={{ opacity, scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
});

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
