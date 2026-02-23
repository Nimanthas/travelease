"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const SectionGridFilterCard = dynamic(() => import("../SectionGridFilterCard"), { ssr: false });

export interface ListingCarPageProps {}

const ListingCarPage: FC<ListingCarPageProps> = () => {
  return (
    <div className="container ">
      <SectionGridFilterCard className="pb-24 lg:pb-28" />
    </div>
  );
};

export default ListingCarPage;
