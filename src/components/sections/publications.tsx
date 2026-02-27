"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { FloatingDock } from "../ui/floating-dock";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { Button } from "../ui/button";
import { trackEvent } from "@/lib/analytics";
import { SkillNames, SKILLS } from "@/data/constants";

type Publication = {
  title: string;
  description: string;
  link: string;
  year: string;
  publisher: string;
  skills: SkillNames[];
  /** Optional GitHub repo URL; shown as button when present */
  github?: string;
};

const PublicationSkillBadge = React.memo(
  ({ skill }: { skill: (typeof SKILLS)[SkillNames] }) => {
    const [hasError, setHasError] = useState(false);
    return (
      <Badge
        variant="outline"
        className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
      >
        {!hasError ? (
          <img
            src={skill.icon}
            alt={skill.label}
            className="w-3.5 h-3.5 object-contain opacity-80"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-xs font-bold w-3.5 h-3.5 flex items-center justify-center">
            {skill.label.charAt(0).toUpperCase()}
          </span>
        )}
        {skill.label}
      </Badge>
    );
  }
);
PublicationSkillBadge.displayName = "PublicationSkillBadge";

const PublicationModalBody = ({ publication }: { publication: Publication }) => (
  <ModalBody className="md:max-w-4xl">
    <ModalContent>
      <PublicationContents publication={publication} />
    </ModalContent>
  </ModalBody>
);

const PublicationsSection = React.memo(() => {
  const publication: Publication = useMemo(
    () => ({
      title:
        "Decentralized Microservices-based Framework for Disaster Resource Allocation using Blockchain",
      description:
        "Designed 3 microservices architecture using Docker and Kubernetes on GCP, processing 300+ blockchain transactions. Built custom permissioned blockchain in Python (Flask) with JWT authentication across 10 replicas on 2-4 GCP nodes. Optimized distributed system performance achieving sub-200ms average latency with autoscaling (HPA).",
      link: "https://ieeexplore.ieee.org/document/11296261",
      github: "https://github.com/sagarrgupta/BlockchainWithMicroservice",
      year: "Dec 2025",
      publisher: "IEEE",
      skills: [
        SkillNames.PYTHON,
        SkillNames.DOCKER,
        SkillNames.KUBERNETES,
        SkillNames.GCP,
        SkillNames.BLOCKCHAIN,
      ],
    }),
    []
  );

  return (
    <SectionWrapper
      id="publications"
      className="flex flex-col items-center justify-center min-h-[100vh] pt-96 pb-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="publications"
          title="Publications"
          desc="Research and papers."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          <div className="relative">
            <Modal>
              <ModalTrigger className="block w-full text-left bg-transparent border-none p-0 cursor-pointer">
                <motion.div
                  onClick={() => trackEvent("publication_tile_click", { publication_title: publication.title })}
                  role="presentation"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    className="bg-card text-card-foreground border-border hover:border-primary/20 transition-colors duration-300 shadow-sm hover:shadow-md group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                        <div className="space-y-1 min-w-0 flex-1">
                          <CardTitle className="text-xl font-bold tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {publication.title}
                          </CardTitle>
                          <div className="text-base font-medium text-muted-foreground">
                            {publication.publisher}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="w-fit font-mono text-xs font-normal shrink-0 whitespace-nowrap"
                        >
                          {publication.year}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <TypographyP className="text-muted-foreground line-clamp-3">
                        {publication.description}
                      </TypographyP>
                      <div className="flex flex-wrap gap-2">
                        {publication.skills
                          .filter((skillName) => SKILLS[skillName])
                          .map((skillName) => {
                            const skill = SKILLS[skillName];
                            return (
                              <PublicationSkillBadge
                                key={skillName}
                                skill={skill}
                              />
                            );
                          })}
                      </div>
                      <Link
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackEvent("publication_link_click", { link: "ieee", location: "outside_tile", publication_title: publication.title });
                        }}
                        className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 group-hover:underline"
                      >
                        Read on IEEE
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ModalTrigger>
              <PublicationModalBody publication={publication} />
            </Modal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
});

PublicationsSection.displayName = "PublicationsSection";

