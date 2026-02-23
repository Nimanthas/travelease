"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";
import { sectionEntrance, childEntrance, sectionEntranceStagger } from "@/utils/animationVariants";
import { useReducedMotion } from "@/utils/useReducedMotion";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
  journeyPathRef?: React.RefObject<HTMLDivElement>;
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
  journeyPathRef,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={journeyPathRef}
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
      aria-labelledby="our-features-heading"
      {...sectionEntrance}
    >
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0, x: type === "type1" ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
        aria-hidden="true"
      >
        <Image src={rightImg} alt="Illustration showing travel features and benefits" />
      </motion.div>
      <motion.div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
        initial={{ opacity: 0, x: type === "type1" ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <span className="uppercase text-sm tracking-widest text-primary-600 dark:text-primary-400">
          BENnefits
        </span>
        <h2 id="our-features-heading" className="font-semibold text-4xl mt-5 text-neutral-900 dark:text-neutral-100">
          Happening cities
        </h2>

        <motion.ul 
          className="space-y-10 mt-16"
          variants={sectionEntranceStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.li 
            className="space-y-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400"
            variants={childEntrance}
          >
            <Badge name="Advertising" color="green" />
            <h3 className="block text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Cost-effective advertising
            </h3>
            <p className="block mt-5 text-neutral-600 dark:text-neutral-300">
              With a free listing, you can advertise your rental with no upfront
              costs
            </p>
          </motion.li>
          <motion.li 
            className="space-y-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400"
            variants={childEntrance}
          >
            <Badge color="green" name="Exposure " />
            <h3 className="block text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Reach millions with Chisfis
            </h3>
            <p className="block mt-5 text-neutral-600 dark:text-neutral-300">
              Millions of people are searching for unique places to stay around
              the world
            </p>
          </motion.li>
          <motion.li 
            className="space-y-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400"
            variants={childEntrance}
          >
            <Badge color="green" name="Secure" />
            <h3 className="block text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Secure and simple
            </h3>
            <p className="block mt-5 text-neutral-600 dark:text-neutral-300">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </p>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.section>
  );
};

export default SectionOurFeatures;
