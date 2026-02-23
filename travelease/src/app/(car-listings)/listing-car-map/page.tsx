"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const SectionGridHasMap = dynamic(() => import("../SectionGridHasMap"), { ssr: false });

export interface ListingCarMapPageProps {}

const ListingCarMapPage: FC<ListingCarMapPageProps> = () => {
  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap />
    </div>
  );
};

export default ListingCarMapPage;
