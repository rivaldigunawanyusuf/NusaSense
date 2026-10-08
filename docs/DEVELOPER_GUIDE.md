# 🛠️ NusaSense Developer Guide

Welcome to the NusaSense repository! This guide provides everything you need to know to start contributing to the codebase.

## 1. Environment Setup

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A local SQLite database (for development) or PostgreSQL (for production).

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/rivaldigunawanyusuf/NusaSense.git
   cd NusaSense
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Note: For local development, `DATABASE_URL` is set to point to a local SQLite file (`file:./dev.db`).*

4. **Initialize Database:**
   Apply the Prisma schema to generate the local SQLite database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

---

## 2. Project Structure

NusaSense uses the **Next.js App Router** architecture. Here are the key directories:

- `src/app/`: Contains all routing logic.
  - `(auth)/login/`: The authentication UI.
  - `api/`: Backend API routes (NextAuth, User Settings, Watchlist).
  - `app/`: The authenticated application dashboard (Screener, Market, Watchlist, Profile).
- `src/components/`: Reusable React components.
  - `ui/`: Design system components (Buttons, Modals, Inputs).
  - `features/`: Complex business logic components (SettingsManager, Screener).
  - `layout/`: Structural components (AppHeader, BottomNav, ProtectedRoute).
- `src/lib/`: Utility functions and global state.
  - `store/useAppStore.ts`: Zustand global state management.
  - `prisma.ts`: Singleton instance of the Prisma Client.
- `prisma/`: Database schema and migrations.
- `docs/`: Extensive project documentation.

---

## 3. Key Concepts & Workflows

### Authentication
We use `NextAuth.js` (`Auth.js`) for session management. 
- **Provider:** Configured in `src/app/api/auth/[...nextauth]/route.ts`.
- **Protection:** Routes under `/app` are protected by the `ProtectedRoute` component, which redirects unauthenticated users to `/login`.

### Database ORM (Prisma)
Any changes to the database structure must be made in `prisma/schema.prisma`. 
After making a change, run:
```bash
npx prisma db push
npx prisma generate
```

### State Management
We use a hybrid approach:
1. **Server State (API):** Fetched via native `fetch` inside `useEffect` or React Query (if adopted later).
2. **Client State (Zustand):** Managed in `useAppStore`. We use the `DataHydrator` component to sync backend database records (like Watchlist) into the Zustand store upon successful login.

---

## 4. Contributing Guidelines

1. **Branching Strategy:** 
   - Use `main` for production-ready code.
   - Create feature branches (e.g., `feat/add-new-screener`) for development.
2. **Commit Messages:** 
   - Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`.
3. **Styling:** 
   - Use Tailwind CSS utility classes. 
   - Avoid writing custom CSS in `globals.css` unless necessary (e.g., for complex animations or base theme variables).

Happy coding! 🚀
