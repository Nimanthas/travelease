# Implementation Plan: Sri Lankan Luxury Jungle Redesign

## Overview

This implementation plan converts the design document into actionable coding tasks for the TravelEase application redesign. The plan follows a phased approach that builds incrementally, with each task referencing specific requirements and design sections. All existing functionality is preserved while implementing the new "Moody Luxury Jungle" aesthetic. Also make sure do not create any test files. Also 
Do not write code before stating assumptions. 
Do not claim correctness you haven't verifed 
Do not handle only the happy path. 
Under what conditions does this work?


**Implementation Language:** TypeScript (as specified in design document)
**Framework:** Next.js 13.4 with App Router
**Animation Library:** Framer Motion
**Testing Library:** fast-check for property-based testing, Jest for unit tests

## Tasks

- [-] 1. Theme and Foundation Setup
  - [x] 1.1 Extract and implement logo color palette
    - Extract primary, secondary, and accent colors from design/Logo.jpg and design/Travel Ease Logo.png using color analysis
    - Create TypeScript color configuration file at src/styles/theme-colors.ts
    - Define light and dark mode color schemes with proper TypeScript interfaces
    - Export logoColors object with light and dark variants
    - _Requirements: 1.1, 1.2, 1.3, 14.5, 17.4_
  
  - [x] 1.2 Update theme system with logo colors
    - Update src/styles/__theme_colors.scss with extracted palette
    - Apply colors to Tailwind configuration
    - Ensure WCAG AA contrast ratios in both modes
    - _Requirements: 1.2, 1.3, 17.5, 17.7_
  
  - [-] 1.3 Create animation configuration
    - Define easing functions in src/utils/animationVariants.ts
    - Configure duration standards (fast: 200ms, normal: 300ms, slow: 500ms)
    - Set up parallax intensity configs for desktop and mobile
    - Define stagger timing for cards, lists, and sections
    - _Requirements: 15.1, 15.2, 9.4_
  
  - [ ]* 1.4 Write property test for theme mode persistence
    - **Property 1: Theme Mode Persistence**
    - **Validates: Requirements 1.3, 17.2**
    - Test that theme changes persist to localStorage and apply immediately
    - Use fast-check with light/dark theme arbitrary
    - _Requirements: 1.6, 17.2, 17.3_

- [ ] 2. Hero Section Implementation
  - [ ] 2.1 Create HeroSection component structure
    - Create src/app/(client-components)/HeroSection.tsx
    - Define TypeScript interfaces (HeroSectionProps)
    - Set up component layout with video container and content overlay
    - Implement responsive height (h-screen) and overflow handling
    - _Requirements: 2.1, 2.2, 2.8, 2.9_
  
  - [ ] 2.2 Implement YouTube video background
    - Install react-player dependency: npm install react-player
    - Embed YouTube video (ID: tzeXMaXWsuc) using ReactPlayer component
    - Configure video props: autoplay, loop, muted, controls hidden
    - Add decorative frame border matching design/Hero Section.png styling
    - Implement fallback static image for video load failures
    - Add error handling with onError callback
    - _Requirements: 2.1, 2.2, 2.3, 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8_
  
  - [ ] 2.3 Create MonsteraLeafOverlay component
    - Create src/components/MonsteraLeafOverlay.tsx
    - Define MonsteraLeafProps interface (depth, position, rotation)
    - Implement SVG monstera leaf with stroke-only styling
    - Set opacity between 0.1-0.3 for subtlety
    - Apply theme colors to leaf stroke
    - _Requirements: 2.4, 23.1, 23.2, 23.7_
  
  - [ ] 2.4 Implement parallax scrolling effects
    - Use Framer Motion useScroll and useTransform hooks
    - Apply parallax to video background (50% scroll speed on desktop)
    - Implement depth-based parallax for leaf overlays (layers 1-3)
    - Reduce parallax intensity on mobile (<640px viewport)
    - _Requirements: 2.5, 9.1, 9.2, 9.5_
  
  - [ ] 2.5 Add wind motion animations to leaves
    - Implement continuous rotation animation (-5° to +5°)
    - Add subtle translation (x: 0-10px, y: 0-5px)
    - Set animation duration to 4 seconds with infinite loop
    - Use easeInOut easing for natural motion
    - _Requirements: 2.6, 23.3, 23.4, 23.5_
  
  - [ ] 2.6 Integrate search bar and content
    - Import and integrate existing HeroSearchForm component
    - Add hero headline with entrance animation
    - Implement staggered entrance animations (headline → search)
    - Position content overlay with proper z-index
    - _Requirements: 2.7, 2.8_
  
  - [ ]* 2.7 Write unit tests for HeroSection
    - Test video embed with correct YouTube ID
    - Test fallback image display on video error
    - Test search bar rendering when showSearch prop is true
    - Test reduced parallax on mobile viewport
    - _Requirements: 2.1, 2.9, 2.10, 18.7_
  
  - [ ]* 2.8 Write property test for parallax scroll effect
    - **Property 5: Parallax Scroll Effect**
    - **Validates: Requirements 2.5, 9.1**
    - Test that background moves slower than foreground on scroll
    - Test that leaves move at different speeds based on depth
    - _Requirements: 9.1, 9.2_

