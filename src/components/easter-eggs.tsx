"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect, useState } from "react";
import NyanCat from "./nyan-cat";
import { AnimatePresence } from "framer-motion";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    // console.log(
    //   "%cWhoa, look at you! 🕵️‍♂️\n\n" +
    //     "Peeking under the hood, eh? Just be careful, " +
    //     "you might find some 🐛 bugs that even I didn't know about! 😅\n\n" +
    //     "By the way, did you know the console is a portal to another dimension? 🌌 " +
    //     "Just kidding... or am I? 👽\n\n" +
    //     "Keep exploring, brave soul! 🛠️",
    //   "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
    // );
    if (typeof console !== "undefined") {
      // Match site theme: dark bg, light text, purple accent, Inter font
      const consoleStyle = {
        base: "color: #e2e8f0; font-size: 15px; font-weight: 500; font-family: Inter, system-ui, sans-serif; background: #0f1420; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; line-height: 1.6",
        accent: "color: #a78bfa; font-size: 15px; font-weight: 600; font-family: Inter, system-ui, sans-serif; background: #0f1420; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b",
        highlight: "color: #c4b5fd; font-size: 16px; font-weight: 600; font-family: Inter, system-ui, sans-serif; background: #0f1420; padding: 12px 16px; border-radius: 8px; border: 1px solid #334155",
        muted: "color: #94a3b8; font-size: 15px; font-weight: 500; font-family: Inter, system-ui, sans-serif; background: #0f1420; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; line-height: 1.6",
      };
      console.clear();
      console.log(
        "%cWhoa, look at you! 🕵️‍♂️\n" +
          "You seem to have discovered the secret console! 🔍\n" +
          "Want to see some magic? ✨\n" +
          "Just type %c'Sagar'%c and hit enter! 🎩🐇",
        consoleStyle.base,
        consoleStyle.accent,
        consoleStyle.base
      );

      ["sagar", "Sagar", "SAGAR"].forEach((name) => {
        // @ts-ignore
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            console.log(
              "%c✨ Abra Kadabra! ✨\n" +
                "You just summoned the magic of Sagar! 🧙‍♂️\n" +
                "What??? youre not impressed? Fine, but remember: With great power comes great responsibility! 💻⚡",
              consoleStyle.highlight
            );

            const timer = setTimeout(() => {
              console.log(
                "%cPssttt! 🤫\n" +
                  "Do you like cats?? 😺 If yes, then close this window and press 'n' see what happens! 🐱✨",
                consoleStyle.muted
              );
              clearTimeout(timer);
            }, 2000);
            return "";
          },
        });
      });
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
    </>
  );
};

export default EasterEggs;
