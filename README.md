<div align="center">
  <img src="./public/logo-raw.png" alt="Coffee Time Logo" width="150" style="border-radius: 50%; margin-bottom: 20px;"/>
  
  # ☕ Premium Coffee Ordering Experience

  **A full-stack, production-ready web application designed for a luxury coffee shop.**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)

</div>

<br />

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Design Philosophy](#-design-philosophy)

---

## 🚀 About the Project

**Coffee Time** is a high-end, responsive web application offering a seamless digital ordering experience for a luxury coffee brand. Blending aesthetics with performance, the platform leverages a modern tech stack to deliver dynamic UI interactions, a fully functional shopping cart, and a robust data-driven backend.

---

## ✨ Key Features

- **Premium UI/UX:** High-end, luxury design utilizing a custom Maroon (`#4A0D16`) and Orange (`#F5A623`) theme.
- **Fluid Micro-interactions:** Handcrafted animations using **Framer Motion** (smooth `easeOut` curves, staggered grid entrances, physics-based hover lifts).
- **Interactive Cart & Checkout:** Context-based global state management featuring an animated, glassmorphism side drawer.
- **Robust Full-Stack Architecture:** A dedicated **Express.js** REST API serves live product and order data to the React frontend.
- **Data Visualization & Mapping:** Integrated **Recharts** for analytics and **Leaflet** for interactive store location mapping.
- **Secure Database Operations:** Powered by **Neon PostgreSQL**, handling structured products, user orders, and itemized receipts.
- **Seamless Page Transitions:** Elegant cross-page routing fades and upward slides to maintain user immersion.
- **Responsive by Design:** Flawless scaling across mobile, tablet, laptop, and desktop viewports.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM v7
- **Maps:** Leaflet & React-Leaflet
- **Charts:** Recharts
- **Icons:** Lucide React & React Icons

### **Backend & Database**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon Serverless)
- **Database Driver:** `pg` (node-postgres)
- **External Services:** Firebase

---

## 🚦 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (v18.0.0 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohithnayak42/Coffee-time.git
   cd Coffee-time
   ```

2. **Install dependencies**
   This command installs all required packages for both the frontend client and the backend server.
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your necessary connection strings (e.g., your Neon PostgreSQL database URI, Firebase config).

4. **Initialize the Database**
   Connect to your remote PostgreSQL instance and seed it with the initial premium product menu:
   ```bash
   node server/seed.js
   ```

5. **Run the Application**
   The project utilizes `concurrently` to spin up both the Vite frontend development server and the Express backend API simultaneously.
   ```bash
   npm run dev
   ```

> **Frontend Client:** http://localhost:5173  
> **Backend API:** http://localhost:5000

---

## 📂 Project Structure

```text
Coffee-time/
├── public/                 # Static assets (logos, raw images)
├── server/                 # Node.js + Express Backend
│   ├── db.js               # PostgreSQL connection pool configuration
│   ├── index.js            # Express API route handlers
│   └── seed.js             # Database migration and seeding script
├── src/                    # React Frontend Source
│   ├── components/         # Reusable UI components (Buttons, Cards, Modals)
│   ├── context/            # React Context Providers (e.g., CartContext)
│   ├── data/               # Static and mock data definitions
│   ├── assets/             # Internal application assets
│   ├── App.jsx             # Main application routing and transition logic
│   ├── main.jsx            # React application entry point
│   └── index.css           # Global Tailwind and custom CSS styles
├── package.json            # Project metadata, scripts, and dependencies
└── tailwind.config.js      # Tailwind CSS theme and design token configuration
```

---

## 🗄️ Database Schema

The application relies on three core tables to manage the business logic:

- **`products`**: Stores inventory data including coffee items, desserts, and bakery goods. Uses unique string identifiers (e.g., `hc-1`).
- **`orders`**: Records customer checkout information including name, delivery address, selected payment method, and total cost.
- **`order_items`**: A relational mapping table that links individual products and their quantities to specific `orders`.

---

## 🎨 Design Philosophy

The application deliberately avoids generic, "robotic" animations. All motion and layout interactions are intentionally handcrafted to feel organic and premium:
- **Depth & Elevation:** Hover states use `hover:-translate-y-1.5` for a subtle, physical 6px lift.
- **Global Transitions:** Page changes utilize a smooth 400ms linear fade-and-slide `easeOut`.
- **Progressive Disclosure:** Grid elements and lists enter sequentially with an ultra-tight `80ms` stagger, making the application feel highly responsive and dynamic.

---

<div align="center">
  <i>Crafted with passion for coffee and code.</i>
</div>
