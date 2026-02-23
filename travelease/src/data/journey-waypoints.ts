import { JourneyWaypoint } from "@/app/(client-components)/StoryOfJourneySection";

export const JOURNEY_WAYPOINTS: JourneyWaypoint[] = [
  {
    id: "sigiriya",
    title: "Ancient Wonders",
    description: "Discover the majestic Sigiriya Rock Fortress, a UNESCO World Heritage site rising 200 meters above the jungle canopy.",
    position: { x: 45, y: 30 },
    image: "/images/sri-lanka/sigiriya.jpg",
  },
  {
    id: "kandy",
    title: "Cultural Heart",
    description: "Experience the sacred Temple of the Tooth and immerse yourself in Sri Lanka's rich cultural heritage.",
    position: { x: 40, y: 50 },
    image: "/images/sri-lanka/kandy.jpg",
  },
  {
    id: "ella",
    title: "Mountain Paradise",
    description: "Trek through lush tea plantations and witness breathtaking views from Little Adam's Peak.",
    position: { x: 50, y: 65 },
    image: "/images/sri-lanka/ella.jpg",
  },
  {
    id: "galle",
    title: "Colonial Charm",
    description: "Wander through the historic Galle Fort, where Dutch colonial architecture meets tropical beauty.",
    position: { x: 30, y: 80 },
    image: "/images/sri-lanka/galle.jpg",
  },
  {
    id: "mirissa",
    title: "Coastal Bliss",
    description: "Relax on pristine beaches and embark on unforgettable whale watching adventures.",
    position: { x: 35, y: 90 },
    image: "/images/sri-lanka/mirissa.jpg",
  },
];