- [ ] 3. Journey Path System
  - [ ] 3.1 Create JourneyPath component structure
    - Create src/components/JourneyPath.tsx
    - Define interfaces (JourneyPathProps, SectionWaypoint)
    - Set up SVG container with fixed positioning
    - Initialize state for path data and active section
    - _Requirements: 3.1, 3.2, 19.1_
  
  - [ ] 3.2 Implement SVG path calculation logic
    - Create src/utils/pathCalculations.ts with bezier curve utility functions
    - Implement calculatePath function that takes section refs and returns SVG path string
    - Generate smooth bezier curves between waypoints using quadratic curves
    - Handle edge cases: missing refs, insufficient sections (< 2), invalid positions
    - Add TypeScript interfaces for Point and PathCalculationResult
    - _Requirements: 3.3, 19.4_
  
  - [ ] 3.3 Add scroll-based path animation
    - Use Framer Motion scrollYProgress for animation
    - Implement stroke-dashoffset technique for progressive reveal
    - Calculate total path length with getTotalLength()
    - Animate path as user scrolls through sections
    - _Requirements: 3.4, 3.7, 19.2, 19.3_
  
  - [ ] 3.4 Implement IntersectionObserver for section detection
    - Set up IntersectionObserver for each section
    - Update active section state on intersection
    - Configure threshold (0.5) for optimal detection
    - Clean up observers on component unmount
    - _Requirements: 3.4, 19.7_
  
  - [ ] 3.5 Add responsive path recalculation
    - Implement debounced resize handler (150ms)
    - Recalculate section positions on viewport changes
    - Redraw path curves for new layout
    - Maintain smooth animation during recalculation
    - _Requirements: 3.3, 19.4, 19.5_
  
  - [ ] 3.6 Create MapPinMarker component
    - Create src/components/MapPinMarker.tsx
    - Define MapPinMarkerProps interface
    - Implement SVG circle markers with active/inactive states
    - Add scale and opacity animations on activation
    - Position markers at section waypoints
    - _Requirements: 3.5, 4.3_
  
  - [ ]* 3.7 Write unit tests for JourneyPath
    - Test path calculation with valid section refs
    - Test handling of missing or invalid refs
    - Test IntersectionObserver setup and cleanup
    - Test resize event handling and debouncing
    - _Requirements: 3.1, 3.2, 19.4_
  
  - [ ]* 3.8 Write property test for responsive recalculation
    - **Property 7: Journey Path Responsive Recalculation**
    - **Validates: Requirements 19.4, 19.5**
    - Test path recalculation across viewport widths (320px-2560px)
    - Verify valid SVG path string generation
    - _Requirements: 3.3, 19.4, 19.5_

