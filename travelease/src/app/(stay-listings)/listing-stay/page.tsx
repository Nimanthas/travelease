"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const SectionGridFilterCard = dynamic(() => import("../SectionGridFilterCard"), { ssr: false });

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return <SectionGridFilterCard className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;
