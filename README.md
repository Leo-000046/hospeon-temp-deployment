# Hospeon - Hospital Management System

## Overview
Enterprise-grade, scalable monorepo architecture for Hospeon SaaS platform.
- **Frontend**: Vite + React 18 + TS + Tailwind + Zustand + TanStack Query (Deploy: Vercel)
- **Backend**: Express + TS + Prisma + Postgres (Deploy: Render)
- **Database**: PostgreSQL (Neon/Supabase)

## Folder Structure
- `apps/frontend`: Feature-sliced React application.
- `apps/backend`: Domain-driven modular Express API.
- `packages/shared`: Shared DTOs, Enums, and Types (Zod).

## Startup Sequence
1. `pnpm install`
2. Setup `.env` in both frontend and backend.
3. `pnpm --filter backend prisma db push`
4. `pnpm dev` (Starts both servers concurrently)

## Deployment Strategy
- Frontend and backend are independently deployable via GitHub actions hooking into Vercel and Render respectively.
- Future Docker strategy involves the `infrastructure/docker` configurations.
