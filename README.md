<div align="center">
  <img src="./public/logo-raw.png" alt="Coffee Time Logo" width="150"/>
  <h1>☕ Premium Coffee Ordering Experience</h1>
  <p>A full-stack, production-ready web application for a luxury coffee shop. Built with React, Vite, Framer Motion, TailwindCSS, Express.js, and PostgreSQL.</p>
</div>

---

## ✨ Features

- **Premium UI/UX:** High-end, luxury design using a Maroon (`#4A0D16`) and Orange (`#F5A623`) theme.
- **Glassmorphism & Micro-interactions:** Fluid animations using Framer Motion (`easeOut` curves, staggered grid entrances, 6px hover lifts).
- **Full-Stack Architecture:** Express.js backend serving live data to a React frontend.
- **Database Driven:** Powered by Neon PostgreSQL with fully structured `products`, `orders`, and `order_items` tables.
- **Dynamic Shopping Cart:** Context-based global cart state with an animated glassmorphism side drawer.
- **Seamless Page Transitions:** Elegant cross-page navigation fades and upward slides.
- **Responsive Design:** Flawless scaling across mobile, tablet, laptop, and desktop.

## 🛠️ Technology Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- node-postgres (`pg`)
- Neon Serverless Postgres

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohithnayak42/Coffee-time.git
   cd Coffee-time
   ```

2. **Install dependencies:**
   This command installs dependencies for both the frontend (React) and the backend server.
   ```bash
   npm install
   ```

3. **Database Setup:**
   The project connects to a remote Neon PostgreSQL database. To initialize the database and seed it with the premium product menu, run the seed script:
   ```bash
   node server/seed.js
   ```

### Running the Application

This project uses `concurrently` to run both the Vite frontend and Express backend simultaneously with a single command.

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 📂 Project Structure

```text
Coffee-time/
├── public/                 # Static assets (images, logos)
├── server/                 # Express.js Backend
│   ├── db.js               # PostgreSQL connection pool
│   ├── index.js            # Express API routes
│   └── seed.js             # Database migration and seeding script
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context (e.g., CartContext)
│   ├── data/               # Static/Mock data definitions
│   ├── assets/             # Internal assets
│   ├── App.jsx             # Main application routing and transitions
│   ├── index.css           # Global Tailwind styles
│   └── main.jsx            # Entry point
├── package.json            # Scripts and dependencies
└── tailwind.config.js      # Tailwind configuration
```

## 🗄️ Database Schema

- **`products`**: Stores coffee items, desserts, and bakery goods. Uses string identifiers (e.g., `hc-1`).
- **`orders`**: Stores customer checkout information (name, address, payment method) and totals.
- **`order_items`**: Maps individual products and quantities to specific orders.

## 🎨 UI/UX Design Decisions

The application completely avoids default, "robotic" animations. All motion is intentionally handcrafted:
- **Card Hover:** `hover:-translate-y-1.5` for a subtle, physical 6px lift.
- **Transitions:** Global page transitions use a 400ms linear fade-and-slide `easeOut`.
- **Staggering:** Grid elements enter sequentially with an ultra-tight `80ms` stagger to feel responsive and fast.

---
<div align="center">
  <i>Crafted with passion for coffee and code.</i>
</div>
