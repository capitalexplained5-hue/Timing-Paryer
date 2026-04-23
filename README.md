# Global Prayer Times

A premium, fast, and mobile-first website for accurate prayer timings worldwide.

## Features

- **Global Coverage**: Get prayer times for millions of cities globally.
- **Real-time Countdown**: Never miss a prayer with our smart countdown timer to the next prayer.
- **Monthly Calendar**: View full monthly schedules for better planning.
- **Islamic & Gregorian Dates**: Includes Hijri date integration.
- **Premium UI**: Designed with a focus on typography, readability, and modern dark aesthetics.
- **SEO Optimized**: Dynamic meta tags and structured data for search engine visibility.

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Framer Motion** (via `motion/react`)
- **Lucide React** (Icons)
- **Aladhan API** (Data Source)

## Deployment Instructions for Vercel

1. **Connect to GitHub**: Push your code to a GitHub repository.
2. **Import Project**: In the Vercel dashboard, click "Add New Project" and select your repository.
3. **Configure Framework**: Vercel should automatically detect "Vite" as the framework.
4. **Environment Variables**: No sensitive variables are strictly required for the public API, but ensure your build settings match the default (Build Command: `npm run build`, Output Directory: `dist`).
5. **Deploy**: Click "Deploy" and your site will be live!

## Development

To run the project locally:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.
