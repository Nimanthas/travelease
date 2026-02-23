"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import HIW1img from "@/images/HIW1.png";
import HIW2img from "@/images/HIW2.png";
import HIW3img from "@/images/HIW3.png";
import VectorImg from "@/images/VectorHIW.svg";
import Image, { StaticImageData } from "next/image";
import Heading from "@/shared/Heading";
import { sectionEntrance, childEntrance, sectionEntranceStagger } from "@/utils/animationVariants";
import { useReducedMotion } from "@/utils/useReducedMotion";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: StaticImageData;
    imgDark?: StaticImageData;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "Book & relax",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Smart checklist",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Save more",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
      aria-labelledby="how-it-work-heading"
      {...sectionEntrance}
    >
      <Heading isCenter desc="Keep calm & travel on" id="how-it-work-heading">
        How it work
      </Heading>
      <motion.div 
        className="mt-20 relative grid md:grid-cols-3 gap-20"
        variants={sectionEntranceStagger}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: '-100px' }}
        role="list"
      >
        <Image
          className="hidden md:block absolute inset-x-0 top-10"
          src={VectorImg}
          alt="Decorative connecting line between steps"
          aria-hidden="true"
        />
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto group"
            variants={childEntrance}
            role="listitem"
          >
            {/* Step Indicator with Accent Color */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-accent-500/10 dark:bg-accent-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-accent-500/20 dark:group-hover:bg-accent-500/30 group-hover:scale-110">
                  <span className="text-lg font-semibold text-accent-600 dark:text-accent-400 transition-colors duration-300 group-hover:text-accent-700 dark:group-hover:text-accent-300">
                    {item.id}
                  </span>
                </div>
                {/* Outer ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-accent-500/0 group-hover:border-accent-500/30 transition-all duration-300 scale-0 group-hover:scale-125" />
              </div>
            </div>

            {/* Image Container with Hover Effect */}
            <div className="relative transition-transform duration-300 group-hover:-translate-y-2">
              {item.imgDark ? (
                <>
                  <Image
                    className="dark:hidden block mb-8 max-w-[180px] mx-auto"
                    src={item.img}
                    alt={`Step ${item.id}: ${item.title} illustration`}
                  />
                  <Image
                    alt={`Step ${item.id}: ${item.title} illustration`}
                    className="hidden dark:block mb-8 max-w-[180px] mx-auto"
                    src={item.imgDark}
                  />
                </>
              ) : (
                <Image
                  alt={`Step ${item.id}: ${item.title} illustration`}
                  className="mb-8 max-w-[180px] mx-auto"
                  src={item.img}
                />
              )}
            </div>

            {/* Content with Theme Colors */}
            <div className="text-center mt-auto">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {item.title}
              </h3>
              <p className="block mt-5 text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                {item.desc}
              </p>
            </div>

            {/* Journey Path Connection Point */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SectionHowItWork;
