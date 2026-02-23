"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import rightImgDemo from "@/images/BecomeAnAuthorImg.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Logo from "@/shared/Logo";
import Image from "next/image";
import { sectionEntrance } from "@/utils/animationVariants";
import { useReducedMotion } from "@/utils/useReducedMotion";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
      data-journey-path-waypoint="become-author"
      aria-labelledby="become-author-heading"
      {...sectionEntrance}
    >
      <motion.div 
        className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <Logo className="w-20" />
        <h2 id="become-author-heading" className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11 text-neutral-900 dark:text-neutral-100">
          Why did you choose us?
        </h2>
        <p className="block mt-6 text-neutral-600 dark:text-neutral-300">
          Accompanying us, you have a trip full of experiences. With Chisfis,
          booking accommodation, resort villas, hotels, private houses,
          apartments... becomes fast, convenient and easy.
        </p>
        <ButtonPrimary 
          className="mt-6 sm:mt-11 bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600 transition-colors duration-200"
          aria-label="Become an author and start sharing your travel experiences"
        >
          Become an author
        </ButtonPrimary>
      </motion.div>
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
        viewport={{ once: true, margin: '-100px' }}
        aria-hidden="true"
      >
        <Image alt="Become an author illustration showing travel content creation" src={rightImg} />
      </motion.div>
    </motion.section>
  );
};

export default SectionBecomeAnAuthor;
