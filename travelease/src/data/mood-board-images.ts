import { MoodBoardImage } from "@/app/(client-components)/MoodBoardSection";

/**
 * Mood Board Image Data
 * 
 * Collection of Sri Lankan destination images for the MoodBoardSection.
 * Images are optimized for performance with explicit dimensions and lazy loading.
 * 
 * Image sources:
 * - Pexels: Free stock photos
 * - Unsplash: Free stock photos
 * - Cloudinary: Optimized image hosting
 * 
 * Requirements: 5.7, 21.1, 21.2, 21.3, 21.5
 */

export const MOOD_BOARD_IMAGES: MoodBoardImage[] = [
  {
    id: "jungle-canopy-1",
    src: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    alt: "Lush jungle canopy in Sri Lankan rainforest",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: true,
  },
  {
    id: "tea-plantation-1",
    src: "https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg",
    alt: "Rolling tea plantations in the hill country",
    width: 800,
    height: 1200,
    aspectRatio: 2 / 3,
    priority: true,
  },
  {
    id: "beach-sunset-1",
    src: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg",
    alt: "Golden sunset over pristine Sri Lankan beach",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: false,
  },
  {
    id: "temple-architecture-1",
    src: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg",
    alt: "Ancient Buddhist temple with intricate architecture",
    width: 800,
    height: 800,
    aspectRatio: 1,
    priority: false,
  },
  {
    id: "wildlife-elephant-1",
    src: "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg",
    alt: "Wild elephant in natural habitat",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: false,
  },
  {
    id: "waterfall-1",
    src: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
    alt: "Majestic waterfall cascading through jungle",
    width: 800,
    height: 1200,
    aspectRatio: 2 / 3,
    priority: false,
  },
  {
    id: "spice-market-1",
    src: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg",
    alt: "Colorful spices at traditional market",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: false,
  },
  {
    id: "coastal-village-1",
    src: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg",
    alt: "Traditional fishing village along the coast",
    width: 800,
    height: 800,
    aspectRatio: 1,
    priority: false,
  },
  {
    id: "mountain-vista-1",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    alt: "Panoramic mountain views from hill country",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: false,
  },
  {
    id: "rice-paddy-1",
    src: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72",
    alt: "Terraced rice paddies in rural landscape",
    width: 800,
    height: 1200,
    aspectRatio: 2 / 3,
    priority: false,
  },
  {
    id: "colonial-architecture-1",
    src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
    alt: "Dutch colonial architecture in Galle Fort",
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    priority: false,
  },
  {
    id: "tropical-flora-1",
    src: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
    alt: "Vibrant tropical flowers and foliage",
    width: 800,
    height: 800,
    aspectRatio: 1,
    priority: false,
  },
];
