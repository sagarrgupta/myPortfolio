"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import { Button } from "../ui/button";
import { FloatingDock } from "../ui/floating-dock";

import projects, { Project } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:h-[130vh] relative overflow-visible pt-44 md:pt-64">
      <div className="relative z-10">
        <SectionHeader id="projects" title="Projects" className="px-4 md:px-6 mb-44 md:mb-64" compactShadow />
        {/* Equal margin on all sides so tile-to-edge distance is same top/bottom/left/right */}
        <div className="relative mx-4 md:mx-6 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden pointer-events-auto">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 p-4 md:p-6">
            {projects.map((project, index) => (
              <ProjectCardModal key={project.id || project.title || index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
const ProjectsModalFooter = ({ project }: { project: Project }) => {
  const { setOpen } = useModal();
  return (
    <ModalFooter className="gap-4">
      <Button variant="outline" size="sm" onClick={() => setOpen(false)} className="w-28">
        Close
      </Button>
      <a
        href={project.live!}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium bg-primary text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-28 shrink-0 cursor-can-hover"
      >
        Visit
      </a>
    </ModalFooter>
  );
};

const ProjectCardModal = React.memo(({ project }: { project: Project }) => {
  const { resolvedTheme } = useTheme();
  const coverSrc = resolvedTheme === "light" && project.srcLight ? project.srcLight : project.src;
  return (
    <div className="w-full">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn w-full">
          <div
            className="relative w-full min-w-[100px] h-auto rounded-lg shadow-lg"
            style={{ aspectRatio: "3/2" }}
            onClick={() => trackEvent("project_tile_click", { project_title: project.title, project_id: project.id ?? project.title })}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") trackEvent("project_tile_click", { project_title: project.title, project_id: project.id ?? project.title }); }}
            role="presentation"
          >
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image
                className="absolute w-full h-full top-0 left-0 object-cover hover:scale-[1.05] transition-all"
                src={coverSrc}
                alt={project.title}
                width={480}
                height={320}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className="absolute w-full min-h-[45%] bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none rounded-b-lg">
              <div className="flex flex-col h-full items-start justify-end p-5 pt-10">
                <div className="text-lg text-left font-medium text-white line-clamp-2 break-words w-full pr-2">
                  {project.title}
                </div>
                <div className="text-xs bg-white text-black rounded-lg w-fit px-2 mt-1.5">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl">
          <ModalContent>
            <ProjectContents project={project} />
          </ModalContent>
          {project.live && project.live !== "#" && (
            <ProjectsModalFooter project={project} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
});

ProjectCardModal.displayName = "ProjectCardModal";

export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        {project.skills.frontend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Frontend
            </p>
            <FloatingDock items={project.skills.frontend} />
          </div>
        )}
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {/* <div className="flex justify-center items-center">
        {project.screenshots.map((image, idx) => (
          <motion.div
            key={"images" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={`${project.src.split("1.png")[0]}${image}`}
              alt="screenshots"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div> */}
      {project.content}
    </>
  );
};

ProjectContents.displayName = "ProjectContents";
