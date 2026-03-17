# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

항상 한국어로 대답할 것.

## Project Overview

Personal portfolio website for Bonseung Koo (Frontend Engineer). Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and React Three Fiber for 3D visuals. Deployed on Vercel. Supports Korean/English bilingual content and light/dark themes.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, core-web-vitals + typescript rules)
- `npm test` — Vitest 테스트 실행 (1회)
- `npm run test:watch` — Vitest watch 모드

테스트 가이드: [docs/testing.md](docs/testing.md)

CI runs lint + build on push to main and on PRs (`.github/workflows/ci.yml`).

## Architecture

**App Router pages** (`app/`): All pages are client components (`"use client"`) that consume `useSettings()` for language/theme.

- `app/page.tsx` — Home with 3D hero canvas and intro text
- `app/about/page.tsx` — Profile, education, skills
- `app/projects/page.tsx` — Project cards with click-to-open detail modals
- `app/contact/page.tsx` — Contact links

**Shared components** (`app/components/`):
- `settings-context.tsx` — `SettingsProvider` + `useSettings()` hook. Theme/language state persisted via cookies (server-read in layout) and localStorage. Theme toggle adds temporary `theme-changing` class for smooth CSS transitions.
- `page-shell.tsx` — Common page wrapper with background blobs and grid overlay. `fullBleed` prop for the home page's full-screen layout.
- `site-nav.tsx` — Bottom-anchored glass nav bar. Desktop: hidden by default, revealed on mouse-near-bottom. Mobile: always visible. Active link indicator animates via `offsetLeft`/`offsetWidth`.
- `hero-canvas.tsx` — R3F `<Canvas>` with torus knot, orbiting dots, sparkles, and orbit controls. Theme-aware colors.
- `project-card.tsx` — Card + modal pattern for project details.

**Data** (`app/data/portfolio.ts`): All portfolio content (hero, profile, education, skills, projects, contacts) as typed exports with `LocalizedText` (`{ko, en}`) pattern.

**Styling**: Tailwind CSS v4 with CSS custom properties for theming. Light/dark tokens defined in `app/globals.css` under `:root` and `html.dark`. Glass-morphism design system: `.glass-panel`, `.liquid-nav`, `.settings-pill` classes. Display font via `.display-font` utility class.

## Key Patterns

- **Bilingual content**: All user-facing text uses `LocalizedText` type (`{ko: string, en: string}`). Access via `content[language]` where `language` comes from `useSettings()`.
- **Theme switching**: Cookie-based SSR initial value (read in `layout.tsx` server component) + client-side toggle. The `html` element gets/loses `dark` class.
- **CSS variables over Tailwind tokens**: Colors use `color:var(--ink)` pattern in className rather than Tailwind color utilities, to support the custom theme system.
- **TypeScript LSP 우선 사용**: 코드베이스 탐색이나 타입 추론 시 TypeScript LSP 도구를 우선 사용할 것.
