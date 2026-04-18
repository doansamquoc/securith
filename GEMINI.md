# GEMINI.md

## Project Overview

Securith is a blockchain-integrated, secure, and transparent polling application. It enables users to create, deploy, and participate in polls with verifiable results on the blockchain.

### Main Technologies

*   **Frontend:** React 19 (TypeScript), Vite
*   **Routing:** TanStack Router
*   **State Management:** Zustand, TanStack React Query
*   **Forms/Validation:** TanStack React Form, Zod
*   **Blockchain Integration:** Thirdweb SDK
*   **Styling:** Tailwind CSS (v4), shadcn/ui
*   **UI Components:** Radix UI, Lucide React, Recharts (for analytics)

## Building and Running

*   **Install Dependencies:** `npm install`
*   **Development Server:** `npm run dev`
*   **Build:** `npm run build`
*   **Lint:** `npm run lint`
*   **Preview:** `npm run preview`

*Note: The project requires environment variables configured in a `.env` file (based on `.env.example`).*

## Development Conventions

*   **Codebase structure:** Features-based organization under `src/features/`.
*   **Routing:** Uses file-based routing via `src/routes/` and TanStack Router.
*   **UI Components:** Reusable components are located in `src/components/ui/` (following shadcn/ui conventions).
*   **State:** Centralized auth state in `src/store/auth.store.ts`.
*   **Lib:** Utility functions and library configurations (e.g., Thirdweb) reside in `src/lib/`.
