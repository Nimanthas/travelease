"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const SectionGridFilterCard = dynamic(() => import("../SectionGridFilterCard"), { ssr: false });

export interface ListingRealEstatePageProps {}

const ListingRealEstatePage: FC<ListingRealEstatePageProps> = ({}) => {
  // useEffect(() => {
  //   const $body = document.querySelector("body");
  //   if ($body) {
  //     $body.className = "theme-cyan-blueGrey";
  //   }
  //   return () => {
  //     if ($body) {
  //       $body.className = "";
  //     }
  //   };
  // }, []);

  return (
    <div className="container relative">
      <SectionGridFilterCard className="py-24 lg:py-28" />
    </div>
  );
};

export default ListingRealEstatePage;
