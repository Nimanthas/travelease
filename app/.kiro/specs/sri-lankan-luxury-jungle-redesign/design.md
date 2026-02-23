# Design Document: Sri Lankan Luxury Jungle Redesign

## Overview

This design document specifies the technical implementation for redesigning the TravelEase application with a "Moody Luxury Jungle" aesthetic tailored for a Sri Lankan tour company. The redesign preserves all existing functionality while implementing a premium visual identity that conveys exclusivity, adventure, and luxury.

### Design Goals

- Transform the existing TravelEase platform into a high-end Sri Lankan tour booking experience
- Implement immersive visual elements including video backgrounds, parallax scrolling, and animated journey paths
- Maintain all current features (stays, cars, experiences, flights, real estate) with enhanced styling
- Ensure responsive design across mobile, tablet, and desktop devices
- Optimize performance while delivering rich animations and visual effects

### Key Design Principles

1. **Component Reusability**: Extend existing components rather than creating duplicates
2. **Performance First**: Lazy loading, code splitting, and optimized animations
3. **Accessibility**: WCAG AA compliance with keyboard navigation and screen reader support
4. **Progressive Enhancement**: Core functionality works without JavaScript, animations enhance experience
5. **Mobile-First**: Responsive design starting from 320px viewport width


## Architecture

### System Architecture

The redesign follows Next.js 13.4 App Router architecture with the following layers:

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Hero Section │  │ Journey Path │  │ New Sections │      │
│  │  - Video BG  │  │  - SVG Anim  │  │  - Story     │      │
│  │  - Leaves    │  │  - Map Pins  │  │  - Mood Board│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Existing Sections (Preserved)                 │   │
│  │  SectionGridFeaturePlaces | SectionSliderCategories  │   │
│  │  SectionOurFeatures | SectionHowItWork | etc.        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Theme Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Color System │  │ Typography   │  │ Animations   │      │
│  │  - Logo      │  │  - Poppins   │  │  - Framer    │      │
│  │  - Light/Dark│  │  - Hierarchy │  │  - Variants  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Shared UI    │  │ Card Types   │  │ Navigation   │      │
│  │  - Button    │  │  - StayCard  │  │  - Header    │      │
│  │  - Input     │  │  - CarCard   │  │  - Footer    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Tour Data    │  │ Listings     │  │ Taxonomies   │      │
│  │  - Regions   │  │  - Stays     │  │  - Categories│      │
│  │  - Filters   │  │  - Cars      │  │  - Authors   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy


```
PageHome (src/app/page.tsx)
├── BgGlassmorphism (preserved)
├── HeroSection (NEW - redesigned)
│   ├── VideoBackground (YouTube embed)
│   ├── MonsteraLeafOverlay (SVG animations)
│   └── SearchBar (existing component)
├── JourneyPath (NEW - global SVG overlay)
│   └── MapPinMarker[] (waypoint indicators)
├── StoryOfJourneySection (NEW)
│   ├── DestinationMap
│   └── MapPinMarker[] (with descriptions)
├── MoodBoardSection (NEW)
│   └── ImageCollage (lazy-loaded tiles)
├── PopularToursSection (ENHANCED)
│   ├── RegionFilter (South, Central, North, West)
│   └── SectionGridFeaturePlaces (existing, styled)
├── ServicesSection (ENHANCED)
│   └── SectionSliderNewCategories (existing, styled)
├── SectionOurFeatures (PRESERVED with styling)
├── SectionHowItWork (PRESERVED with styling)
├── SectionSubscribeNewsletter (PRESERVED with styling)
├── SectionGridAuthorBox (PRESERVED with styling)
├── SectionGridCategoryBox (PRESERVED with styling)
├── SectionBecomeAnAuthor (PRESERVED with styling)
├── SectionVideos (PRESERVED with styling)
└── SectionClientSay (PRESERVED with styling)
```

### State Management

The application uses React hooks and global state for:

1. **Theme State** (`useThemeMode` hook)
   - Current theme mode (light/dark)
   - Persisted in localStorage
   - Global state via react-hooks-global-state

2. **Journey Path State** (local component state)
   - Current scroll position
   - Active section index
   - Path animation progress
   - Intersection observer refs

3. **Region Filter State** (URL query parameters)
   - Selected region category
   - Synced with URL for shareability
   - Persisted across navigation

4. **Animation State** (Framer Motion)
   - Parallax scroll values
   - Section entrance triggers
   - Leaf wind motion loops


### Animation System Architecture

The animation system uses Framer Motion with a layered approach:

**Layer 1: Scroll-Driven Animations**
- Parallax effects on Hero background and leaves
- Journey Path progressive reveal
- Section entrance animations via IntersectionObserver

**Layer 2: Continuous Animations**
- Monstera leaf wind motion (3-5s loop)
- Subtle background movements
- Hover state transitions

**Layer 3: Interaction Animations**
- Button hover effects (200ms)
- Card elevation on hover
- Filter selection feedback
- Slider navigation transitions

**Performance Considerations:**
- Use `transform` and `opacity` for GPU acceleration
- Respect `prefers-reduced-motion` media query
- Reduce parallax intensity on mobile (<640px)
- Stagger animations by 50-100ms to avoid jank


## Components and Interfaces

### New Components

#### HeroSection

**Location:** `src/app/(client-components)/HeroSection.tsx`

**Purpose:** Full-screen immersive landing section with video background and animated leaf overlays.

**Interface:**
```typescript
interface HeroSectionProps {
  className?: string;
  videoId: string; // YouTube video ID
  showSearch?: boolean;
}

interface MonsteraLeafProps {
  depth: number; // 1-3 for parallax layering
  position: { x: number; y: number }; // percentage-based positioning
  rotation: number; // initial rotation in degrees
}
```

**Key Features:**
- YouTube video embed (tzeXMaXWsuc) in styled frame
- 3-5 Monstera leaf SVG overlays with parallax
- Integrated search bar from existing components
- Responsive layout with mobile optimization
- Lazy video loading with placeholder

**Dependencies:**
- react-player or YouTube iframe API
- Framer Motion for parallax
- Existing search components

---

#### JourneyPath

**Location:** `src/components/JourneyPath.tsx`

**Purpose:** Animated SVG dotted line connecting all page sections with map pin markers.

**Interface:**
```typescript
interface JourneyPathProps {
  sections: SectionWaypoint[];
  className?: string;
}

interface SectionWaypoint {
  id: string;
  sectionRef: RefObject<HTMLElement>;
  markerContent?: MapPinContent;
}

interface MapPinContent {
  title: string;
  description: string;
  icon?: string;
}
```

**Key Features:**
- SVG path generation based on section positions
- Stroke-dashoffset animation on scroll
- IntersectionObserver for section detection
- Responsive path recalculation on resize
- Map pin markers at waypoints

