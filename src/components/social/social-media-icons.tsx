"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const BUTTONS = [
  { name: "github", href: config.social.github, icon: <SiGithub size={24} className="text-current" /> },
  { name: "linkedin", href: config.social.linkedin, icon: <SiLinkedin size={24} className="text-current" /> },
  { name: "instagram", href: config.social.instagram, icon: <SiInstagram size={24} className="text-current" /> },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <Link
            href={button.href}
            key={button.name}
            target="_blank"
            aria-label={button.name}
            onClick={() => trackEvent("button_click", { button_name: button.name, button_location: "footer", link_url: button.href })}
          >
            <Button variant="ghost">{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
