# NusaSense 🇮🇩

NusaSense is an AI-driven proactive market intelligence Progressive Web App (PWA) that detects fundamental stock anomalies in the Indonesian market (IHSG). Powered by the Sectors API, it automatically delivers noise-free push alerts and Telegram notifications to retail investors, helping to minimize cognitive bias in investment decisions.

![NusaSense Preview](public/icon.png)

## 🚀 Key Features
- **Screener & Anomaly Detection:** Deep fundamental analysis powered by the Sectors API.
- **Watchlist & User Settings:** Seamless user management stored in a relational database.
- **Cross-Platform PWA:** Optimized for mobile and desktop with offline support.
- **Automated Alerts:** Get notified via Telegram bot or Web Push Notifications.
- **Enterprise-Grade Security:** OWASP-compliant headers, strict CSP, and robust route protection.

## 🏗️ Architecture & Tech Stack

NusaSense is designed for independent self-hosting on a **Virtual Private Server (VPS)** to maximize control and achieve a zero-cost infrastructure footprint, migrating entirely away from serverless platforms like Vercel and Firebase.

- **Framework:** [Next.js (App Router)](https://nextjs.org/) with Server-Side Rendering (SSR).
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google OAuth & Credentials).
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) managed by [Prisma](https://www.prisma.io/) (SQLite for local development).
- **Data Pipeline:** [n8n](https://n8n.io/) for cron jobs and Telegram bot automation.
- **Web Server:** [Nginx](https://www.nginx.com/) acting as a reverse proxy.

## 🛠️ Local Development Setup

To test and develop NusaSense locally using SQLite:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup the Database (Prisma):**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 VPS Deployment (Production)

Deployment is managed via Docker Compose on Ubuntu/Debian. 

Ensure you have your `.env` configured with the correct `DATABASE_URL` pointing to your PostgreSQL instance, and use PM2 or Docker to run the Next.js production build (`npm run build && npm start`). Nginx will handle SSL and route traffic accordingly.
