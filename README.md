# Testify

A full-stack testimonial collection platform where businesses can collect customer testimonials, moderate submissions, and embed approved testimonials on any website using a customizable JavaScript widget. The platform also includes AI-powered customer insights generated from approved reviews.

---

# Features

* Public testimonial submission form
* Admin moderation dashboard (Approve / Reject)
* Public testimonial wall
* Spam detection
* API rate limiting
* Duplicate email prevention
* Embeddable JavaScript widget
* Widget customization (accent color, pagination, theme)
* Light / Dark / Auto theme support
* Lazy image loading
* Responsive design
* AI-generated customer summary
* AI-generated insight tags

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS

## Backend

* Express
* TypeScript
* PostgreSQL (Supabase)

## AI

* Google Gemini

---

# Getting Started

## Clone the repository

```bash
git clone <repository-url>
cd testify
```

---

## Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# Environment Variables

## Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Backend (`backend/.env`)

```env
PORT=5000

DATABASE_URL=postgresql://postgres:[password]@db.chgqborkaasaclyabqgm.supabase.co:5432/postgres

GEMINI_API_KEY=your_google_gemini_api_key

FRONTEND_URL=http://localhost:5173
```

---

# Run the Project

## Start Backend

```bash
cd backend
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# Embeddable Widget

Include the widget script on any website.

```html
<script
    src="https://your-backend-domain/widget.js"
></script>

<div
    id="testimonial-widget"
    data-limit="6"
    data-theme="light"
    data-accent="#4F46E5"
></div>
```

```html

for now it is deployed to vercel so you can insert below script to any website it will show testimonials
<script src="https://testimonial-platform-one.vercel.app/widget.js"></script>

```

### Available Options

| Attribute     | Description                | Default   |
| ------------- | -------------------------- | --------- |
| `data-limit`  | Testimonials per page      | `10`      |
| `data-theme`  | `light`, `dark`, or `auto` | `light`   |
| `data-accent` | Primary accent color       | `#4F46E5` |

---

# AI Customer Insights

Every time the total number of approved testimonials reaches a multiple of **5**, the platform automatically generates fresh customer insights.

The AI samples:

* 4 newest testimonials
* 3 middle testimonials
* 3 oldest testimonials

Gemini then generates:

* Overall customer summary
* Top customer insight tags

The generated insights are stored in the database and served directly through the widget without requiring AI requests during page loads.

---

# Project Structure

```
testimonial-platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   └── testimonial.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── TestimonialCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Submit.tsx
│   │   │
│   │   ├── types/
│   │   │   └── testimonial.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── public/
│   │   └── widget.js
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── testimonial.controller.ts
│   │   │   └── widget.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── rateLimit.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── testimonial.routes.ts
│   │   │   └── widget.routes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── testimonial.service.ts
│   │   │   ├── summary.service.ts
│   │   │   └── widget.service.ts
│   │   │
│   │   ├── utils/
│   │   │   └── spam.ts
│   │   │
│   │   ├── types/
│   │   │   └── testimonial.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── JOURNAL.md
```

---

# Future Improvements

* Carousel widget layout
* Additional widget themes
* Widget analytics
* Multi-tenant support
* Verified purchase badges
* Image upload/storage
* Search and filtering
* AI sentiment analysis
* Review analytics dashboard
* Localization support