**Technical Approach:**
- Calculate bezier curves between section centers
- Use `getTotalLength()` for path animation
- Update on scroll with requestAnimationFrame
- Debounce resize recalculations (150ms)

---

#### StoryOfJourneySection

**Location:** `src/components/StoryOfJourneySection.tsx`

**Purpose:** Narrative section with destination map and inspiring waypoint descriptions.

**Interface:**
```typescript
interface StoryOfJourneySectionProps {
  waypoints: JourneyWaypoint[];
  className?: string;
}

interface JourneyWaypoint {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number }; // percentage on map
  image?: string;
}
```

**Key Features:**
- Visual map with positioned markers
- Animated marker entrance on scroll
- Connected to JourneyPath
- Responsive grid layout

---

#### MoodBoardSection

**Location:** `src/components/MoodBoardSection.tsx`

**Purpose:** Image collage showcasing Sri Lankan destinations.

**Interface:**
```typescript
interface MoodBoardSectionProps {
  images: MoodBoardImage[];
  className?: string;
}

interface MoodBoardImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: number;
  priority?: boolean;
}
```

**Key Features:**
- Masonry/grid tile layout
- Next.js Image optimization
- Lazy loading below fold
- No borders, preserved aspect ratios
- Journey Path integration

**Layout Strategy:**
- CSS Grid with auto-fit columns
- Object-fit: cover for consistent sizing
- Responsive breakpoints: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop)

---

#### RegionFilter

**Location:** `src/components/RegionFilter.tsx`

**Purpose:** Filter control for Sri Lankan regional tour categories.

**Interface:**
```typescript
interface RegionFilterProps {
  regions: RegionCategory[];
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
  tourCounts: Record<string, number>;
}

type RegionCategory = 'South' | 'Central' | 'North' | 'West' | 'All';
```

**Key Features:**
- Tab-style filter buttons
- Tour count badges
- URL query parameter sync
- Active state styling
- Keyboard navigation


### Enhanced Existing Components

#### SectionGridFeaturePlaces (Popular Tours)

**Enhancements:**
- Add RegionFilter integration
- Apply logo color palette to cards
- Journey Path connection point
- Update heading to "Popular Tours"

**Modified Props:**
```typescript
interface SectionGridFeaturePlacesProps {
  // ... existing props
  regionFilter?: boolean; // Enable region filtering
  regions?: RegionCategory[];
  onRegionChange?: (region: string | null) => void;
}
```

---

#### SectionSliderNewCategories (Services)

**Enhancements:**
- Apply logo color palette
- Journey Path connection point
- Update card styling for luxury aesthetic

**No interface changes required** - styling updates only.

---

### Preserved Components

All existing section components preserved with styling updates:
- SectionOurFeatures
- SectionHowItWork
- SectionSubscribeNewsletter
- SectionGridAuthorBox
- SectionGridCategoryBox
- SectionBecomeAnAuthor
- SectionVideos
- SectionClientSay

**Styling Updates:**
- Apply logo color palette via theme
- Add Journey Path connection points
- Ensure dark mode compatibility
- Maintain existing functionality


## Data Models

### Tour Data Structure

```typescript
interface TourListing extends StayDataType {
  region: RegionCategory;
  featured?: boolean;
  sriLankanLocation: boolean;
}

type RegionCategory = 'South' | 'Central' | 'North' | 'West';

// Extends existing StayDataType from src/data/types.ts
// Adds region categorization for filtering
```

### Journey Path Data

```typescript
interface JourneyPathData {
  waypoints: Waypoint[];
  sections: SectionReference[];
}

interface Waypoint {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  position: WaypointPosition;
  icon?: IconType;
}

interface WaypointPosition {
  // Calculated dynamically from section DOM position
  x: number; // pixels from left
  y: number; // pixels from top
}

interface SectionReference {
  id: string;
  ref: RefObject<HTMLElement>;
  order: number;
}
```

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: ColorPalette;
  typography: TypographyConfig;
  animations: AnimationConfig;
}

interface ColorPalette {
  light: ColorScheme;
  dark: ColorScheme;
}

interface ColorScheme {
  primary: string;      // Extracted from logo
  secondary: string;    // Extracted from logo
  accent: string;       // Extracted from logo
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

interface TypographyConfig {
  fontFamily: string;   // 'Poppins'
  weights: number[];    // [300, 400, 500, 600, 700]
  scale: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    small: string;
  };
}

interface AnimationConfig {
  easing: string;           // 'easeInOut'
  duration: {
    fast: number;           // 200ms
    normal: number;         // 300ms
    slow: number;           // 500ms
  };
  stagger: number;          // 50-100ms
  parallaxIntensity: {
    desktop: number;        // 1.0
    mobile: number;         // 0.3
  };
}
```

### Map Pin Marker Data

```typescript
interface MapPinMarker {
  id: string;
  title: string;
  description: string;
  coordinates: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
  animationDelay: number; // ms
}

// Example data for Story of Journey section
const JOURNEY_MARKERS: MapPinMarker[] = [
  {
    id: 'sigiriya',
    title: 'Ancient Wonders',
    description: 'Discover the majestic Sigiriya Rock Fortress...',
    coordinates: { x: 45, y: 30 },
    animationDelay: 0
  },
  // ... more markers
];
```

### Mood Board Image Data

```typescript
interface MoodBoardImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
  priority: boolean;
  cloudinaryId?: string;
}

// Images organized for optimal layout
const MOOD_BOARD_IMAGES: MoodBoardImage[] = [
  {
    id: 'jungle-1',
    src: '/images/sri-lanka/jungle-canopy.jpg',
    alt: 'Lush jungle canopy in Sri Lanka',
    width: 800,
    height: 600,
    aspectRatio: 4/3,
    priority: false
  },
  // ... more images
];
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Mode Persistence

*For any* theme state (light or dark), when a user toggles the theme mode, the application should persist the new preference in localStorage and apply it immediately across all components.

**Validates: Requirements 1.3, 17.2**

---

### Property 2: Journey Path Scroll Animation

*For any* scroll position change, when a user scrolls to a new section, the Journey Path should progressively animate the connection from the previous waypoint to the current one, providing visual feedback of progress.

**Validates: Requirements 3.4, 3.7, 19.2**

---

### Property 3: Region Filter Consistency

*For any* selected region category (South, Central, North, West, or All), the Popular Tours section should display only tours matching that region, update the tour count accurately, and persist the selection in URL query parameters.

**Validates: Requirements 6.2, 6.4, 22.3, 22.4, 22.6**

---

### Property 4: Region Filter URL Restoration

*For any* URL containing a region query parameter, when the page loads, the application should apply that region filter and display the corresponding filtered tours.

