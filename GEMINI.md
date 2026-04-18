# Securith - Blockchain Polling Application

## Project Overview
Securith is a secure and transparent polling application integrated with the Blockchain. It leverages modern web technologies and decentralized protocols to ensure tamper-proof voting and gasless transactions for users.

### Key Technologies
- **Framework:** React 19 + Vite 8 + TypeScript
- **Web3 SDK:** [Thirdweb SDK](https://thirdweb.com/) (targeting **Base Sepolia**)
- **Account Abstraction:** EIP-4337 Smart Accounts with Sponsored Gas (Biconomy/Thirdweb)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
- **State Management:** 
  - **Server State:** [TanStack Query](https://tanstack.com/query)
  - **Global Client State:** [Zustand](https://docs.pmnd.rs/zustand)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Forms:** [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)
- **Authentication:** In-app wallets (Social login via Google, Facebook, etc.) powered by Thirdweb/Magic.

## Directory Structure
- `src/features/`: Feature-based architecture (e.g., `auth`, `home`). Each feature contains its own components and logic.
- `src/routes/`: File-based route definitions for TanStack Router.
  - `__root.tsx`: Main layout wrapper.
  - `_authenticated.tsx`: Layout for protected routes.
  - `_auth.tsx`: Layout for authentication-related routes (login).
- `src/components/ui/`: Reusable UI components (Shadcn UI).
- `src/hooks/`: Global custom React hooks.
- `src/lib/`: Third-party library configurations (e.g., `thirdweb.ts`).
- `src/store/`: Zustand store definitions.
- `src/providers/`: Global context providers.

## Getting Started

### Prerequisites
- Node.js (v24.14.1 recommended)
- Thirdweb Client ID/Secret Key
- Alchemy API Key (for contract interactions)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your `VITE_THIRDWEB_CLIENT_ID` and `VITE_THIRDWEB_SECRET_KEY`.

### Development Commands
- **Start Dev Server:** `npm run dev`
- **Build Project:** `npm run build`
- **Lint Code:** `npm run lint`
- **Preview Build:** `npm run preview`

## Development Conventions
- **Feature-First:** Place domain-specific logic and components inside `src/features/[feature-name]`.
- **Type Safety:** Use TypeScript for all files. Define Zod schemas for form validation and API responses.
- **Routing:** Use the `createFileRoute` from TanStack Router. New routes should be added to `src/routes/` and will be automatically generated into `routeTree.gen.ts`.
- **Web3 Interaction:** Use Thirdweb hooks (`useActiveAccount`, `useConnect`, `useReadContract`, etc.) for blockchain interactions. Ensure gasless transactions are enabled via the `smartAccount` config in `src/lib/thirdweb.ts`.
- **Styling:** Use Tailwind CSS 4 utility classes. Prefer Shadcn components for complex UI elements.
- **State Management:** Use TanStack Query for any asynchronous data fetching. Use Zustand for simple global state like authentication status.
