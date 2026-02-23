"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { opacity } from "../header/anim";

const SKILLS_DOCK_HINT_STORAGE_KEY = "portfolio:skills-dock-explored";

type SkillsDockHintContextValue = {
  shouldShowHint: boolean;
  markExplored: () => void;
};

const SkillsDockHintContext = createContext<SkillsDockHintContextValue>({
  shouldShowHint: true,
  markExplored: () => {},
});

export function SkillsDockHintProvider({ children }: { children: React.ReactNode }) {
  const [hasExplored, setHasExplored] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(SKILLS_DOCK_HINT_STORAGE_KEY) === "true") {
        setHasExplored(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const markExplored = useCallback(() => {
    setHasExplored(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(SKILLS_DOCK_HINT_STORAGE_KEY, "true");
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <SkillsDockHintContext.Provider
      value={{ shouldShowHint: !hasExplored, markExplored }}
    >
      {children}
    </SkillsDockHintContext.Provider>
  );
}

function useSkillsDockHint() {
  return useContext(SkillsDockHintContext);
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      {/* <FloatingDockMobile items={items} className={mobileClassName} /> */}
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <div
                  key={item.title}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button> */}
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode }[];
  className?: string;
}) => {
  const { shouldShowHint, markExplored } = useSkillsDockHint();
  let mouseX = useMotionValue(Infinity);
  const timer = useRef<NodeJS.Timeout>();
  const controls = useAnimation();
  useEffect(() => {
    if (shouldShowHint) {
      controls.start({
        opacity: [0, 1, 1, 0],
        x: [-50, -50, 50, 50],
        transition: {
          duration: 2,
          repeatDelay: 2,
          delay: 2,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      controls.stop();
    }
    return () => {
      controls.stop();
      clearInterval(timer.current);
    };
  }, [shouldShowHint]);
  return (
    <div className="relative h-fit flex items-center justify-center pointer-events-auto">
      <motion.div
        onMouseMove={(e) => {
          requestAnimationFrame(() => {
            mouseX.set(e.pageX);
            markExplored();
          });
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          // "hidden md:flex",
          "flex gap-2 md:gap-4",
          "mx-auto h-16 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
          // "blur-sm brightness-50",
          className
        )}
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
      {shouldShowHint && (
        <div
          className="z-10 absolute t-0 w-full h-full pointer-events-none"
          onMouseEnter={markExplored}
        >
          <div
            className={cn(
              "relative w-full h-full flex items-center justify-center"
              // "backdrop-blur-md"
            )}
          >
            <motion.div
              className={cn(
                "w-5 h-5 border-2 left-[50%] top-0 border-black dark:border-white rounded-full",
                "translate-x-[-50px]"
              )}
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
            ></motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  // Optimized spring settings for better performance
  const springConfig = {
    mass: 0.1,
    stiffness: 120, // Reduced from 150
    damping: 15, // Increased damping for smoother, less CPU-intensive animations
  };

  let width = useSpring(widthTransform, springConfig);
  let height = useSpring(heightTransform, springConfig);
  let widthIcon = useSpring(widthTransformIcon, springConfig);
  let heightIcon = useSpring(heightTransformIcon, springConfig);

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-foreground [&_img]:brightness-0 [&_img]:dark:invert [&_img]:object-contain"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