- [ ] 4. Checkpoint - Verify core animations
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. New Content Sections
  - [ ] 5.1 Create StoryOfJourneySection component
    - Create src/app/(client-components)/StoryOfJourneySection.tsx
    - Define interfaces (StoryOfJourneySectionProps, JourneyWaypoint)
    - Implement destination map layout
    - Position map pin markers at specified coordinates
    - _Requirements: 4.1, 4.2_
  
  - [ ] 5.2 Add waypoint data and animations
    - Create src/data/journey-waypoints.ts with waypoint data
    - Implement entrance animations for markers on scroll
    - Connect waypoints to JourneyPath
    - Add staggered animation timing
    - _Requirements: 4.3, 4.4, 4.5, 4.7_
  
  - [ ] 5.3 Implement responsive layout for StoryOfJourneySection
    - Create mobile, tablet, and desktop layouts
    - Adjust marker positioning for different breakpoints
    - Test layout at all responsive breakpoints
    - _Requirements: 4.6, 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 5.4 Write property test for map pin content
    - **Property 8: Map Pin Content Completeness**
    - **Validates: Requirements 4.3**
    - Test that all markers have title and description
    - Use fast-check with waypoint arbitrary
    - _Requirements: 4.3_
  
  - [ ] 5.5 Create MoodBoardSection component
    - Create src/app/(client-components)/MoodBoardSection.tsx
    - Define interfaces (MoodBoardSectionProps, MoodBoardImage)
    - Implement CSS Grid tile layout
    - Preserve image aspect ratios with object-fit
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 5.6 Add mood board images and lazy loading
    - Create src/data/mood-board-images.ts with MoodBoardImage interface and image data array
    - Use Next.js Image component for all images with proper optimization
    - Implement lazy loading for below-fold images using loading="lazy"
    - Specify explicit width and height for each image to prevent layout shift
    - Configure image domains in next.config.js (Cloudinary, Pexels)
    - _Requirements: 5.7, 21.1, 21.2, 21.3, 21.5, 21.6_
  
  - [ ] 5.7 Implement responsive grid for MoodBoardSection
    - Configure 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
    - Test tile reflow on viewport changes
    - Integrate JourneyPath through collage
    - _Requirements: 5.6, 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 5.8 Write unit tests for new sections
    - Test StoryOfJourneySection marker rendering
    - Test MoodBoardSection image lazy loading
    - Test responsive grid layouts
    - Test JourneyPath integration
    - _Requirements: 4.1, 5.1, 5.5_
  
  - [ ]* 5.9 Write property test for image dimensions
    - **Property 9: Image Dimension Specification**
    - **Validates: Requirements 21.3**
    - Test that all images have explicit width and height
    - Verify no layout shift occurs
    - _Requirements: 21.3, 13.6_

- [ ] 6. Enhanced Existing Sections
  - [ ] 6.1 Create RegionFilter component
    - Create src/components/RegionFilter.tsx
    - Define interfaces (RegionFilterProps, RegionCategory)
    - Implement tab-style filter buttons
    - Display tour count badges for each region
    - _Requirements: 6.2, 22.1, 22.2, 22.4_
  
  - [ ] 6.2 Implement URL query parameter sync
    - Use Next.js useRouter and useSearchParams hooks
    - Update URL when region is selected
    - Restore filter from URL on page load
    - Implement scroll: false to prevent page jump
    - _Requirements: 22.6, 22.7_
  
  - [ ]* 6.3 Write property test for region filter consistency
    - **Property 3: Region Filter Consistency**
    - **Validates: Requirements 6.2, 6.4, 22.3, 22.4, 22.6**
    - Test filtering tours by selected region
    - Test accurate tour count calculation
    - Use fast-check with tour array arbitrary
    - _Requirements: 6.2, 6.4, 22.3, 22.4_
  
  - [ ]* 6.4 Write property test for URL restoration
    - **Property 4: Region Filter URL Restoration**
    - **Validates: Requirements 22.7**
    - Test that URL region parameter applies filter on load
    - _Requirements: 22.7_
  
  - [ ] 6.5 Enhance SectionGridFeaturePlaces for Popular Tours
    - Add RegionFilter integration to component
    - Implement tour filtering logic by region
    - Update section heading to "Popular Tours"
    - Apply logo color palette to tour cards
    - Add JourneyPath connection point
    - _Requirements: 6.1, 6.2, 6.4, 6.5, 6.6, 6.7_
  
  - [ ] 6.6 Create regional tour data
    - Create src/data/sri-lankan-tours.ts
    - Define TourListing interface extending StayDataType
    - Add region property (South, Central, North, West)
    - Populate with Sri Lankan tour data
    - _Requirements: 22.1, 22.2_
  
  - [ ] 6.7 Update SectionSliderNewCategories styling
    - Apply logo color palette to service category cards
    - Update card hover states and transitions
    - Add JourneyPath connection point
    - Ensure touch gesture support on mobile
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 7.6_
  
  - [ ]* 6.8 Write integration tests for Popular Tours
    - Test region filter integration with tour display
    - Test URL update when region is selected
    - Test filter restoration from URL on mount
    - _Requirements: 6.2, 6.4, 22.6, 22.7_
  
  - [ ]* 6.9 Write property test for slider navigation
    - **Property 10: Slider Navigation State**
    - **Validates: Requirements 7.3**
    - Test slider index increment on next button click
    - Test transition to next items
    - _Requirements: 7.3_

