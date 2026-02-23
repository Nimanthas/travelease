import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import Badge from "@/shared/Badge";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";

export interface CardCategoryBox1Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategoryBox1: FC<CardCategoryBox1Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, thumbnail, href = "/" } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <Badge
        className="absolute right-2 top-2 bg-accent-500 dark:bg-accent-600 text-white"
        color="gray"
        name={convertNumbThousand(count)}
      />

      <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary-500 dark:ring-primary-400 ring-offset-2 dark:ring-offset-neutral-900">
        <Image
          src={thumbnail || ""}
          fill
          alt=""
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-600 dark:text-neutral-400`}
        >
          19 minutes drive
        </span>
      </div>
    </Link>
  );
};

export default CardCategoryBox1;
