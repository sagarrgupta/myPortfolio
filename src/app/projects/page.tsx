"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "@splidejs/react-splide/css";

const PROJECTS = [
  {
    id: 1,
    name: "Pathfinder – AI Agent for Academic Guidance",
    description: `Multi-agent AI assistant for academic and career guidance built with an 11-node LangGraph system, FastAPI backend, and hybrid graph + vector retrieval in Neo4j.`,
    link: "#",
    images: ["/assets/projects-screenshots/portfolio/pathfinder.png"],
    imagesLight: ["/assets/projects-screenshots/portfolio/pathfinder-light.png"],
  },
  {
    id: 2,
    name: "Time Series Forecasting using LSTM and CNN",
    description: `Deep learning models for time series forecasting using TensorFlow/Keras LSTMs and CNNs, with robust preprocessing and evaluation pipelines.`,
    link: "#",
    images: ["/assets/projects-screenshots/portfolio/timeseries.png"],
    imagesLight: ["/assets/projects-screenshots/portfolio/timeseries-light.png"],
  },
  {
    id: 3,
    name: "Book Search System using DynamoDB",
    description: `Scalable book search service on AWS DynamoDB with GSI/LSI optimization and a Node.js/Express API supporting rich filters and fast queries.`,
    link: "#",
    images: ["/assets/projects-screenshots/portfolio/book-search.png"],
    imagesLight: ["/assets/projects-screenshots/portfolio/book-search-light.png"],
  },
];
function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
        <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-around ">
          {PROJECTS.map((project) => {
            const images = resolvedTheme === "light" && project.imagesLight ? project.imagesLight : project.images;
            return (
            <li
              className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
              key={project.id}
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="h-[200px]">
                <Splide
                  options={{
                    type: "loop",
                    interval: 3000,
                    autoplay: true,
                    speed: 2000,
                    perMove: 1,
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                  }}
                  aria-label="My Favorite Images"
                >
                  {images.map((image, idx) => (
                    <SplideSlide key={`${project.id}-${idx}-${image}`}>
                      <Image
                        src={image}
                        alt={`screenshot of "${project.name}`}
                        className="w-[300px] h-[200px] rounded-md bg-zinc-900 "
                        width={300}
                        height={400}
                        style={{ height: "200px" }}
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
              <div className="p-4 text-zinc-300">
                <h2 className="text-xl">{project.name}</h2>
                <p className="mt-2 text-xs text-zinc-500">
                  {project.description}
                </p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Page;
