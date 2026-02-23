"use client";
import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS, KEYBOARD_SKILL_ORDER } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

/** Max description length sent to Spline so text fits without cropping (expand text area in Spline if needed). */
const SPLINE_DESC_MAX_LENGTH = 100;

const getDescForSpline = (shortDescription: string) =>
  shortDescription.length <= SPLINE_DESC_MAX_LENGTH
    ? shortDescription
    : shortDescription.slice(0, SPLINE_DESC_MAX_LENGTH).trim() + "…";

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Animation controllers refs
  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>();
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>();

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const router = useRouter();
  const [pageVisible, setPageVisible] = useState(true);
  const routerTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Track page visibility to pause heavy work when tab is hidden
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = () => setPageVisible(!document.hidden);
    handler();
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // --- Event Handlers ---

  const handleMouseHover = useCallback((e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      try {
        if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
          splineApp.setVariable("heading", "");
          splineApp.setVariable("desc", "");
        }
      } catch (err) {
        // Variable might not exist, ignore
      }
    } else {
      if (!selectedSkillRef.current || selectedSkillRef.current.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  }, [splineApp, playPressSound, playReleaseSound]);

  const handleSplineInteractions = useCallback(() => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    const handleKeyUp = () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      try {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      } catch (err) {
        // Variable might not exist, ignore
      }
    };

    const handleKeyDown = (e: any) => {
      if (!splineApp || isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        try {
          splineApp.setVariable("heading", skill.label);
          splineApp.setVariable("desc", getDescForSpline(skill.shortDescription));
        } catch (err) {
          // Variable might not exist, ignore
        }
      }
    };

    splineApp.addEventListener("keyUp", handleKeyUp);
    splineApp.addEventListener("keyDown", handleKeyDown);
    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      splineApp.removeEventListener("keyUp", handleKeyUp);
      splineApp.removeEventListener("keyDown", handleKeyDown);
      splineApp.removeEventListener("mouseHover", handleMouseHover);
    };
  }, [splineApp, handleMouseHover, playPressSound, playReleaseSound]);

  // --- Animation Setup Helpers ---

  const createSectionTimeline = useCallback((
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1, ease: "power2.out", overwrite: true });
          gsap.to(kbd.position, { ...state.position, duration: 1, ease: "power2.out", overwrite: true });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1, ease: "power2.out", overwrite: true });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1, ease: "power2.out", overwrite: true });
          gsap.to(kbd.position, { ...state.position, duration: 1, ease: "power2.out", overwrite: true });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1, ease: "power2.out", overwrite: true });
        },
      },
    });
  }, [splineApp, isMobile]);

  const setupScrollAnimations = useCallback(() => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions (skills triggers when center of section reaches top = after more scroll, tiles more faded)
    createSectionTimeline("#skills", "skills", "hero",);
    createSectionTimeline("#projects", "projects", "skills", "top 55%");
    // Delay section change until we've scrolled further into publications (keyboard flips later)
    createSectionTimeline("#publications", "publications", "projects", "top 35%");
    createSectionTimeline("#contact", "contact", "publications", "top 30%");
  }, [splineApp, isMobile, createSectionTimeline]);

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => { }, stop: () => { } };
    }

    let animationFrameId: number;
    let lastTime = 0;
    let i = 0;
    const animate = (time: number) => {
      if (!pageVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (time - lastTime > 120) {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const start = () => {
      framesParent.visible = true;
      i = 0;
      lastTime = document.timeline ? document.timeline.currentTime as number : performance.now();
      animationFrameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(animationFrameId);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => {
      tweens.forEach((t) => t.kill());
      tweens = [];
    };

    const start = () => {
      removePrevTweens();
      const skillsArray = KEYBOARD_SKILL_ORDER.map((name) => SKILLS[name]).sort(() => Math.random() - 0.5).slice(0, 10);
      skillsArray.forEach((skill, idx) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: Math.random() * 150 + 150,
          duration: Math.random() * 1.5 + 1.5,
          delay: idx * 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: -1,
          yoyoEase: "none",
        });
        tweens.push(t);
      });
    };

    const stop = () => {
      removePrevTweens();
      const tl = gsap.timeline();
      KEYBOARD_SKILL_ORDER.map((name) => SKILLS[name]).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        tl.to(keycap.position, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, 0);
      });
      setTimeout(removePrevTweens, 600);
    };

    return { start, stop };
  };

  // Track timer IDs so they can be cleared on re-render / unmount
  const revealTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearRevealTimers = useCallback(() => {
    revealTimersRef.current.forEach(clearTimeout);
    revealTimersRef.current = [];
  }, []);

  const updateKeyboardTransform = useCallback(async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Clear any in-flight reveal timers from a previous run
    clearRevealTimers();

    kbd.visible = false;
    await sleep(300);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.2,
        ease: "power2.out",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(600);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach((keycap, idx) => {
        const tid = setTimeout(() => {
          keycap.visible = true;
        }, idx * 70);
        revealTimersRef.current.push(tid);
      });
    }

    keycaps.forEach((keycap, idx) => {
      const outerTid = setTimeout(() => {
        keycap.visible = false;
        const innerTid = setTimeout(() => {
          keycap.visible = true;
          gsap.fromTo(
            keycap.position,
            { y: 200 },
            { y: 50, duration: 0.4, delay: 0.05, ease: "power2.out" }
          );
        }, 50);
        revealTimersRef.current.push(innerTid);
      }, idx * 70);
      revealTimersRef.current.push(outerTid);
    });
  }, [splineApp, activeSection, isMobile, clearRevealTimers]);

  // --- Effects ---

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp || !pageVisible) return;
    const cleanup = handleSplineInteractions();
    setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      cleanup?.();
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [splineApp, isMobile, pageVisible, handleSplineInteractions, setupScrollAnimations]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    } else {
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    }
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    try {
      splineApp.setVariable("heading", selectedSkill.label);
      splineApp.setVariable("desc", getDescForSpline(selectedSkill.shortDescription));
    } catch (err) {
      // Variable might not exist, ignore silently
    }
  }, [selectedSkill, splineApp]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp || !pageVisible) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true,
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    let cancelled = false;
    let bongoTimeout: ReturnType<typeof setTimeout>;
    let contactTimeout: ReturnType<typeof setTimeout>;

    // Reset text if not in skills
    if (activeSection !== "skills") {
      try {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      } catch (err) {
        // Variable might not exist, ignore
      }
    }

    // Handle Rotate/Teardown Tweens
    if (activeSection === "hero") {
      rotateKeyboard?.restart();
      teardownKeyboard?.pause();
    } else if (activeSection === "contact") {
      rotateKeyboard?.pause();
    } else {
      rotateKeyboard?.pause();
      teardownKeyboard?.pause();
    }

    // Handle Bongo Cat
    if (activeSection === "projects") {
      bongoTimeout = setTimeout(() => {
        if (!cancelled) bongoAnimationRef.current?.start();
      }, 200);
    } else {
      bongoAnimationRef.current?.stop();
    }

    // Handle Contact Section Animations
    if (activeSection === "contact") {
      contactTimeout = setTimeout(() => {
        if (!cancelled) {
          teardownKeyboard?.restart();
          keycapAnimationsRef.current?.start();
        }
      }, 300);
    } else {
      keycapAnimationsRef.current?.stop();
      teardownKeyboard?.pause();
    }

    return () => {
      cancelled = true;
      clearTimeout(bongoTimeout);
      clearTimeout(contactTimeout);
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp, pageVisible]);

  // Reveal keyboard on load/route change — debounce the router.push to avoid
  // firing Next.js navigation on every scroll frame
  useEffect(() => {
    clearTimeout(routerTimeoutRef.current);
    routerTimeoutRef.current = setTimeout(() => {
      const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
      window.history.replaceState(null, "", "/" + hash);
    }, 300);

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
    return () => {
      clearTimeout(routerTimeoutRef.current);
      clearRevealTimers();
    };
  }, [splineApp, isLoading, activeSection, keyboardRevealed, updateKeyboardTransform, clearRevealTimers]);

  return (
    <Suspense fallback={<div className="w-full h-full fixed" />}>
      <Spline
        className="w-full h-full fixed"
        style={{ willChange: 'transform' }}
        ref={splineContainer}
        onLoad={(app: Application) => {
          setSplineApp(app);
          bypassLoading();
        }}
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};

export default AnimatedBackground;
