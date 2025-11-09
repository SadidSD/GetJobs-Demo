This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Backend API (Jobs & Talents)

This project includes backend API routes to power two flows:
- Candidate submits skills → AI suggests jobs with match %
- Recruiter submits job requirements → AI suggests talents with match %

### Endpoints

- `POST /api/jobs/suggest`
  - Request JSON: `{ "skills": ["react", "typescript", "tailwind"] }`
  - Response JSON: `{ "jobs": [{ "id": "...", "title": "...", "description": "...", "skills": ["..."], "match": 87 }] }`

- `POST /api/talents/suggest`
  - Request JSON: `{ "requirements": ["node", "express", "postgresql"] }`
  - Response JSON: `{ "talents": [{ "id": "...", "name": "...", "skills": ["..."], "match": 72 }] }`

### Matching Logic

Match percentage uses simple skill overlap (Jaccard index) implemented in `lib/matching.ts`.

### AI Provider Configuration

By default, the API returns mock suggestions to make development easy. To enable a real AI provider, set the following environment variables and provide endpoints that return the expected shapes:

- `AI_API_URL` – Base URL of your AI gateway (e.g., `https://your-ai-service`) with `/jobs` and `/talents` POST routes
- `AI_API_KEY` – Bearer token used for authentication

When set, the backend will `POST`:
- To `${AI_API_URL}/jobs` with body `{ skills: string[] }`, expecting `{ jobs: { title, description, skills[] }[] }`
- To `${AI_API_URL}/talents` with body `{ requirements: string[] }`, expecting `{ talents: { name, skills[] }[] }`

The server converts results into internal types and computes `match`.

### Client-side Usage Example

```ts
// Submit candidate skills and update dashboard
const submitSkills = async (skills: string[]) => {
  const res = await fetch('/api/jobs/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skills }),
  });
  const data = await res.json();
  // data.jobs: array of jobs with match percentage
};

// Submit recruiter requirements and update recruiter dashboard
const submitRequirements = async (requirements: string[]) => {
  const res = await fetch('/api/talents/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requirements }),
  });
  const data = await res.json();
  // data.talents: array of talents with match percentage
};
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