/** Two groups only: Backend (language/runtime/blockchain) and Infrastructure (containers, cloud). */
const PUBLICATION_SKILL_CATEGORY: Partial<Record<SkillNames, string>> = {
  [SkillNames.PYTHON]: "Backend",
  [SkillNames.FASTAPI]: "Backend",
  [SkillNames.NODEJS]: "Backend",
  [SkillNames.BLOCKCHAIN]: "Backend",
  [SkillNames.REACT]: "Backend",
  [SkillNames.NEXTJS]: "Backend",
  [SkillNames.TAILWIND]: "Backend",
  [SkillNames.DOCKER]: "Infrastructure & Cloud",
  [SkillNames.KUBERNETES]: "Infrastructure & Cloud",
  [SkillNames.GCP]: "Infrastructure & Cloud",
  [SkillNames.AWS]: "Infrastructure & Cloud",
  [SkillNames.AZURE]: "Infrastructure & Cloud",
};

const publicationSkillsToDockItems = (
  skills: SkillNames[]
): { title: string; icon: React.ReactNode }[] => {
  const items: { title: string; icon: React.ReactNode }[] = [];
  for (const skillName of skills) {
    const skill = SKILLS[skillName];
    if (!skill) continue;
    items.push({
      title: skill.label,
      icon: (
        <img
          src={skill.icon}
          alt={skill.label}
          className="w-5 h-5 object-contain"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      ),
    });
  }
  return items;
};

/** Group publication skills into exactly 2 subtitle sections. */
function groupPublicationSkillsByCategory(
  skills: SkillNames[]
): { category: string; skillNames: SkillNames[] }[] {
  const fallback = "Tech";
  const map = new Map<string, SkillNames[]>();
  for (const name of skills) {
    const category = PUBLICATION_SKILL_CATEGORY[name] ?? fallback;
    if (!map.has(category)) map.set(category, []);
    map.get(category)!.push(name);
  }
  const order = ["Backend", "Infrastructure & Cloud", "Tech"];
  return order
    .filter((cat) => map.has(cat))
    .map((category) => ({ category, skillNames: map.get(category)! }));
}

const PublicationContents = ({
  publication,
}: {
  publication: Publication;
}) => {
  const skillsByCategory = useMemo(
    () => groupPublicationSkillsByCategory(publication.skills),
    [publication.skills]
  );
  return (
    <>
      <div className="flex justify-between items-start mb-6 gap-4">
        <Badge
          variant="outline"
          className="border-purple-500/30 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 shrink-0"
        >
          {publication.publisher}
        </Badge>
        <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono shrink-0 whitespace-nowrap">
          {publication.year}
        </span>
      </div>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {publication.title}
      </h4>
      {skillsByCategory.length > 0 && (
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly gap-1 md:gap-1 mb-1">
          {skillsByCategory.map(({ category, skillNames }) => (
            <div
              key={category}
              className="flex flex-row md:flex-col-reverse justify-center items-center gap-2"
            >
              <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500 whitespace-nowrap">
                {category}
              </p>
              <FloatingDock items={publicationSkillsToDockItems(skillNames)} />
            </div>
          ))}
        </div>
      )}
      <TypographyP className="font-mono">
        {publication.description}
      </TypographyP>
      <div className="flex flex-col md:flex-row items-center justify-start gap-3">
        <Link
          className="font-mono underline flex gap-2"
          href={publication.link}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => trackEvent("publication_link_click", { link: "ieee", location: "inside_modal", publication_title: publication.title })}
        >
          <Button variant="default" size="sm">
            Visit on IEEE
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
        {publication.github ? (
          <Link
            className="font-mono underline flex gap-2"
            href={publication.github}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => trackEvent("publication_link_click", { link: "github", location: "inside_modal", publication_title: publication.title })}
          >
            <Button variant="default" size="sm">
              GitHub
              <ArrowUpRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        ) : null}
      </div>
      <TypographyH3 className="my-4 mt-6">Key Contributions</TypographyH3>
      <ul className="font-mono mb-2 space-y-2 list-disc list-inside text-neutral-600 dark:text-neutral-300">
        <li>
          Designed 3 microservices architecture using Docker and Kubernetes on
          GCP, processing 300+ blockchain transactions
        </li>
        <li>
          Built custom permissioned blockchain in Python (Flask) with JWT
          authentication across 10 replicas on 2-4 GCP nodes
        </li>
        <li>
          Optimized distributed system performance achieving sub-200ms average
          latency with autoscaling (HPA)
        </li>
      </ul>
    </>
  );
};

export default PublicationsSection;
