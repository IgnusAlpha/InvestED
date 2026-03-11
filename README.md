# InvestED Club Quiz Website

Production-ready daily quiz website for **InvestED Club** using **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Recharts**, and **Railway Postgres**.

## Features
- premium dark mobile-first design
- landing page with animated background
- quiz entry with homeroom + daily access code
- one active quiz configured from a single file
- one-question-at-a-time flow with instant feedback
- animated floating progress graph reacting to answers
- live homeroom leaderboard panel
- end screen with score, percentage, and confetti
- Railway Postgres logging for every submission
- simple daily updates via `data/quizData.ts`
- deployable on Railway or Vercel

## Project Structure
```text
components/
  AnswerOption.tsx
  FloatingGraph.tsx
  HeroBackground.tsx
  Layout.tsx
  LiveLeaderboard.tsx
  ProgressBar.tsx
data/
  quizData.ts
lib/
  liveStore.ts
  postgres.ts
  utils.ts
pages/
  api/live-score.ts
  api/submit.ts
  _app.tsx
  index.tsx
styles/
  globals.css
```

## 1) Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`

## 2) How to Update the Daily Quiz
Edit `data/quizData.ts`.

Change these fields:
- `quizId`
- `dateLabel`
- `accessCode`
- `homerooms` if needed
- `questions`

Each question uses:
```ts
{
  id: 'q1',
  prompt: 'Question text',
  choices: ['A', 'B', 'C', 'D'],
  correctIndex: 1,
  explanation: 'Optional explanation shown after answering'
}
```

## 3) How to Change the Daily Access Code
In `data/quizData.ts`, update:
```ts
accessCode: 'NEWCODE'
```

## 4) How to Reset for a New Day
Replace the quiz content in `data/quizData.ts` and redeploy.

## 5) Connect Railway Postgres
Add a PostgreSQL database in the same Railway project as your web app.

Railway usually provides a `DATABASE_URL` variable automatically.

Add this environment variable to your app service if it is not already present:

```bash
DATABASE_URL=postgresql://...
```

The app will automatically create this table on first submission:

```sql
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id BIGSERIAL PRIMARY KEY,
  timestamp_utc TEXT NOT NULL,
  date_label TEXT NOT NULL,
  weekday TEXT NOT NULL,
  homeroom TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage_correct TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 6) Redeploy After Environment Changes
If you add or change `DATABASE_URL`, redeploy the Railway service.

## Notes
- The app validates the access code before quiz start and again on result submission.
- Results are inserted into Postgres as one row per completed submission.
- The graph is motivational only and does not affect scoring.
- For best reliability, keep one active quiz in `data/quizData.ts`.
- The current live leaderboard preview uses in-memory server state. For stronger production live syncing later, it can also be moved into Postgres.
