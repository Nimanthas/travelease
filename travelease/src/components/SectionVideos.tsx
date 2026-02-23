"use client";

import Heading from "@/shared/Heading";
import NcPlayIcon from "@/shared/NcPlayIcon";
import NcPlayIcon2 from "@/shared/NcPlayIconLarge";
import Image from "next/image";
import React, { FC, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeMode } from "@/utils/useThemeMode";
import { getThemeColors, rgbToRgba } from "@/styles/theme-colors";
import { sectionEntrance } from "@/utils/animationVariants";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
  sectionRef?: React.RefObject<HTMLDivElement>;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "Ao7e4iisKMs",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "a5V6gdu5ih8",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "MuB7HHeuNbc",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "eEaZvEZye84",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/4983184/pexels-photo-4983184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "EuDJZDaSP0Q",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
  sectionRef,
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { isDarkMode } = useThemeMode();
  const internalRef = useRef<HTMLDivElement>(null);
  const themeColors = getThemeColors(isDarkMode);

  useEffect(() => {
    if (sectionRef && internalRef.current) {
      (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = internalRef.current;
    }
  }, [sectionRef]);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    const borderColor = isDarkMode 
      ? rgbToRgba(themeColors.primary[700], 0.3)
      : rgbToRgba(themeColors.primary[200], 0.5);
    
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 dark:bg-neutral-900 rounded-3xl overflow-hidden sm:rounded-[50px] will-change-transform transition-all duration-300"
        style={{
          border: `4px solid ${borderColor}`,
        }}
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
              role="button"
              tabIndex={0}
              aria-label={`Play video: ${video.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPlay(true);
                }
              }}
            >
              <NcPlayIcon />
            </div>

            <Image
              fill
              className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300"
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    
    const borderColor = isDarkMode 
      ? rgbToRgba(themeColors.primary[700], 0.2)
      : rgbToRgba(themeColors.primary[200], 0.4);
    
    return (
      <div
        className="group relative aspect-h-16 aspect-w-16 rounded-2xl cursor-pointer overflow-hidden sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 transition-all duration-300 hover:shadow-lg"
        style={{
          border: `2px solid ${borderColor}`,
        }}
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        role="button"
        tabIndex={0}
        aria-label={`Play video: ${video.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentVideo(index);
            !isPlay && setIsPlay(true);
          }
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300"
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
      </div>
    );
  };

  const backgroundAccent = isDarkMode
    ? rgbToRgba(themeColors.primary[800], 0.3)
    : rgbToRgba(themeColors.primary[100], 0.4);

  return (
    <motion.section 
      ref={internalRef} 
      className={`nc-SectionVideos ${className}`} 
      aria-labelledby="videos-heading"
      {...sectionEntrance}
    >
      <Heading
        desc="Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone's welcome."
      >
        🎬 The Videos
      </Heading>

      <motion.div 
        className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div 
          className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 transition-colors duration-300"
          style={{ backgroundColor: backgroundAccent }}
          aria-hidden="true"
        ></div>
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div 
          className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40"
          role="list"
          aria-label="Video playlist"
        >
          {videos.map(renderSubVideo)}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SectionVideos;
