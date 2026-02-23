"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroSearchForm from "./(HeroSearchForm)/HeroSearchForm";
import { useReducedMotion } from "@/utils/useReducedMotion";

interface HeroSectionProps {
  className?: string;
  videoId?: string;
  showSearch?: boolean;
}

export default function HeroSection({
  className = "",
  videoId = "tzeXMaXWsuc",
  showSearch = true,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const backgroundY = useTransform(
    scrollY, 
    [0, 500], 
    prefersReducedMotion ? [0, 0] : [0, 80]
  );

  return (
    <section 
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-neutral-950 z-0 ${className}`}
      aria-label="Hero section with video background"
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-black"
        style={{ y: backgroundY, willChange: "transform" }}
        aria-hidden="true"
      />

      {/* Leaf Top Left */}
      <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none opacity-80 z-10">
        <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <path d="M150 30 Q200 60 210 150 Q200 240 150 270 Q100 240 90 150 Q100 60 150 30" 
                fill="none" stroke="url(#leafGradient1)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M150 30 Q150 150 150 270" stroke="url(#leafGradient1)" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
          <path d="M110 80 Q130 150 110 240" stroke="url(#leafGradient1)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <path d="M190 80 Q170 150 190 240" stroke="url(#leafGradient1)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Leaf Top Right */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-80 z-10">
        <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <path d="M150 30 Q100 60 90 150 Q100 240 150 270 Q200 240 210 150 Q200 60 150 30" 
                fill="none" stroke="url(#leafGradient2)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M150 30 Q150 150 150 270" stroke="url(#leafGradient2)" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
          <path d="M110 80 Q130 150 110 240" stroke="url(#leafGradient2)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <path d="M190 80 Q170 150 190 240" stroke="url(#leafGradient2)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Leaf Bottom Left */}
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none opacity-70 z-10">
        <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
          <path d="M150 30 Q200 60 210 150 Q200 240 150 270 Q100 240 90 150 Q100 60 150 30" 
                fill="none" stroke="url(#leafGradient3)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M150 30 Q150 150 150 270" stroke="url(#leafGradient3)" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Content Container - Centered Frame */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full max-w-5xl"
        >
          {/* Golden Frame Border Container */}
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
              padding: '14px'
            }}
          >
            {/* Inner Content */}
            <div className="relative bg-gradient-to-b from-black/70 to-black/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 space-y-6">
              
              {/* Video Container */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&fs=0`}
                  title="Sri Lankan jungle landscape"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ pointerEvents: 'none' }}
                />
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-1"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  TRAVEL
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    TO SRI LANKA
                  </span>
                </h1>
              </motion.div>

              {/* Tour Type Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-4 text-xs md:text-sm text-white/90 pt-2"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  Sightseeing tours
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  Individual tours
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  Group tours
                </span>
              </motion.div>

              {/* Search Form */}
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-2"
                >
                  <HeroSearchForm />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