**Validates: Requirements 22.7**

---

### Property 5: Parallax Scroll Effect

*For any* scroll event in the Hero section, background elements should move at a slower rate than foreground content, and Monstera leaf overlays should move at different speeds to create depth perception.

**Validates: Requirements 2.5, 9.1**

---

### Property 6: Section Entrance Animation

*For any* section with entrance animations, when that section intersects with the viewport, the application should trigger the entrance animation with appropriate stagger timing.

**Validates: Requirements 4.5, 15.5**

---

### Property 7: Journey Path Responsive Recalculation

*For any* viewport width change, the Journey Path should recalculate section positions and redraw path curves to maintain proper connections between sections.

**Validates: Requirements 19.4, 19.5**

---

### Property 8: Map Pin Content Completeness

*For any* map pin marker displayed in the Story of Journey section, the rendered output should include both a title and a description field.

**Validates: Requirements 4.3**

---

### Property 9: Image Dimension Specification

*For any* image rendered using Next.js Image component, the component should have explicit width and height props specified to prevent layout shift.

**Validates: Requirements 21.3**

---

### Property 10: Slider Navigation State

*For any* slider component state, when a user clicks the next navigation button, the current index should increment by one (unless at the end), and the slider should transition to display the next set of items.

**Validates: Requirements 7.3**

---

### Property 11: Reduced Motion Compliance

*For any* user with prefers-reduced-motion enabled, the application should disable parallax effects and non-essential animations while maintaining full functionality.

**Validates: Requirements 9.6, 15.7**


## Error Handling

### Video Loading Failures

**Scenario:** YouTube video fails to load in Hero section

**Handling Strategy:**
```typescript
// HeroSection component
const [videoError, setVideoError] = useState(false);

<ReactPlayer
  url={videoUrl}
  onError={() => setVideoError(true)}
  fallback={<StaticHeroImage src="/images/hero-fallback.jpg" />}
/>

{videoError && (
  <div className="absolute inset-0">
    <Image
      src="/images/hero-fallback.jpg"
      alt="Sri Lankan jungle landscape"
      fill
      priority
      className="object-cover"
    />
  </div>
)}
```

**User Impact:** Graceful degradation to static image, no functionality loss

---

### Journey Path Calculation Errors

**Scenario:** Section refs not available or invalid positions

**Handling Strategy:**
```typescript
// JourneyPath component
const calculatePath = (sections: SectionReference[]) => {
  try {
    const validSections = sections.filter(s => 
      s.ref.current && isInViewport(s.ref.current)
    );
    
    if (validSections.length < 2) {
      console.warn('Insufficient sections for path calculation');
      return null;
    }
    
    return generateBezierPath(validSections);
  } catch (error) {
    console.error('Path calculation failed:', error);
    return null; // Hide path rather than show broken state
  }
};
```

**User Impact:** Journey Path hidden if calculation fails, content remains accessible

---

### Region Filter Data Mismatch

**Scenario:** Tour data missing region property or invalid region value

**Handling Strategy:**
```typescript
// RegionFilter logic
const filterToursByRegion = (tours: TourListing[], region: string | null) => {
  if (!region || region === 'All') return tours;
  
  return tours.filter(tour => {
    if (!tour.region) {
      console.warn(`Tour ${tour.id} missing region property`);
      return false; // Exclude tours without region
    }
    return tour.region === region;
  });
};

// Validate region from URL
const getRegionFromURL = (): RegionCategory | null => {
  const params = new URLSearchParams(window.location.search);
  const region = params.get('region');
  
  const validRegions: RegionCategory[] = ['South', 'Central', 'North', 'West'];
  return validRegions.includes(region as RegionCategory) 
    ? (region as RegionCategory) 
    : null;
};
```

**User Impact:** Invalid tours excluded from results, invalid URL params ignored

---

### Image Loading Failures

**Scenario:** Mood Board images fail to load from Cloudinary

**Handling Strategy:**
```typescript
// MoodBoardSection component
<Image
  src={image.src}
  alt={image.alt}
  width={image.width}
  height={image.height}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder-mood-board.jpg';
  }}
  className="object-cover"
/>
```

**User Impact:** Placeholder image shown, layout preserved

---

### Theme Persistence Failures

**Scenario:** localStorage unavailable or quota exceeded

**Handling Strategy:**
```typescript
// useThemeMode hook enhancement
const persistTheme = (theme: 'light' | 'dark') => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Failed to persist theme preference:', error);
    // Continue with in-memory state, theme works for current session
  }
};

const getPersistedTheme = (): 'light' | 'dark' => {
  try {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  } catch (error) {
    console.warn('Failed to read theme preference:', error);
    return 'light'; // Default fallback
  }
};
```

**User Impact:** Theme works for current session, not persisted across visits

---

### Animation Performance Degradation

**Scenario:** Low-end device struggles with parallax animations

**Handling Strategy:**
```typescript
// Detect performance issues
const [reducedPerformance, setReducedPerformance] = useState(false);

useEffect(() => {
  let frameCount = 0;
  let lastTime = performance.now();
  
  const checkFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      if (fps < 30) {
        setReducedPerformance(true);
        console.warn('Low FPS detected, reducing animation complexity');
      }
    }
    
    if (!reducedPerformance) {
      requestAnimationFrame(checkFPS);
    }
  };
  
  requestAnimationFrame(checkFPS);
}, []);

// Apply reduced animations
const parallaxIntensity = reducedPerformance ? 0.3 : 1.0;
```

**User Impact:** Automatic reduction of animation complexity, maintains usability


## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests as complementary approaches:

**Unit Tests:** Verify specific examples, edge cases, error conditions, and integration points
**Property Tests:** Verify universal properties across randomized inputs with minimum 100 iterations

Both are necessary for comprehensive coverage. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across the input space.

---

### Property-Based Testing

**Library:** `fast-check` for TypeScript/JavaScript property-based testing

**Configuration:**
```typescript
// jest.config.js
module.exports = {
  testMatch: ['**/*.property.test.ts', '**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// jest.setup.ts
import fc from 'fast-check';

// Configure minimum 100 runs per property test
fc.configureGlobal({ numRuns: 100 });
```

**Property Test Examples:**

