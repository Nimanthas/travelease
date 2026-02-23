"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";
import { sectionEntrance, childEntrance, sectionEntranceStagger } from "@/utils/animationVariants";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <motion.section
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
      data-journey-path-waypoint="newsletter"
      aria-labelledby="newsletter-heading"
      {...sectionEntrance}
    >
      <motion.div 
        className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 id="newsletter-heading" className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <p className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone&apos;s
          welcome.
        </p>
        <motion.ul 
          className="space-y-4 mt-10"
          variants={sectionEntranceStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.li 
            className="flex items-center space-x-4"
            variants={childEntrance}
          >
            <Badge name="01" />
            <p className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </p>
          </motion.li>
          <motion.li 
            className="flex items-center space-x-4"
            variants={childEntrance}
          >
            <Badge color="red" name="02" />
            <p className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </p>
          </motion.li>
        </motion.ul>
        <motion.form 
          className="mt-10 relative max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          aria-label="Newsletter subscription form"
        >
          <Input
            required
            aria-required="true"
            aria-label="Email address"
            placeholder="Enter your email"
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
            className="border-primary-300 dark:border-primary-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 transition-colors duration-200"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1.5 bg-accent-500 hover:bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-600 transition-colors duration-200"
            size="w-10 h-10"
            aria-label="Subscribe to newsletter"
          >
            <i className="las la-arrow-right text-xl" aria-hidden="true"></i>
          </ButtonCircle>
        </motion.form>
      </motion.div>
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, margin: '-100px' }}
        aria-hidden="true"
      >
        <Image alt="Newsletter subscription illustration with travel themes" src={rightImg} />
      </motion.div>
    </motion.section>
  );
};

export default SectionSubscribe2;
