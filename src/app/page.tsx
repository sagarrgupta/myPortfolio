"use client";

import React, { Suspense } from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Lazy load heavy components
const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => <div className="w-full h-full fixed" />,
});

const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  loading: () => <div className="min-h-screen" />,
});

const ExperienceSection = dynamic(() => import("@/components/sections/experience"), {
  loading: () => <div className="min-h-screen" />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/projects"), {
  loading: () => <div className="min-h-screen" />,
});

const PublicationsSection = dynamic(() => import("@/components/sections/publications"), {
  loading: () => <div className="min-h-screen" />,
});

const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <div className="min-h-screen" />,
});

import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen" />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <PublicationsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <ContactSection />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}

export default MainPage;