```typescript
// tests/theme-mode.property.test.ts
import fc from 'fast-check';
import { renderHook, act } from '@testing-library/react';
import { useThemeMode } from '@/utils/useThemeMode';

/**
 * Feature: sri-lankan-luxury-jungle-redesign
 * Property 1: Theme Mode Persistence
 * 
 * For any theme state (light or dark), when a user toggles the theme mode,
 * the application should persist the new preference in localStorage and
 * apply it immediately across all components.
 */
describe('Property 1: Theme Mode Persistence', () => {
  it('should persist theme changes to localStorage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (initialTheme) => {
          // Arrange
          localStorage.setItem('theme', initialTheme);
          const { result } = renderHook(() => useThemeMode());
          
          // Act
          act(() => {
            result.current._toogleDarkMode();
          });
          
          // Assert
          const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
          expect(localStorage.getItem('theme')).toBe(expectedTheme);
          expect(result.current.isDarkMode).toBe(expectedTheme === 'dark');
        }
      )
    );
  });
});
```

```typescript
// tests/region-filter.property.test.ts
/**
 * Feature: sri-lankan-luxury-jungle-redesign
 * Property 3: Region Filter Consistency
 * 
 * For any selected region category, the Popular Tours section should
 * display only tours matching that region, update the tour count accurately,
 * and persist the selection in URL query parameters.
 */
describe('Property 3: Region Filter Consistency', () => {
  it('should filter tours by selected region', () => {
    fc.assert(
      fc.property(
        fc.array(tourArbitrary, { minLength: 10, maxLength: 50 }),
        fc.constantFrom('South', 'Central', 'North', 'West', null),
        (tours, selectedRegion) => {
          // Act
          const filtered = filterToursByRegion(tours, selectedRegion);
          
          // Assert
          if (selectedRegion === null) {
            expect(filtered).toEqual(tours);
          } else {
            expect(filtered.every(t => t.region === selectedRegion)).toBe(true);
          }
        }
      )
    );
  });
  
  it('should calculate accurate tour counts per region', () => {
    fc.assert(
      fc.property(
        fc.array(tourArbitrary, { minLength: 10, maxLength: 50 }),
        (tours) => {
          // Act
          const counts = calculateRegionCounts(tours);
          
          // Assert
          const regions: RegionCategory[] = ['South', 'Central', 'North', 'West'];
          regions.forEach(region => {
            const expected = tours.filter(t => t.region === region).length;
            expect(counts[region]).toBe(expected);
          });
        }
      )
    );
  });
});

// Arbitrary generators
const tourArbitrary = fc.record({
  id: fc.string(),
  region: fc.constantFrom('South', 'Central', 'North', 'West'),
  name: fc.string(),
  // ... other tour properties
});
```

```typescript
// tests/journey-path.property.test.ts
/**
 * Feature: sri-lankan-luxury-jungle-redesign
 * Property 7: Journey Path Responsive Recalculation
 * 
 * For any viewport width change, the Journey Path should recalculate
 * section positions and redraw path curves to maintain proper connections.
 */
describe('Property 7: Journey Path Responsive Recalculation', () => {
  it('should recalculate paths on viewport resize', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        fc.integer({ min: 568, max: 1440 }),
        (width, height) => {
          // Arrange
          const { result } = renderHook(() => useJourneyPath(mockSections));
          
          // Act
          act(() => {
            window.innerWidth = width;
            window.innerHeight = height;
            window.dispatchEvent(new Event('resize'));
          });
          
          // Assert
          expect(result.current.pathData).toBeDefined();
          expect(result.current.pathData.length).toBeGreaterThan(0);
          // Path should be valid SVG path string
          expect(result.current.pathData).toMatch(/^M[\d\s,LQC]+$/);
        }
      )
    );
  });
});
```

---

### Unit Testing

**Focus Areas:**
- Component rendering with specific props
- Edge cases (empty data, missing fields)
- Error handling paths
- Integration between components
- Accessibility features

**Example Unit Tests:**

```typescript
// tests/HeroSection.test.tsx
describe('HeroSection', () => {
  it('should render with correct YouTube video ID', () => {
    render(<HeroSection videoId="tzeXMaXWsuc" />);
    
    const iframe = screen.getByTitle(/youtube video/i);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('tzeXMaXWsuc'));
  });
  
  it('should display fallback image on video error', () => {
    const { rerender } = render(<HeroSection videoId="invalid" />);
    
    // Simulate video error
    const player = screen.getByTestId('video-player');
    fireEvent.error(player);
    
    rerender(<HeroSection videoId="invalid" />);
    expect(screen.getByAltText(/sri lankan jungle/i)).toBeInTheDocument();
  });
  
  it('should render search bar when showSearch is true', () => {
    render(<HeroSection videoId="tzeXMaXWsuc" showSearch />);
    
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
  
  it('should have reduced parallax on mobile viewport', () => {
    window.innerWidth = 375;
    render(<HeroSection videoId="tzeXMaXWsuc" />);
    
    const leaf = screen.getByTestId('monstera-leaf-1');
    const parallaxValue = leaf.getAttribute('data-parallax-intensity');
    expect(parseFloat(parallaxValue)).toBeLessThan(0.5);
  });
});
```

```typescript
// tests/RegionFilter.test.tsx
describe('RegionFilter', () => {
  const mockRegions: RegionCategory[] = ['South', 'Central', 'North', 'West'];
  const mockCounts = { South: 10, Central: 15, North: 8, West: 12 };
  
  it('should render all region options', () => {
    render(
      <RegionFilter
        regions={mockRegions}
        selectedRegion={null}
        onRegionChange={jest.fn()}
        tourCounts={mockCounts}
      />
    );
    
    mockRegions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });
  
  it('should display tour counts for each region', () => {
    render(
      <RegionFilter
        regions={mockRegions}
        selectedRegion={null}
        onRegionChange={jest.fn()}
        tourCounts={mockCounts}
      />
    );
    
    expect(screen.getByText('10')).toBeInTheDocument(); // South count
    expect(screen.getByText('15')).toBeInTheDocument(); // Central count
  });
  
  it('should call onRegionChange when region is selected', () => {
    const handleChange = jest.fn();
    render(
      <RegionFilter
        regions={mockRegions}
        selectedRegion={null}
        onRegionChange={handleChange}
        tourCounts={mockCounts}
      />
    );
    
    fireEvent.click(screen.getByText('South'));
    expect(handleChange).toHaveBeenCalledWith('South');
  });
  
  it('should support keyboard navigation', () => {
    render(
      <RegionFilter
        regions={mockRegions}
        selectedRegion={null}
        onRegionChange={jest.fn()}
        tourCounts={mockCounts}
      />
    );
    
    const firstButton = screen.getByText('South');
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    
    fireEvent.keyDown(firstButton, { key: 'ArrowRight' });
    expect(screen.getByText('Central')).toHaveFocus();
  });
});
```

---

### Integration Testing

**Focus:** Component interactions and data flow

