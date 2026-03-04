# AI Movie Insight Builder

A full-stack web application that lets users enter an IMDb Movie ID and receive comprehensive movie insights — including cast, plot, audience reviews, and AI-powered sentiment analysis using Google Gemini.

---

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** – animations
- **Axios** – API requests
- **React Icons** / **Lucide React**

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **Axios** – HTTP requests
- **Cheerio** – IMDb review scraping
- **Google Gemini API** – AI sentiment analysis
- **OMDb API** – Movie metadata
- **dotenv** + **CORS**

---

## Project Structure

```
project2/
├── backend/
│   ├── src/
│   │   ├── config/env.ts          # Environment config
│   │   ├── controllers/
│   │   │   └── movieController.ts # Request handler
│   │   ├── routes/
│   │   │   └── movieRoutes.ts     # API routes
│   │   ├── services/
│   │   │   ├── movieService.ts    # OMDb API + mock fallback
│   │   │   ├── reviewService.ts   # Cheerio review scraper
│   │   │   └── aiService.ts       # Gemini AI analysis
│   │   ├── utils/
│   │   │   ├── errorHandler.ts    # Global error middleware
│   │   │   └── validator.ts       # IMDb ID validation
│   │   └── server.ts              # Express entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── layout.tsx             # Root layout + Navbar
    │   ├── page.tsx               # Home page (Search)
    │   ├── globals.css
    │   └── movie/[id]/page.tsx    # Movie details page
    ├── components/
    │   ├── Navbar.tsx             # Nav + dark/light toggle
    │   ├── SearchBar.tsx
    │   ├── MovieCard.tsx
    │   ├── MovieDetails.tsx
    │   ├── ReviewList.tsx
    │   ├── ReviewCard.tsx         # Sentiment-highlighted reviews
    │   ├── AISummaryCard.tsx
    │   ├── LoaderSkeleton.tsx
    │   ├── ErrorMessage.tsx
    │   └── GlassCard.tsx
    ├── hooks/
    │   └── useMovieSearch.ts      # Search + validation hook
    ├── services/
    │   └── movieService.ts        # Axios API calls
    ├── types/
    │   └── movie.ts               # TypeScript interfaces
    ├── .env.local                 # Frontend env vars
    ├── package.json
    └── tsconfig.json
```

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd project2
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
OMDB_API_KEY=your_omdb_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Running the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App opens on http://localhost:3000
```

---

## API Reference

### `GET /api/movie/:imdbId`

Fetch complete movie insights.

**Example:**
```
GET http://localhost:5000/api/movie/tt0133093
```

**Response:**
```json
{
  "title": "The Matrix",
  "poster": "https://...",
  "year": "1999",
  "rating": "8.7",
  "cast": ["Keanu Reeves", "Laurence Fishburne"],
  "plot": "...",
  "reviews": [
    { "author": "MovieFan99", "rating": 9, "comment": "Amazing!" }
  ],
  "aiSummary": "Audiences praise the groundbreaking visuals...",
  "sentiment": "Positive",
  "insights": [
    { "type": "Positive", "text": "Stunning visual effects" },
    { "type": "Criticism", "text": "Pacing issues in the second act" }
  ]
}
```

### `GET /health`
Returns server status.

---

## Supported Movies (Mock Fallback)

When the OMDb API key is not provided, these IMDb IDs return built-in data:

| IMDb ID | Movie |
|---|---|
| `tt0133093` | The Matrix (1999) |
| `tt0816692` | Interstellar (2014) |
| `tt0111161` | The Shawshank Redemption (1994) |
| `tt0468569` | The Dark Knight (2008) |
| `tt4154796` | Avengers: Endgame (2019) |
| `tt1375666` | Inception (2010) |
| `tt0145487` | Spider-Man 2 (2004) |
| `tt0110912` | Pulp Fiction (1994) |
| `tt0108052` | Schindler's List (1993) |
| `tt0137523` | Fight Club (1999) |
| `tt0076759` | Star Wars: A New Hope (1977) |

---

## Getting API Keys

### OMDb API (Movie Data)
1. Visit [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Select **FREE** tier
3. Verify your email and copy the key

### Google Gemini API (AI Analysis)
1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Create a new API key (free tier available)

---

## Features

- IMDb ID Search with real-time format validation
- Movie Details — title, year, rating, cast, plot
- AI Sentiment Analysis — powered by Google Gemini
- Sentiment Badges — Positive / Mixed / Negative
- Audience Reviews with color-coded sentiment highlights
- Loading Skeletons and graceful Error States
- Dark / Light Mode toggle in Navbar
- Share Link button on movie pages
- Fully Responsive design
- Glassmorphism UI with Framer Motion animations

---

## Deployment

### Backend (Render / Railway / Heroku)
- Set environment variables in your platform dashboard
- Build command: `npm run build`
- Start command: `node dist/server.js`

### Frontend (Vercel)
- Connect your GitHub repo
- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
- Vercel auto-detects Next.js

---

## License
MIT
