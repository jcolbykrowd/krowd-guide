# KrowdGuide - Dallas Nightlife Discovery

**Know Before You Go** - A mobile-first nightlife discovery app for Dallas, Texas.

## Features

### Four Pillars (Per Audit Requirements)

1. **Crowd Levels** - Historical patterns, NOT real-time data
   - Uses "Usually X%" terminology
   - Includes disclaimers: "Based on patterns from past year"

2. **Parking** - Venue parking availability
   - Types: Available, Limited, Valet, Garage, Street
   - Includes cost estimates and notes

3. **Vibe/Atmosphere** - Separate from crowd level
   - Types: Energetic, Chill, Loud, Romantic, Lively, Mysterious
   - Source: "Based on reviews" (until user reports available)

4. **Safety** - Dallas Police Department data
   - Shows incident count, NOT "safe/unsafe" labels
   - Includes required disclaimer about data source

## Terminology (Legal Compliance)

✅ **Use:**
- "Usually 90%" 
- "Usually Packed/Busy/Moderate/Chill"
- "X incidents reported in past 30 days"
- "Tonight" for same-day events

❌ **Never use:**
- "LIVE NOW" or "LIVE NET"
- "HOT" or "HYPE"
- "Safe" or "Unsafe"
- Real-time data claims

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS (via CDN)
- Lucide React icons
- Vite build tool

## Project Structure

```
krowdguide/
├── App.tsx              # Main app component
├── types.ts             # TypeScript interfaces
├── data.ts              # Venue, event, district data
├── index.tsx            # React entry point
├── index.html           # HTML template
├── components/
│   ├── GlassCard.tsx    # Glassmorphism card
│   └── NeonButton.tsx   # Neon glow button
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Screens

1. **Splash** (3 sec) - Animated logo with pulsing rings
2. **Onboarding** - Single screen for location permission
3. **Home** - Venue discovery with search and filters
4. **Map** - District view with crowd level bubbles
5. **Events** - Event listings with "Tonight" badges
6. **Profile** - Check-ins and saved spots
7. **Venue Modal** - Full venue details with Four Pillars
8. **Settings** - Privacy Policy, ToS, About

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run preview
```

## Data Sources

- **Crowd Data:** Outscraper / Google Popular Times (historical 52-week patterns)
- **Safety Data:** Dallas OpenData / Socrata (Dallas PD incidents)
- **Happy Hours:** Manual entry (verified static data)
- **Vibe Data:** Sentiment analysis on Outscraper reviews

## Design System

### Colors
- Background: `#09090b`
- Accent: `#FF2E63`
- Success: `#22c55e`
- Warning: `#f97316`
- Danger: `#ef4444`

### Visual Style
- Glassmorphism (backdrop-blur)
- Neon glow effects
- Smooth transitions (0.2-0.3s)

## License

© 2024 KrowdGuide. All rights reserved.