```typescript
// tests/integration/popular-tours.test.tsx
describe('Popular Tours Integration', () => {
  it('should filter tours when region is selected', async () => {
    const mockTours = [
      { id: '1', name: 'Tour 1', region: 'South' },
      { id: '2', name: 'Tour 2', region: 'Central' },
      { id: '3', name: 'Tour 3', region: 'South' },
    ];
    
    render(<PopularToursSection tours={mockTours} />);
    
    // Initially shows all tours
    expect(screen.getAllByTestId('tour-card')).toHaveLength(3);
    
    // Select South region
    fireEvent.click(screen.getByText('South'));
    
    // Should show only South tours
    await waitFor(() => {
      expect(screen.getAllByTestId('tour-card')).toHaveLength(2);
    });
  });
  
  it('should update URL when region is selected', () => {
    render(<PopularToursSection tours={mockTours} />);
    
    fireEvent.click(screen.getByText('Central'));
    
    expect(window.location.search).toContain('region=Central');
  });
  
  it('should restore filter from URL on mount', () => {
    window.history.pushState({}, '', '?region=North');
    
    render(<PopularToursSection tours={mockTours} />);
    
    expect(screen.getByText('North')).toHaveClass('active');
  });
});
```

---

### Accessibility Testing

```typescript
// tests/accessibility/hero-section.a11y.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('HeroSection Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HeroSection videoId="tzeXMaXWsuc" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper heading hierarchy', () => {
    render(<HeroSection videoId="tzeXMaXWsuc" />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings[0].tagName).toBe('H1');
  });
  
  it('should provide alt text for all images', () => {
    render(<MoodBoardSection images={mockImages} />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
```

---

### Performance Testing

```typescript
// tests/performance/animation.perf.test.tsx
describe('Animation Performance', () => {
  it('should maintain 60fps during parallax scroll', async () => {
    const { container } = render(<HeroSection videoId="tzeXMaXWsuc" />);
    
    const frameTimings: number[] = [];
    let lastTime = performance.now();
    
    // Simulate scroll events
    for (let i = 0; i < 100; i++) {
      const currentTime = performance.now();
      frameTimings.push(currentTime - lastTime);
      lastTime = currentTime;
      
      fireEvent.scroll(window, { target: { scrollY: i * 10 } });
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    
    const avgFrameTime = frameTimings.reduce((a, b) => a + b) / frameTimings.length;
    const fps = 1000 / avgFrameTime;
    
    expect(fps).toBeGreaterThanOrEqual(55); // Allow 5fps margin
  });
});
```


## Visual Design System

### Color Palette

**Extraction Strategy:**
Colors will be extracted from `design/Logo.jpg` and `design/Travel Ease Logo.png` using color analysis tools or manual selection of dominant colors.

**Expected Palette Structure:**
```typescript
// src/styles/theme-colors.ts
export const logoColors = {
  light: {
    primary: '#2D5F3F',      // Deep jungle green (from logo)
    secondary: '#8B6F47',    // Warm earth tone (from logo)
    accent: '#D4AF37',       // Luxury gold accent (from logo)
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    muted: '#F5F5F0',
    border: '#E5E5E0',
  },
  dark: {
    primary: '#4A8B5C',      // Lighter jungle green
    secondary: '#B8956A',    // Lighter earth tone
    accent: '#F4D03F',       // Brighter gold
    background: '#0F1410',   // Deep jungle night
    foreground: '#F5F5F0',
    muted: '#1F2820',
    border: '#2F3830',
  }
};
```

**Application:**
- Buttons: primary color with accent on hover
- Links: primary color
- Cards: muted background with border
- CTAs: accent color for high-priority actions
- Journey Path: primary color with opacity variations

---

### Typography

**Font Family:** Poppins (already in use)

**Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

**Scale:**
```scss
// src/styles/__theme_font.scss
$font-scale: (
  'h1': (
    'mobile': 2rem,      // 32px
    'tablet': 2.5rem,    // 40px
    'desktop': 3rem,     // 48px
    'weight': 700
  ),
  'h2': (
    'mobile': 1.5rem,    // 24px
    'tablet': 1.875rem,  // 30px
    'desktop': 2.25rem,  // 36px
    'weight': 600
  ),
  'h3': (
    'mobile': 1.25rem,   // 20px
    'tablet': 1.5rem,    // 24px
    'desktop': 1.75rem,  // 28px
    'weight': 600
  ),
  'body': (
    'size': 1rem,        // 16px
    'weight': 400,
    'line-height': 1.6
  ),
  'small': (
    'size': 0.875rem,    // 14px
    'weight': 400,
    'line-height': 1.5
  )
);
```

**Usage Guidelines:**
- H1: Hero section headline, page titles
- H2: Section headings
- H3: Subsection headings, card titles
- Body: Paragraph text, descriptions
- Small: Metadata, captions, helper text

---

### Spacing and Layout Grid

**Base Unit:** 4px (0.25rem)

**Spacing Scale:**
```typescript
// Tailwind config extension
spacing: {
  '0': '0',
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  '24': '6rem',     // 96px
  '32': '8rem',     // 128px
}
```

**Layout Grid:**
- Container max-width: 1280px (xl breakpoint)
- Gutter: 24px (1.5rem)
- Columns: 12-column grid
- Section padding: 96px vertical (desktop), 48px (mobile)

**Responsive Breakpoints:**
```typescript
// Tailwind breakpoints (existing)
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet portrait
  'lg': '1024px',  // Tablet landscape
  'xl': '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}
```

---

### Component Styling Patterns

#### Cards

```typescript
// Base card styling
const cardClasses = `
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  rounded-2xl
  overflow-hidden
  transition-all duration-300
  hover:shadow-xl hover:-translate-y-1
`;
```

#### Buttons

```typescript
// Primary button
const primaryButtonClasses = `
  bg-primary-600 dark:bg-primary-500
  text-white
  px-6 py-3
  rounded-full
  font-medium
  transition-colors duration-200
  hover:bg-accent-600 dark:hover:bg-accent-500
  focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
`;

// Secondary button
const secondaryButtonClasses = `
  bg-transparent
  text-primary-600 dark:text-primary-400
  border-2 border-primary-600 dark:border-primary-400
  px-6 py-3
  rounded-full
  font-medium
  transition-all duration-200
  hover:bg-primary-50 dark:hover:bg-primary-900/20
`;
```

#### Inputs

```typescript
const inputClasses = `
  w-full
  px-4 py-3
  bg-white dark:bg-neutral-900
  border border-neutral-300 dark:border-neutral-700
  rounded-lg
  text-neutral-900 dark:text-neutral-100
  placeholder:text-neutral-400 dark:placeholder:text-neutral-600
  focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
  transition-colors duration-200
`;
```

---

### Animation Specifications

#### Easing Functions

```typescript
// src/utils/animationVariants.ts
export const easings = {
  easeInOut: [0.4, 0.0, 0.2, 1],
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  spring: { type: 'spring', stiffness: 300, damping: 30 }
};
```

