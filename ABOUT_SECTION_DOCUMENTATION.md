# About Section - Implementation Documentation

## Overview

The About section (`components/sections/home/about.tsx`) is a premium scrollytelling experience that features word-by-word text reveal animations, color transitions, and smooth phase transitions between two text blocks.

## Features Implemented

### 1. **Two-Phase Scrollytelling**

The section contains two distinct text blocks that transition smoothly:

**Phase 1 (0% - 50% scroll):**

- Text: "We refuse to accept a future where technology complicates rather than simplifies your business."
- Reveals word-by-word from 0% to 35% scroll
- Highlights the word "business." with yellow color and badge from 40% to 45%
- Fades out from 45% to 50%

**Phase 2 (50% - 100% scroll):**

- Text: "Introducing Upright — a healthier, more human-friendly consultancy"
- Fades in at 50% to 55%
- Reveals word-by-word from 60% to 90%
- "Upright" is styled in italics for emphasis

### 2. **Typography**

- **Font**: EB Garamond (serif) for an elegant, classic look
- **Responsive Sizing**:
  - Mobile: `text-3xl`
  - Small: `text-4xl`
  - Medium: `text-5xl`
  - Large: `text-6xl`
  - XL: `text-7xl`
- **Layout**: Two lines per text block, centered, with `whitespace-nowrap` to prevent wrapping

### 3. **Animations**

#### Word Reveal Animation

- Each word fades in from `opacity: 0` to `opacity: 1`
- Words reveal sequentially based on scroll position
- Smooth, scrubbed animation tied to scroll progress

#### Wavy Effect

- Subtle vertical wave animation on all words
- Motion: `y: [0, -5, 0]`
- Duration: 4 seconds
- Infinite loop with `easeInOut` easing
- Staggered delay based on word index (`delay: index * 0.1`)

#### Highlight Effect (Phase 1 only)

- Target word: "business."
- Color transition: Black (`#24221B`) → Yellow (`#F2D04E`)
- Timing: 40% to 45% scroll (after all text is revealed)
- Badge: Circular "1" badge fades in simultaneously

### 4. **Technical Implementation**

#### Scroll Tracking

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});
```

#### Phase Transitions

- **Opacity Control**: Uses `useTransform` to control visibility
- **Pointer Events**: Disabled for inactive phases to prevent interaction issues
- **Absolute Positioning**: Both text blocks overlap in the center, controlled by opacity

#### Word Component

Reusable component that handles:

- Opacity transformation based on scroll range
- Color transformation for highlighted words
- Badge rendering for special words
- Italic styling for emphasized words
- Wave animation

### 5. **Styling Details**

#### Colors

- **Text**: `#24221B` (Brand Dark)
- **Highlight**: `#F2D04E` (Brand Yellow)
- **Background**: `#e4dfd8` (Brand Light Beige)

#### Spacing

- Word spacing: `mx-[0.15em]` (em-based for proportional scaling)
- Container: `max-w-[95vw]` with `px-4` padding
- Section height: `500vh` (5x viewport height for smooth scrolling)

#### Badge

- Size: `h-4 w-4`
- Position: Absolute, top-right of word (`-right-3 -top-1`)
- Background: Yellow (`#F2D04E`)
- Text: Dark (`#24221B`), bold, `10px`
- Shape: Circular (`rounded-full`)

### 6. **Accessibility Considerations**

- Semantic HTML with proper heading tags (`h2`)
- Text remains readable at all times
- Smooth, non-jarring animations
- Sufficient color contrast

### 7. **Performance Optimizations**

- Uses Framer Motion's `useTransform` for GPU-accelerated animations
- Scroll-linked animations are scrubbed (no JavaScript animation loops)
- Pointer events disabled on inactive phases
- Efficient re-renders with React hooks

## Dependencies Added

- **EB Garamond Font**: Added to `app/layout.tsx`
- **Font Variable**: `--font-eb-garamond` in `app/globals.css`
- **Framer Motion**: Already included in project

## File Structure

```
components/
  sections/
    home/
      about.tsx       # Main scrollytelling component
      hero.tsx        # Hero section
      index.ts        # Exports
```

## Key Props & Parameters

### Word Component Props

| Prop             | Type                  | Default      | Description                  |
| ---------------- | --------------------- | ------------ | ---------------------------- |
| `children`       | `string`              | -            | The word text                |
| `progress`       | `MotionValue<number>` | -            | Scroll progress value        |
| `range`          | `[number, number]`    | -            | Reveal range (start, end)    |
| `index`          | `number`              | -            | Word index for stagger delay |
| `isTarget`       | `boolean`             | `false`      | Enable highlight effect      |
| `highlightRange` | `[number, number]`    | `[0.8, 0.9]` | Color transition range       |
| `isItalic`       | `boolean`             | `false`      | Apply italic styling         |

## Scroll Timeline

| Scroll % | Event                                    |
| -------- | ---------------------------------------- |
| 0-35%    | Phase 1 text reveals word-by-word        |
| 35-40%   | Phase 1 text fully visible (pause)       |
| 40-45%   | "business." turns yellow + badge appears |
| 45-50%   | Phase 1 fades out                        |
| 50-55%   | Phase 2 fades in                         |
| 60-90%   | Phase 2 text reveals word-by-word        |
| 90-100%  | Phase 2 fully visible (buffer)           |

## Future Enhancements

- Add more text phases
- Implement custom highlight colors per phase
- Add sound effects on scroll milestones
- Create mobile-optimized version with adjusted timings
- Add skip/fast-forward controls for accessibility
