"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import HeroSection from "@/app/(client-components)/HeroSection";
import { TaxonomyType } from "@/data/types";
import BackgroundSection from "@/components/BackgroundSection";
import { JOURNEY_WAYPOINTS } from "@/data/journey-waypoints";
import { MOOD_BOARD_IMAGES } from "@/data/mood-board-images";
import { SectionWaypoint } from "@/components/JourneyPath";
import { SRI_LANKAN_TOURS } from "@/data/sri-lankan-tours";

// Dynamic imports for heavy components
const JourneyPath = dynamic(() => import("@/components/JourneyPath"), {
  ssr: false,
});

const StoryOfJourneySection = dynamic(
  () => import("@/app/(client-components)/StoryOfJourneySection"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const MoodBoardSection = dynamic(
  () => import("@/app/(client-components)/MoodBoardSection"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionSliderNewCategories = dynamic(
  () => import("@/components/SectionSliderNewCategories"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionOurFeatures = dynamic(
  () => import("@/components/SectionOurFeatures"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionGridFeaturePlaces = dynamic(
  () => import("@/components/SectionGridFeaturePlaces"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionHowItWork = dynamic(
  () => import("@/components/SectionHowItWork"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionSubscribe2 = dynamic(
  () => import("@/components/SectionSubscribeNewsletter"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionGridAuthorBox = dynamic(
  () => import("@/components/SectionGridAuthorBox"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionGridCategoryBox = dynamic(
  () => import("@/components/SectionGridCategoryBox"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionBecomeAnAuthor = dynamic(
  () => import("@/components/SectionBecomeAnAuthor"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionVideos = dynamic(
  () => import("@/components/SectionVideos"),
  {
    loading: () => (
      <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const SectionClientSay = dynamic(
  () => import("@/components/SectionClientSay"),
  {
    loading: () => (
      <div className="h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl" />
    ),
  }
);

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay-map",
    name: "New Yourk",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay-map",
    name: "Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay-map",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay-map",
    name: "London",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay-map",
    name: "Tokyo",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "6",
    href: "/listing-stay-map",
    name: "Maldives",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/listing-stay-map",
    name: "Italy",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay-map",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay-map",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay-map",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay-map",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay-map",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "6",
    href: "/listing-stay-map",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/9828170/pexels-photo-9828170.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: "7",
    href: "/listing-stay-map",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome() {
  // Section refs for JourneyPath integration
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const moodBoardRef = useRef<HTMLElement>(null);
  const toursRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorkRef = useRef<HTMLDivElement>(null);
  const subscribeRef = useRef<HTMLDivElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const becomeAuthorRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const clientSayRef = useRef<HTMLDivElement>(null);

  // Journey Path sections configuration
  const journeyPathSections: SectionWaypoint[] = [
    {
      id: "hero",
      sectionRef: heroRef,
      markerContent: {
        title: "Start Your Journey",
        description: "Discover Sri Lanka's hidden treasures",
      },
    },
    {
      id: "story",
      sectionRef: storyRef,
      markerContent: {
        title: "Your Story",
        description: "Plan your perfect adventure",
      },
    },
    {
      id: "moodboard",
      sectionRef: moodBoardRef,
      markerContent: {
        title: "Visual Journey",
        description: "Experience the beauty",
      },
    },
    {
      id: "tours",
      sectionRef: toursRef,
      markerContent: {
        title: "Popular Tours",
        description: "Explore by region",
      },
    },
    {
      id: "services",
      sectionRef: servicesRef,
      markerContent: {
        title: "Our Services",
        description: "Everything you need",
      },
    },
  ];

  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* GLASSMORPHISM */}
      <BgGlassmorphism />

      {/* JOURNEY PATH - Global SVG overlay */}
      <JourneyPath sections={journeyPathSections} />

      {/* HERO SECTION - New redesigned hero with video */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Spacer for fixed hero section */}
      <div className="h-screen" />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* STORY OF JOURNEY SECTION - New */}
        <StoryOfJourneySection ref={storyRef} waypoints={JOURNEY_WAYPOINTS} />

        {/* MOOD BOARD SECTION - New */}
        <MoodBoardSection ref={moodBoardRef} images={MOOD_BOARD_IMAGES} />

        {/* POPULAR TOURS SECTION - Enhanced with region filter */}
        <div ref={toursRef}>
          <SectionGridFeaturePlaces 
            cardType="card2"
            heading="Popular Tours"
            subHeading="Explore Sri Lanka's finest destinations by region"
            regionFilter={true}
            tourListings={SRI_LANKAN_TOURS}
            regions={["South", "Central", "North", "West"]}
          />
        </div>

        {/* SERVICES SECTION - Enhanced styling */}
        <div ref={servicesRef}>
          <SectionSliderNewCategories categories={DEMO_CATS} />
        </div>

        {/* PRESERVED SECTIONS - With updated styling */}
        <div ref={featuresRef}>
          <SectionOurFeatures />
        </div>

        <div ref={howItWorkRef}>
          <SectionHowItWork />
        </div>

        <div ref={subscribeRef}>
          <SectionSubscribe2 />
        </div>

        <div ref={authorsRef} className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
          <SectionGridAuthorBox />
        </div>

        <div ref={categoriesRef}>
          <SectionGridCategoryBox />
        </div>

        <div ref={becomeAuthorRef} className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <div ref={videosRef}>
          <SectionVideos />
        </div>

        <div ref={clientSayRef} className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
      </div>
    </main>
  );
}

export default PageHome;
