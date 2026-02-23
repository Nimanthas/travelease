import { StayDataType } from "./types";
import { DEMO_STAY_CATEGORIES } from "./taxonomies";
import { DEMO_AUTHORS } from "./authors";
import { Route } from "@/routers/types";
import { RegionCategory } from "@/components/RegionFilter";

export interface TourListing extends StayDataType {
  region: RegionCategory;
  featured?: boolean;
  sriLankanLocation: boolean;
}

const SRI_LANKAN_TOURS_DATA: Omit<TourListing, "id" | "author" | "listingCategory">[] & { authorId: number; listingCategoryId: number }[] = [
  // South Region Tours
  {
    date: "2024-01-15",
    href: "/listing-stay-detail" as Route,
    title: "Galle Fort Heritage Villa",
    featuredImage: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 58,
    viewCount: 1240,
    address: "Galle Fort, Southern Province",
    reviewStart: 4.9,
    reviewCount: 112,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260",
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$280",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    saleOff: null,
    isAds: null,
    map: { lat: 6.0328, lng: 80.2170 },
    region: "South",
    featured: true,
    sriLankanLocation: true,
    authorId: 1,
    listingCategoryId: 1,
  },
  {
    date: "2024-01-20",
    href: "/listing-stay-detail" as Route,
    title: "Mirissa Beach Luxury Resort",
    featuredImage: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 42,
    viewCount: 980,
    address: "Mirissa Beach, Southern Province",
    reviewStart: 4.8,
    reviewCount: 89,
    like: false,
    galleryImgs: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$320",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    saleOff: "-15% today",
    isAds: true,
    map: { lat: 5.9467, lng: 80.4586 },
    region: "South",
    featured: true,
    sriLankanLocation: true,
    authorId: 2,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-01",
    href: "/listing-stay-detail" as Route,
    title: "Unawatuna Coastal Villa",
    featuredImage: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 35,
    viewCount: 720,
    address: "Unawatuna, Southern Province",
    reviewStart: 4.7,
    reviewCount: 67,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$195",
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 1,
    saleOff: null,
    isAds: null,
    map: { lat: 6.0104, lng: 80.2503 },
    region: "South",
    sriLankanLocation: true,
    authorId: 3,
    listingCategoryId: 1,
  },

  // Central Region Tours
  {
    date: "2024-01-18",
    href: "/listing-stay-detail" as Route,
    title: "Kandy Hill Country Estate",
    featuredImage: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 67,
    viewCount: 1450,
    address: "Kandy, Central Province",
    reviewStart: 4.9,
    reviewCount: 134,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$350",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    saleOff: null,
    isAds: null,
    map: { lat: 7.2906, lng: 80.6337 },
    region: "Central",
    featured: true,
    sriLankanLocation: true,
    authorId: 1,
    listingCategoryId: 1,
  },
  {
    date: "2024-01-25",
    href: "/listing-stay-detail" as Route,
    title: "Nuwara Eliya Tea Plantation Bungalow",
    featuredImage: "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 51,
    viewCount: 1120,
    address: "Nuwara Eliya, Central Province",
    reviewStart: 4.8,
    reviewCount: 98,
    like: false,
    galleryImgs: [
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$290",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    saleOff: "-10% today",
    isAds: true,
    map: { lat: 6.9497, lng: 80.7891 },
    region: "Central",
    featured: true,
    sriLankanLocation: true,
    authorId: 2,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-05",
    href: "/listing-stay-detail" as Route,
    title: "Ella Mountain View Lodge",
    featuredImage: "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 44,
    viewCount: 890,
    address: "Ella, Central Province",
    reviewStart: 4.7,
    reviewCount: 76,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$220",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    saleOff: null,
    isAds: null,
    map: { lat: 6.8667, lng: 81.0467 },
    region: "Central",
    sriLankanLocation: true,
    authorId: 3,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-10",
    href: "/listing-stay-detail" as Route,
    title: "Sigiriya Rock View Resort",
    featuredImage: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 72,
    viewCount: 1580,
    address: "Sigiriya, Central Province",
    reviewStart: 4.9,
    reviewCount: 145,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$380",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    saleOff: null,
    isAds: null,
    map: { lat: 7.9570, lng: 80.7603 },
    region: "Central",
    featured: true,
    sriLankanLocation: true,
    authorId: 1,
    listingCategoryId: 1,
  },

  // North Region Tours
  {
    date: "2024-01-22",
    href: "/listing-stay-detail" as Route,
    title: "Jaffna Cultural Heritage House",
    featuredImage: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 38,
    viewCount: 650,
    address: "Jaffna, Northern Province",
    reviewStart: 4.6,
    reviewCount: 54,
    like: false,
    galleryImgs: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$180",
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    saleOff: null,
    isAds: null,
    map: { lat: 9.6615, lng: 80.0255 },
    region: "North",
    sriLankanLocation: true,
    authorId: 2,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-08",
    href: "/listing-stay-detail" as Route,
    title: "Trincomalee Beach Resort",
    featuredImage: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 49,
    viewCount: 1050,
    address: "Trincomalee, Eastern Province",
    reviewStart: 4.8,
    reviewCount: 92,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$260",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    saleOff: "-12% today",
    isAds: true,
    map: { lat: 8.5874, lng: 81.2152 },
    region: "North",
    featured: true,
    sriLankanLocation: true,
    authorId: 3,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-12",
    href: "/listing-stay-detail" as Route,
    title: "Anuradhapura Ancient City Lodge",
    featuredImage: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 33,
    viewCount: 580,
    address: "Anuradhapura, North Central Province",
    reviewStart: 4.5,
    reviewCount: 48,
    like: false,
    galleryImgs: [
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$165",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    saleOff: null,
    isAds: null,
    map: { lat: 8.3114, lng: 80.4037 },
    region: "North",
    sriLankanLocation: true,
    authorId: 1,
    listingCategoryId: 1,
  },

  // West Region Tours
  {
    date: "2024-01-16",
    href: "/listing-stay-detail" as Route,
    title: "Colombo City Luxury Apartment",
    featuredImage: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 89,
    viewCount: 2100,
    address: "Colombo 3, Western Province",
    reviewStart: 4.8,
    reviewCount: 178,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$420",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    saleOff: null,
    isAds: null,
    map: { lat: 6.9271, lng: 79.8612 },
    region: "West",
    featured: true,
    sriLankanLocation: true,
    authorId: 1,
    listingCategoryId: 1,
  },
  {
    date: "2024-01-28",
    href: "/listing-stay-detail" as Route,
    title: "Negombo Beach Front Villa",
    featuredImage: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 56,
    viewCount: 1230,
    address: "Negombo, Western Province",
    reviewStart: 4.7,
    reviewCount: 103,
    like: false,
    galleryImgs: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$310",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    saleOff: "-18% today",
    isAds: true,
    map: { lat: 7.2008, lng: 79.8358 },
    region: "West",
    featured: true,
    sriLankanLocation: true,
    authorId: 2,
    listingCategoryId: 1,
  },
  {
    date: "2024-02-03",
    href: "/listing-stay-detail" as Route,
    title: "Bentota River View Resort",
    featuredImage: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260",
    commentCount: 41,
    viewCount: 870,
    address: "Bentota, Western Province",
    reviewStart: 4.6,
    reviewCount: 71,
    like: true,
    galleryImgs: [
      "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    price: "$240",
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    saleOff: null,
    isAds: null,
    map: { lat: 6.4258, lng: 79.9951 },
    region: "West",
    sriLankanLocation: true,
    authorId: 3,
    listingCategoryId: 1,
  },
];

export const SRI_LANKAN_TOURS: TourListing[] = SRI_LANKAN_TOURS_DATA.map(
  (tour, index): TourListing => {
    const category = DEMO_STAY_CATEGORIES.find(
      (cat) => cat.id === (tour as any).listingCategoryId
    ) || DEMO_STAY_CATEGORIES[0];

    const author = DEMO_AUTHORS.find(
      (auth) => auth.id === (tour as any).authorId
    ) || DEMO_AUTHORS[0];

    const { authorId, listingCategoryId, ...tourData } = tour as any;

    return {
      ...tourData,
      id: `sriLankanTour_${index}_`,
      author,
      listingCategory: category,
    };
  }
);

export const getSriLankanToursByRegion = (
  region: RegionCategory | null
): TourListing[] => {
  if (!region) {
    return SRI_LANKAN_TOURS;
  }
  return SRI_LANKAN_TOURS.filter((tour) => tour.region === region);
};

export const getSriLankanTourCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {
    South: 0,
    Central: 0,
    North: 0,
    West: 0,
  };

  SRI_LANKAN_TOURS.forEach((tour) => {
    counts[tour.region] = (counts[tour.region] || 0) + 1;
  });

  return counts;
};