- [ ] 7. Styling and Polish for Preserved Sections
  - [ ] 7.1 Apply logo colors to SectionOurFeatures
    - Update component styling with theme colors
    - Apply primary color to icons and accents
    - Update card backgrounds and borders
    - Add JourneyPath connection point
    - _Requirements: 8.1, 8.9, 8.10_
  
  - [ ] 7.2 Apply logo colors to SectionHowItWork
    - Update step indicators with accent color
    - Apply theme colors to text and backgrounds
    - Update hover states with smooth transitions
    - Add JourneyPath connection point
    - _Requirements: 8.2, 8.9, 8.10_
  
  - [ ] 7.3 Apply logo colors to SectionSubscribeNewsletter
    - Update input field styling with theme colors
    - Apply accent color to submit button
    - Update focus states with primary color
    - Add JourneyPath connection point
    - _Requirements: 8.3, 8.9, 8.10_
  
  - [ ] 7.4 Apply logo colors to SectionGridAuthorBox
    - Update author card styling with theme colors
    - Apply hover effects with elevation
    - Update text colors for light/dark modes
    - Add JourneyPath connection point
    - _Requirements: 8.4, 8.9, 8.10_
  
  - [ ] 7.5 Apply logo colors to SectionGridCategoryBox
    - Update category card backgrounds and borders
    - Apply primary color to category icons
    - Update hover states with accent color
    - Add JourneyPath connection point
    - _Requirements: 8.5, 8.9, 8.10_
  
  - [ ] 7.6 Apply logo colors to SectionBecomeAnAuthor
    - Update CTA button with accent color
    - Apply theme colors to background and text
    - Update hover state transitions
    - Add JourneyPath connection point
    - _Requirements: 8.6, 8.9, 8.10_
  
  - [ ] 7.7 Apply logo colors to SectionVideos
    - Update video card styling with theme colors
    - Apply hover effects to thumbnails
    - Update play button with accent color
    - Add JourneyPath connection point
    - _Requirements: 8.7, 8.9, 8.10_
  
  - [ ] 7.8 Apply logo colors to SectionClientSay
    - Update testimonial card styling
    - Apply theme colors to quotes and attribution
    - Update navigation controls with primary color
    - Add JourneyPath connection point
    - _Requirements: 8.8, 8.9, 8.10_
  
  - [ ] 7.9 Implement global interactive element styling
    - Update button hover states (200ms transition)
    - Add card elevation on hover
    - Implement focus rings for keyboard navigation
    - Ensure WCAG AA contrast for all states
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_
  
  - [ ] 7.10 Update page layout with new section order
    - Modify src/app/page.tsx with new component order
    - Integrate JourneyPath with section refs
    - Implement dynamic imports for heavy components
    - Test complete page flow
    - _Requirements: 3.2, 13.4_

- [ ] 8. Checkpoint - Verify styling consistency
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Animation Choreography and Performance
  - [ ] 9.1 Implement section entrance animations
    - Add Framer Motion variants for section entrances
    - Use IntersectionObserver to trigger animations
    - Implement stagger timing (50-100ms between elements)
    - Apply to all new and enhanced sections
    - _Requirements: 15.5, 15.2_
  
  - [ ]* 9.2 Write property test for section entrance animation
    - **Property 6: Section Entrance Animation**
    - **Validates: Requirements 4.5, 15.5**
    - Test animation trigger on viewport intersection
    - Test stagger timing application
    - _Requirements: 4.5, 15.5_
  
  - [ ] 9.3 Implement reduced motion support
    - Create useReducedMotion hook
    - Detect prefers-reduced-motion media query
    - Disable parallax and non-essential animations
    - Maintain full functionality without animations
    - _Requirements: 9.6, 15.7, 20.8_
  
  - [ ]* 9.4 Write property test for reduced motion compliance
    - **Property 11: Reduced Motion Compliance**
    - **Validates: Requirements 9.6, 15.7**
    - Test parallax disabled when prefers-reduced-motion is set
    - Test full functionality maintained
    - _Requirements: 9.6, 15.7, 20.8_
  
  - [ ] 9.5 Optimize animation performance
    - Add will-change CSS property to animated elements
    - Use transform and opacity for GPU acceleration
    - Implement debouncing for resize handlers
    - Test 60fps performance during scroll
    - _Requirements: 9.4, 19.6_
  
  - [ ] 9.6 Implement code splitting for heavy components
    - Use Next.js dynamic imports for JourneyPath
    - Lazy load MoodBoardSection below fold
    - Add loading placeholders for dynamic components
    - Test initial load performance
    - _Requirements: 13.4_
  
  - [ ] 9.7 Optimize images for performance
    - Configure Next.js Image domains (Cloudinary, Pexels)
    - Set up WebP and AVIF format support
    - Define responsive device sizes
    - Compress images to <200KB
    - _Requirements: 21.1, 21.4, 21.7_

