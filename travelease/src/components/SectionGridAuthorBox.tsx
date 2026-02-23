import CardAuthorBox from "@/components/CardAuthorBox";
import CardAuthorBox2 from "@/components/CardAuthorBoxAlternate";
import Heading from "@/shared/Heading";
import { DEMO_AUTHORS } from "@/data/authors";
import { AuthorType } from "@/data/types";
import React, { FC, forwardRef } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { motion } from "framer-motion";
import { sectionEntrance, staggerContainer } from "@/utils/animationVariants";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

const SectionGridAuthorBox = forwardRef<HTMLDivElement, SectionGridAuthorBoxProps>(
  (
    {
      className = "",
      authors = DEMO_DATA,
      boxCard = "box1",
      gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        {...sectionEntrance}
        className={`nc-SectionGridAuthorBox relative ${className}`}
        data-nc-id="SectionGridAuthorBox"
        data-journey-path-waypoint="authors"
      >
        <Heading desc="Rating based on customer reviews" isCenter>
          Top 10 author of the month
        </Heading>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={`grid gap-6 md:gap-8 ${gridClassName}`}
        >
          {authors.map((author, index) =>
            boxCard === "box2" ? (
              <CardAuthorBox2 key={author.id} author={author} />
            ) : (
              <CardAuthorBox
                index={index < 3 ? index + 1 : undefined}
                key={author.id}
                author={author}
              />
            )
          )}
        </motion.div>
        <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
          <ButtonSecondary loading>Show me more </ButtonSecondary>
          <ButtonPrimary>Become a host</ButtonPrimary>
        </div>
      </motion.div>
    );
  }
);

SectionGridAuthorBox.displayName = "SectionGridAuthorBox";

export default SectionGridAuthorBox;
