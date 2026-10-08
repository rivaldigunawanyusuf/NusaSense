# 🌟 NusaSense Business & Feature Specification

## 1. Product Vision
NusaSense is designed to be the premier AI-driven market intelligence platform for retail investors trading on the Indonesia Stock Exchange (IDX). The platform combats "cognitive bias" and FOMO by delivering purely fundamental, objective, and noise-free alerts. 

## 2. Core Features

### A. Market Overview (The "Macro" View)
- **Real-Time IDX Indices:** Displays live performance of IHSG and other sectoral indices.
- **Top Movers:** Tracks top gainers, losers, and most active stocks by volume/value.
- **Why it matters for business:** Keeps users engaged with the daily market heartbeat without overwhelming them.

### B. Screener (The "Discovery" Engine)
- **Fundamental Deep Dive:** Allows users to filter IDX companies based on robust financial metrics (P/E, PBV, ROE, Debt-to-Equity).
- **Sectors API Integration:** Fetches accurate, institutional-grade data directly from the Sectors API.
- **Why it matters for business:** This is a premium feature. Advanced screening criteria could later be monetized via a subscription tier (NusaSense Pro).

### C. Watchlist (The "Personalization" Layer)
- **Targeted Tracking:** Users can star/bookmark up to 5 specific stocks to monitor closely.
- **Relational Storage:** Synced securely to the PostgreSQL backend via Prisma.
- **Why it matters for business:** Increases user retention by providing personalized experiences across multiple devices.

### D. Automated Alerts (The "Retention" Hook)
- **Anomaly Detection:** Powered by `n8n` background workers that run daily scans (e.g., 06:00 WIB) on Watchlist items.
- **Multi-Channel Delivery:** 
  - **Telegram Bot Integration:** Sends instant alerts directly to the user's Telegram app.
  - **Browser Push Notifications:** Delivers alerts to desktop and mobile browsers.
- **Why it matters for business:** Push notifications and messaging are the strongest drivers for Daily Active Users (DAU). It brings users back to the app effortlessly.

### E. Profile & Security
- **NextAuth Authentication:** Frictionless onboarding via Google OAuth and Credential logins.
- **Data Privacy:** Users have complete control over their alert delivery settings (Telegram Chat ID bindings).
- **OWASP Compliance:** Built-in protection against XSS, CSRF, and SQL Injection.

## 3. Future Monetization Opportunities (Phase 2+)
- **NusaSense Pro:** Expand Watchlist limit from 5 to Unlimited.
- **AI-Powered Insights:** Introduce a Gemini/OpenAI wrapper that translates complex fundamental anomalies into conversational human advice.
- **Real-Time Alerts:** Upgrade from daily cron jobs to intraday event-driven notifications.
