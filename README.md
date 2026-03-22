# VoiceForHelp - Frontend

Modern, SEO-optimized Next.js donation platform with transparency impact tracking.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Shadcn UI (Radix primitives)
- **Animations:** Framer Motion
- **Charts:** Recharts (admin dashboard)
- **State Management:** React Context
- **HTTP Client:** Axios

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
cd frontend
npm install
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── about/              # About Us
│   ├── impact/             # Our Impact
│   ├── help/               # How You Can Help
│   ├── donate/             # Donation page
│   ├── fast-donate/        # Quick anonymous donation
│   ├── volunteer/          # Volunteer signup
│   ├── videos/             # Impact videos gallery
│   ├── profile/            # User dashboard
│   ├── login/              # Login
│   ├── register/           # Register
│   ├── contact/            # Contact page
│   └── admin/              # Admin panel (dashboard, donors, videos, categories, volunteers)
├── components/
│   ├── ui/                 # Base UI components
│   ├── layout/             # Header, Footer
│   ├── home/               # Homepage sections
│   ├── donation/           # Donation form, UPI modal
│   ├── videos/             # Video grid, player
│   ├── profile/            # Donation history, my videos
│   ├── auth/               # Login, register forms
│   └── common/             # Shared components (Logo, StatsCard, etc.)
├── lib/                    # Utilities (api client, constants, helpers)
├── hooks/                  # Custom React hooks
├── services/               # API service functions
├── types/                  # TypeScript interfaces
└── context/                # Auth context provider
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, donors, videos, categories |
| `/about` | About the foundation |
| `/impact` | Impact gallery with stats |
| `/help` | Ways to contribute |
| `/donate` | Full donation form with UPI QR payment |
| `/fast-donate` | Quick anonymous donation |
| `/volunteer` | Volunteer signup |
| `/videos` | Impact video gallery |
| `/profile` | User dashboard |
| `/admin` | Admin dashboard with analytics charts |
| `/admin/donors` | Donor list with group date filtering |
| `/admin/videos` | Video upload and management |
| `/admin/categories` | Category CRUD |
| `/admin/volunteers` | Volunteer applications |

## Deployment to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository, select `frontend` as root directory
4. Set environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

## SEO

- Dynamic metadata per page
- OpenGraph & Twitter cards
- JSON-LD structured data (NGO schema)
- Dynamic sitemap.xml & robots.txt
- Semantic HTML headings
- Keywords: "donate for cows", "animal donation India", "cow feeding donation"