#### Duration Standards

```typescript
export const durations = {
  fast: 0.2,      // 200ms - hover states, focus
  normal: 0.3,    // 300ms - theme transitions, modals
  slow: 0.5,      // 500ms - page transitions, complex animations
  wind: 4,        // 4000ms - leaf wind motion loop
};
```

#### Parallax Configuration

```typescript
export const parallaxConfig = {
  desktop: {
    background: 0.5,    // Moves at 50% of scroll speed
    midground: 0.7,     // Moves at 70% of scroll speed
    foreground: 1.0,    // Moves at 100% (normal scroll)
    leaves: {
      layer1: 0.3,
      layer2: 0.5,
      layer3: 0.7,
    }
  },
  mobile: {
    background: 0.8,    // Reduced intensity
    midground: 0.9,
    foreground: 1.0,
    leaves: {
      layer1: 0.9,      // Minimal parallax
      layer2: 0.95,
      layer3: 1.0,
    }
  }
};
```

#### Stagger Timing

```typescript
export const staggerConfig = {
  cards: 0.1,           // 100ms between card animations
  listItems: 0.05,      // 50ms between list items
  sections: 0.2,        // 200ms between section entrances
};
```

---

### Monstera Leaf Specifications

**SVG Structure:**
```svg
<svg viewBox="0 0 200 300" className="monstera-leaf">
  <path
    d="M100,10 Q120,50 110,90 Q105,120 100,150 Q95,180 90,210 Q85,240 100,270"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    opacity="0.15"
  />
  <!-- Additional leaf details -->
</svg>
```

**Styling:**
- Stroke-only (no fill)
- Opacity: 0.1 - 0.3
- Color: Inherits from theme (primary color)
- Line weight: 1-2px

**Animation:**
```typescript
// Wind motion animation
const windMotion = {
  rotate: [-5, 5, -5],
  x: [0, 10, 0],
  y: [0, 5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};
```

**Positioning:**
- 3-5 leaves per Hero section
- Positioned at different z-index layers (1-3)
- Distributed across viewport (avoid clustering)
- Never overlap search bar or primary content


## Technical Implementation Details

### Hero Section Video Background

**Implementation Approach:**

```typescript
// src/app/(client-components)/HeroSection.tsx
import ReactPlayer from 'react-player/youtube';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  className?: string;
  videoId?: string;
  showSearch?: boolean;
}

export default function HeroSection({
  className = '',
  videoId = 'tzeXMaXWsuc',
  showSearch = true
}: HeroSectionProps) {
  const [videoError, setVideoError] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax for background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Video Frame */}
      <motion.div 
        className="absolute inset-0 scale-110"
        style={{ y: backgroundY }}
      >
        <div className="relative w-full h-full p-8 md:p-16">
          {/* Frame border */}
          <div className="absolute inset-8 md:inset-16 border-4 border-primary-600/30 rounded-3xl pointer-events-none z-10" />
          
          {/* Video */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {!videoError ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                playing
                loop
                muted
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      modestbranding: 1,
                      rel: 0
                    }
                  }
                }}
                onError={() => setVideoError(true)}
              />
            ) : (
              <Image
                src="/images/hero-fallback.jpg"
                alt="Sri Lankan jungle landscape"
                fill
                priority
                className="object-cover"
              />
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Monstera Leaf Overlays */}
      <MonsteraLeafOverlay depth={1} position={{ x: 10, y: 20 }} rotation={-15} />
      <MonsteraLeafOverlay depth={2} position={{ x: 80, y: 30 }} rotation={10} />
      <MonsteraLeafOverlay depth={3} position={{ x: 50, y: 70 }} rotation={-5} />
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-8"
        >
          Discover Sri Lanka's Hidden Treasures
        </motion.h1>
        
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl"
          >
            <HeroSearchForm />
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

**Monstera Leaf Component:**

```typescript
// src/components/MonsteraLeafOverlay.tsx
interface MonsteraLeafProps {
  depth: number;
  position: { x: number; y: number };
  rotation: number;
}

export default function MonsteraLeafOverlay({ depth, position, rotation }: MonsteraLeafProps) {
  const { scrollY } = useScroll();
  const isMobile = useWindowSize().width < 640;
  
  // Parallax based on depth
  const parallaxRate = isMobile ? 0.95 : (1 - depth * 0.2);
  const y = useTransform(scrollY, [0, 500], [0, 500 * (1 - parallaxRate)]);
  
  // Wind motion
  const windAnimation = {
    rotate: [rotation - 5, rotation + 5, rotation - 5],
    x: [0, 10, 0],
    y: [0, 5, 0],
  };
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        y,
        zIndex: depth,
      }}
      animate={windAnimation}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 200 300"
        className="w-32 md:w-48 lg:w-64 text-primary-600 dark:text-primary-400"
        style={{ opacity: 0.15 }}
      >
        <path
          d="M100,10 Q120,50 110,90 L100,150 L90,210 Q85,240 100,270 M100,150 L130,140 M100,150 L70,140 M100,210 L120,200 M100,210 L80,200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
```

---

### Journey Path Implementation

**Core Logic:**

```typescript
// src/components/JourneyPath.tsx
import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

interface JourneyPathProps {
  sections: SectionWaypoint[];
}

export default function JourneyPath({ sections }: JourneyPathProps) {
  const [pathData, setPathData] = useState<string>('');
  const [activeSection, setActiveSection] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate path on mount and resize
  useEffect(() => {
    const calculatePath = () => {
      const points = sections
        .map(section => {
          if (!section.sectionRef.current) return null;
          const rect = section.sectionRef.current.getBoundingClientRect();
          return {
            x: window.innerWidth / 2,
            y: rect.top + window.scrollY + rect.height / 2
          };
        })
        .filter(Boolean);
      
      if (points.length < 2) return;
      
      // Generate smooth bezier curve
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const controlPointOffset = Math.abs(curr.y - prev.y) * 0.3;
        
        path += ` Q ${prev.x} ${prev.y + controlPointOffset}, ${curr.x} ${curr.y}`;
      }
      
      setPathData(path);
    };
    
    calculatePath();
    
    const handleResize = debounce(calculatePath, 150);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [sections]);
  
  // Update active section on scroll
  useEffect(() => {
    const observers = sections.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );
      
      if (section.sectionRef.current) {
        observer.observe(section.sectionRef.current);
      }
      
      return observer;
    });
    
    return () => observers.forEach(observer => observer.disconnect());
  }, [sections]);
  
  // Calculate path length for animation
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);
  
  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ height: `${document.body.scrollHeight}px` }}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Background path */}
      <path
        d={pathData}
        stroke="var(--primary-color)"
        strokeWidth="2"
        strokeDasharray="8 8"
        fill="none"
        opacity="0.2"
      />
      
      {/* Animated progress path */}
      <path
        ref={pathRef}
        d={pathData}
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeDasharray="8 8"
        fill="none"
        style={{
          strokeDashoffset: pathLength * (1 - scrollYProgress.get()),
        }}
      />
      
      {/* Map pin markers */}
      {sections.map((section, index) => (
        <MapPinMarker
          key={section.id}
          section={section}
          active={index <= activeSection}
        />
      ))}
    </svg>
  );
}
```

**Map Pin Marker:**

```typescript
// src/components/MapPinMarker.tsx
interface MapPinMarkerProps {
  section: SectionWaypoint;
  active: boolean;
}

