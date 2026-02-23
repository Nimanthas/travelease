import React, { FC } from "react";
import { AuthorType } from "@/data/types";
import { StarIcon } from "@heroicons/react/24/solid";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHover } from "@/utils/animationVariants";

export interface CardAuthorBoxProps {
  className?: string;
  author: AuthorType;
  index?: number;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({
  className = "",
  author,
  index,
}) => {
  const { displayName, href = "/", avatar, starRating } = author;
  return (
    <Link
      href={href}
      className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all duration-200 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg ${className}`}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        className="w-full flex flex-col items-center"
      >
        {index && (
          <Badge
            className="absolute left-3 top-3"
            color={index === 1 ? "red" : index === 2 ? "blue" : "green"}
            name={`#${index}`}
          />
        )}
        <Avatar
          sizeClass="w-20 h-20 text-2xl"
          radius="rounded-full"
          imgUrl={avatar}
          userName={displayName}
        />
        <div className="mt-3">
          <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
            <span className="line-clamp-1">{displayName}</span>
          </h2>
          <span className="block mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
            New York
          </span>
        </div>
        <div className="py-2 px-5 mt-4 bg-accent-100 dark:bg-accent-800/30 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium pt-[1px] text-accent-900 dark:text-accent-200">
            {starRating || 4.9}
          </span>
          <StarIcon className="w-5 h-5 text-accent-600 dark:text-accent-400 ml-2" />
        </div>
      </motion.div>
    </Link>
  );
};

export default CardAuthorBox;
