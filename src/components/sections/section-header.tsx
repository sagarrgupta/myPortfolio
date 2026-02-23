import { cn } from "@/lib/utils"
import Link from "next/link"
import { BoxReveal } from "../reveal-animations"
import { ReactNode } from "react"

// Light mode: subtle shadow like hero name; dark mode: keep depth
const titleShadowSpread =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.08)] dark:[text-shadow:0_2px_6px_rgba(0,0,0,0.5),0_4px_14px_rgba(0,0,0,0.35),0_6px_24px_rgba(0,0,0,0.25),0_10px_40px_rgba(0,0,0,0.15)]"
const titleShadowCompact =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.08)] dark:[text-shadow:0_2px_6px_rgba(0,0,0,0.5),0_4px_14px_rgba(0,0,0,0.35)]"
const descShadowSpread =
  "[text-shadow:0_1px_1px_rgba(0,0,0,0.06)] dark:[text-shadow:0_1px_4px_rgba(0,0,0,0.45),0_2px_10px_rgba(0,0,0,0.28),0_4px_20px_rgba(0,0,0,0.2)]"
const descShadowCompact =
  "[text-shadow:0_1px_1px_rgba(0,0,0,0.06)] dark:[text-shadow:0_1px_4px_rgba(0,0,0,0.45),0_2px_10px_rgba(0,0,0,0.28)]"

export const SectionHeader = ({ id, title, desc, className, compactShadow }: { id: string, title: string | ReactNode, desc?: string, className?: string, compactShadow?: boolean }) => {
  return (

    <div className={cn("top-[70px] sticky mb-96", className)}>
      <Link href={`#${id}`}>
        <BoxReveal width="100%">
          <h2
            className={cn(
              "text-4xl text-center md:text-7xl font-bold",
              "text-foreground pb-3 md:pb-4",
              compactShadow ? titleShadowCompact : titleShadowSpread
            )}
          >
            {title}
          </h2>
        </BoxReveal>
      </Link>
      {desc != null && desc !== "" && (
        <p
          className={cn(
            "mx-auto line-clamp-4 max-w-3xl font-normal text-base text-center text-muted-foreground",
            compactShadow ? descShadowCompact : descShadowSpread
          )}
        >
          {desc}
        </p>
      )}
    </div>
  )
}