export default function MapPinMarker({ section, active }: MapPinMarkerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!section.sectionRef.current) return;
    
    const updatePosition = () => {
      const rect = section.sectionRef.current!.getBoundingClientRect();
      setPosition({
        x: window.innerWidth / 2,
        y: rect.top + window.scrollY + rect.height / 2
      });
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [section]);
  
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <motion.circle
        r="8"
        fill={active ? 'var(--accent-color)' : 'var(--muted-color)'}
        initial={{ scale: 0 }}
        animate={{ scale: active ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        r="12"
        fill="none"
        stroke={active ? 'var(--accent-color)' : 'var(--muted-color)'}
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: active ? 1 : 0,
          opacity: active ? 0.5 : 0
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </g>
  );
}
```

---

### Region Filter with URL Sync

```typescript
// src/components/RegionFilter.tsx
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegionFilter({ regions, tourCounts, onRegionChange }: RegionFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get('region') as RegionCategory | null;
  
  const handleRegionSelect = (region: RegionCategory | null) => {
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (region && region !== 'All') {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Notify parent
    onRegionChange(region);
  };
  
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => handleRegionSelect(null)}
        className={`px-6 py-2 rounded-full transition-all ${
          !selectedRegion
            ? 'bg-primary-600 text-white'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
        }`}
      >
        All Regions
        <span className="ml-2 text-sm opacity-75">
          ({Object.values(tourCounts).reduce((a, b) => a + b, 0)})
        </span>
      </button>
      
      {regions.map(region => (
        <button
          key={region}
          onClick={() => handleRegionSelect(region)}
          className={`px-6 py-2 rounded-full transition-all ${
            selectedRegion === region
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          {region}
          <span className="ml-2 text-sm opacity-75">
            ({tourCounts[region] || 0})
          </span>
        </button>
      ))}
    </div>
  );
}
```

---

### Performance Optimizations

**Code Splitting:**

```typescript
// src/app/page.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const JourneyPath = dynamic(() => import('@/components/JourneyPath'), {
  ssr: false,
  loading: () => <div className="h-screen" />
});

const MoodBoardSection = dynamic(() => import('@/components/MoodBoardSection'), {
  loading: () => <div className="h-96 bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
});
```

**Image Optimization:**

```typescript
// Next.js Image configuration
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com', 'images.pexels.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

**Animation Performance:**

```typescript
// Use will-change for animated elements
const optimizedAnimationStyles = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)', // Force GPU acceleration
};

// Debounce resize handlers
const debounce = (fn: Function, ms: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};
```


## File Structure and Organization

### New Files to Create

```
travelease/src/
├── app/
│   └── (client-components)/
│       ├── HeroSection.tsx                    # NEW - Video hero with leaves
│       ├── StoryOfJourneySection.tsx          # NEW - Journey map section
│       └── MoodBoardSection.tsx               # NEW - Image collage
│
├── components/
│   ├── JourneyPath.tsx                        # NEW - Animated SVG path
│   ├── MapPinMarker.tsx                       # NEW - Waypoint markers
│   ├── MonsteraLeafOverlay.tsx                # NEW - Leaf animations
│   ├── RegionFilter.tsx                       # NEW - Tour region filter
│   ├── SectionGridFeaturePlaces.tsx           # ENHANCED - Add region filter
│   └── SectionSliderNewCategories.tsx         # ENHANCED - Styling updates
│
├── data/
│   ├── journey-waypoints.ts                   # NEW - Journey path data
│   ├── mood-board-images.ts                   # NEW - Collage images
│   └── sri-lankan-tours.ts                    # NEW - Regional tour data
│
├── styles/
│   ├── __theme_colors.scss                    # ENHANCED - Logo colors
│   └── __journey_path.scss                    # NEW - Path-specific styles
│
└── utils/
    ├── animationVariants.ts                   # ENHANCED - New variants
    └── pathCalculations.ts                    # NEW - Bezier curve utils
```

### Modified Files

```
travelease/src/
├── app/
│   ├── page.tsx                               # MODIFIED - New section order
│   └── layout.tsx                             # MODIFIED - Theme provider
│
├── styles/
│   ├── __theme_colors.scss                    # MODIFIED - Logo palette
│   └── globals.css                            # MODIFIED - Journey path styles
│
└── utils/
    └── useThemeMode.ts                        # VERIFIED - No changes needed
```

### Component File Locations

**Page-Specific Components** → `src/app/(client-components)/`
- HeroSection.tsx
- StoryOfJourneySection.tsx
- MoodBoardSection.tsx

**Reusable Components** → `src/components/`
- JourneyPath.tsx
- MapPinMarker.tsx
- MonsteraLeafOverlay.tsx
- RegionFilter.tsx

**Data Files** → `src/data/`
- journey-waypoints.ts
- mood-board-images.ts
- sri-lankan-tours.ts

**Utilities** → `src/utils/`
- pathCalculations.ts (new)
- animationVariants.ts (enhanced)

---

## Implementation Phases

### Phase 1: Theme and Foundation (Week 1)

**Tasks:**
1. Extract color palette from logo files
2. Update `__theme_colors.scss` with logo colors
3. Create theme configuration in TypeScript
4. Test theme switching with existing components
5. Verify dark mode compatibility

**Deliverables:**
- Updated theme files
- Color palette documentation
- Theme switching verification

---

### Phase 2: Hero Section (Week 1-2)

**Tasks:**
1. Create HeroSection component
2. Implement YouTube video embed with frame
3. Create MonsteraLeafOverlay component
4. Implement parallax scrolling
5. Add wind motion animations
6. Integrate existing search bar
7. Responsive layout testing

**Deliverables:**
- HeroSection component
- MonsteraLeafOverlay component
- Video fallback handling
- Mobile optimization

---

### Phase 3: Journey Path System (Week 2-3)

**Tasks:**
1. Create JourneyPath component
2. Implement SVG path calculation
3. Create MapPinMarker component
4. Add scroll-based animation
5. Implement IntersectionObserver
6. Add responsive recalculation
7. Performance optimization

**Deliverables:**
- JourneyPath component
- MapPinMarker component
- Path calculation utilities
- Scroll animation system

---

### Phase 4: New Sections (Week 3-4)

**Tasks:**
1. Create StoryOfJourneySection
2. Create MoodBoardSection
3. Implement journey waypoint data
4. Add mood board images
5. Lazy loading implementation
6. Journey Path integration
7. Responsive layouts

**Deliverables:**
- StoryOfJourneySection component
- MoodBoardSection component
- Journey waypoint data
- Mood board image data

---

### Phase 5: Enhanced Sections (Week 4-5)

**Tasks:**
1. Create RegionFilter component
2. Enhance SectionGridFeaturePlaces
3. Add regional tour data
4. Implement URL query sync
5. Update SectionSliderNewCategories styling
6. Apply logo colors to all sections
7. Journey Path connections

**Deliverables:**
- RegionFilter component
- Enhanced Popular Tours section
- Regional tour data
- URL-based filtering

---

### Phase 6: Styling and Polish (Week 5-6)

**Tasks:**
1. Apply logo colors to all preserved sections
2. Update card styling
3. Update button styling
4. Implement hover states
5. Add transition animations
6. Accessibility audit
7. Cross-browser testing

**Deliverables:**
- Styled components
- Accessibility compliance
- Browser compatibility

---

### Phase 7: Testing and Optimization (Week 6-7)

**Tasks:**
1. Write property-based tests
2. Write unit tests
3. Write integration tests
4. Accessibility testing
5. Performance optimization
6. Lighthouse audit
7. Bug fixes

**Deliverables:**
- Test suite (100+ tests)
- Performance report
- Accessibility report
- Bug fix documentation

---

### Phase 8: Documentation and Deployment (Week 7-8)

**Tasks:**
1. Component documentation
2. API documentation
3. Deployment preparation
4. Production build testing
5. Final QA
6. Deployment
7. Post-deployment monitoring

**Deliverables:**
- Complete documentation
- Production deployment
- Monitoring setup
- Handoff documentation

---

## Dependencies

### New Dependencies to Install

```json
{
  "dependencies": {
    "react-player": "^2.13.0",
    "react-use": "^17.4.0"
  },
  "devDependencies": {
    "fast-check": "^3.15.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "jest-axe": "^8.0.0"
  }
}
```

### Existing Dependencies (Verified)

- next: 13.4.x
- react: 18.x
- framer-motion: (existing)
- tailwindcss: (existing)
- typescript: (existing)

---

## Accessibility Considerations

### Keyboard Navigation

**Requirements:**
- All interactive elements focusable via Tab
- Focus indicators visible (2px outline)
- Skip-to-content link at page top
- Logical tab order maintained

**Implementation:**
```typescript
// Focus management for region filter
const RegionFilter = () => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % buttonRefs.current.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + buttonRefs.current.length) % buttonRefs.current.length;
      buttonRefs.current[prevIndex]?.focus();
    }
  };
  
  // ... render with onKeyDown handlers
};
```

### Screen Reader Support

**Requirements:**
- Alt text for all images
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content
- Proper heading hierarchy (h1 → h2 → h3)

**Implementation:**
```typescript
// Hero section with proper ARIA
<section aria-label="Hero section with video background">
  <h1>Discover Sri Lanka's Hidden Treasures</h1>
  
  <div role="search" aria-label="Tour search">
    <HeroSearchForm />
  </div>
  
  <div aria-hidden="true">
    {/* Decorative leaf overlays */}
    <MonsteraLeafOverlay />
  </div>
