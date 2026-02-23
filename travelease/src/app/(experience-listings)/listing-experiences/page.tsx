"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const SectionGridFilterCard = dynamic(() => import("../SectionGridFilterCard"), { ssr: false });

export interface ListingExperiencesPageProps {}

const ListingExperiencesPage: FC<ListingExperiencesPageProps> = ({}) => {
  return (
    <div className="container relative">
      <SectionGridFilterCard className="pb-24 lg:pb-28" />
    </div>
  );
};

export default ListingExperiencesPage;
