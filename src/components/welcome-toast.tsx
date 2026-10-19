"use client";

import { useEffect } from "react";
import { usePreloader } from "@/components/preloader";
import { toast } from "@/components/ui/use-toast";

export default function WelcomeToast() {
  const { isLoading } = usePreloader();

  useEffect(() => {
    if (isLoading) return;

    let timer: ReturnType<typeof setTimeout>;
    let dismiss: (() => void) | undefined;

    const scheduleWelcome = () => {
      timer = setTimeout(() => {
        const welcome = toast({
          type: "background",
          duration: 3000,
          variant: "hint",
          title: "Hold right click to send emojis",
        });
        dismiss = welcome.dismiss;
      }, 2000);
    };

    // Wait for both the document and the introductory loader to finish.
    if (document.readyState === "complete") {
      scheduleWelcome();
    } else {
      window.addEventListener("load", scheduleWelcome, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleWelcome);
      clearTimeout(timer);
      dismiss?.();
    };
  }, [isLoading]);

  return null;
}