- [ ] 10. Accessibility Implementation
  - [ ] 10.1 Implement keyboard navigation
    - Ensure all interactive elements are focusable
    - Add visible focus indicators (2px outline)
    - Implement arrow key navigation for RegionFilter
    - Add skip-to-content link
    - _Requirements: 20.2, 20.5, 10.5_
  
  - [ ] 10.2 Add ARIA labels and semantic HTML
    - Add alt text to all images
    - Provide ARIA labels for icon-only buttons
    - Implement proper heading hierarchy (h1 → h2 → h3)
    - Add ARIA live regions for dynamic content
    - _Requirements: 20.1, 20.3, 20.4_
  
  - [ ] 10.3 Ensure color contrast compliance
    - Verify WCAG AA contrast ratios (4.5:1 normal, 3:1 large)
    - Test both light and dark modes
    - Validate all interactive element states
    - _Requirements: 10.6, 17.7_
  
  - [ ]* 10.4 Write accessibility tests
    - Use jest-axe for automated accessibility testing
    - Test HeroSection for violations
    - Test proper heading hierarchy
    - Test alt text presence on all images
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.7_

- [ ] 11. Testing and Quality Assurance
  - [ ]* 11.1 Write property test for theme mode persistence
    - **Property 1: Theme Mode Persistence**
    - **Validates: Requirements 1.3, 17.2**
    - Test theme toggle persists to localStorage
    - Test immediate application across components
    - _Requirements: 1.6, 17.2, 17.3_
  
  - [ ]* 11.2 Write property test for journey path scroll animation
    - **Property 2: Journey Path Scroll Animation**
    - **Validates: Requirements 3.4, 3.7, 19.2**
    - Test progressive animation on scroll
    - Test visual feedback of progress
    - _Requirements: 3.4, 3.7, 19.2_
  
  - [ ]* 11.3 Write unit tests for error handling
    - Test video loading failure fallback
    - Test journey path calculation errors
    - Test region filter data mismatch handling
    - Test image loading failures
    - Test theme persistence failures
  
  - [ ]* 11.4 Write integration tests
    - Test complete user flow: landing → filter → tour selection
    - Test theme switching across all sections
    - Test responsive layout changes
    - Test JourneyPath integration with all sections
  
  - [ ]* 11.5 Perform cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge (latest 2 versions)
    - Test in iOS Safari and Chrome Mobile
    - Verify polyfills for IntersectionObserver
    - Test CSS fallbacks
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.8_
  
  - [ ]* 11.6 Run Lighthouse performance audit
    - Achieve performance score ≥90
    - Verify LCP <2.5s
    - Verify CLS <0.1
    - Verify FID <100ms
    - _Requirements: 13.1, 13.5, 13.6_

- [ ] 12. Build and Deployment Preparation
  - [ ] 12.1 Install new dependencies
    - Install react-player for YouTube embed
    - Install react-use for utility hooks
    - Install fast-check for property-based testing
    - Install jest-axe for accessibility testing
    - _Requirements: 18.1_
  
  - [ ] 12.2 Configure build optimization
    - Update next.config.js with image domains
    - Configure image formats (WebP, AVIF)
    - Set up bundle analysis
    - Verify production build succeeds
    - _Requirements: 21.1, 21.4, 25.1, 25.4_
  
  - [ ] 12.3 Run linting and type checking
    - Run ESLint with no errors
    - Run TypeScript type checking in strict mode
    - Fix any linting or type errors
    - _Requirements: 25.2, 25.3_
  
  - [ ] 12.4 Verify development environment
    - Test hot module replacement
    - Verify dev server runs on port 3000
    - Test all features in development mode
    - _Requirements: 25.5, 25.6_
  
  - [ ] 12.5 Generate production build report
    - Run build with bundle analysis
    - Verify gzipped bundles <500KB
    - Review route-specific bundle sizes
    - Optimize large bundles if needed
    - _Requirements: 25.4, 25.7_

- [ ] 13. Final Checkpoint - Complete verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout with strict typing
- All animations respect prefers-reduced-motion for accessibility
- The implementation preserves all existing TravelEase functionality