</section>

// Region filter with ARIA
<div role="group" aria-label="Filter tours by region">
  <button
    aria-pressed={selectedRegion === 'South'}
    aria-label={`South region, ${tourCounts.South} tours`}
  >
    South ({tourCounts.South})
  </button>
</div>
```

### Reduced Motion

**Implementation:**
```typescript
// Detect and respect prefers-reduced-motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Apply in components
const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={reducedMotion ? {} : parallaxAnimation}
    >
      {/* Content */}
    </motion.div>
  );
};
```

### Color Contrast

**Requirements:**
- WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- Test both light and dark modes
- Ensure sufficient contrast for all interactive elements

**Verification:**
```typescript
// Contrast checking utility
const checkContrast = (foreground: string, background: string): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  return ratio >= 4.5; // WCAG AA for normal text
};

// Apply in theme validation
const validateTheme = (theme: ColorScheme) => {
  const checks = [
    checkContrast(theme.foreground, theme.background),
    checkContrast(theme.primary, theme.background),
    // ... more checks
  ];
  
  if (!checks.every(Boolean)) {
    console.warn('Theme does not meet WCAG AA contrast requirements');
  }
};
```

---

## Browser Compatibility

### Target Browsers

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- iOS Safari: Latest 2 versions
- Chrome Mobile: Latest 2 versions

### Polyfills and Fallbacks

**IntersectionObserver:**
```typescript
// Polyfill for older browsers
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => {
    // IntersectionObserver now available
  });
}
```

**CSS Features:**
```scss
// Fallbacks for CSS features
.card {
  background: #ffffff; // Fallback
  background: var(--background-color); // Modern
  
  border-radius: 16px; // Fallback
  border-radius: clamp(12px, 2vw, 16px); // Modern
}
```

**JavaScript Features:**
- Use TypeScript compilation target ES2020
- PostCSS Autoprefixer for vendor prefixes
- Babel for additional transpilation if needed

---

## Deployment Considerations

### Build Optimization

```bash
# Production build
npm run build

# Expected output
- Route (app)                              Size     First Load JS
- ○ /                                      15.2 kB        120 kB
- ○ /listing-stay-map                      8.4 kB         113 kB
# ... other routes

# Bundle analysis
npm run analyze
```

### Environment Variables

```env
# .env.production
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_SITE_URL=https://travelease.com
```

### Performance Targets

- Lighthouse Performance: ≥90
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.8s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <200ms

### Monitoring

```typescript
// Performance monitoring
if (typeof window !== 'undefined') {
  // Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}
```

---

## Summary

This design document provides a comprehensive technical specification for redesigning the TravelEase application with a Sri Lankan luxury jungle aesthetic. The implementation preserves all existing functionality while introducing:

- Immersive video hero section with animated botanical overlays
- Animated journey path connecting all sections
- New content sections (Story of Journey, Mood Board)
- Regional tour filtering with URL synchronization
- Enhanced visual design system based on logo colors
- Comprehensive animation system with performance optimization
- Full accessibility compliance
- Property-based testing strategy

The phased implementation approach ensures systematic development over 7-8 weeks, with clear deliverables and testing at each stage.

