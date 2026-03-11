# InvestED Club Quiz Website

Production-ready daily quiz web app for **InvestED Club** using **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Recharts**, and **Google Sheets API**.

## Features
- premium dark mobile-first design
- landing page with animated background
- quiz entry with homeroom + daily access code
- one active quiz configured from a single file
- one-question-at-a-time flow with instant feedback
- animated floating progress graph reacting to answers
- end screen with score, percentage, and confetti
- Google Sheets logging for every submission
- simple daily updates via `data/quizData.ts`
- deployable on Vercel

## Project Structure
```text
components/
  AnswerOption.tsx
  FloatingGraph.tsx
  HeroBackground.tsx
  Layout.tsx
  ProgressBar.tsx
data/
  quizData.ts
lib/
  googleSheets.ts
  utils.ts
pages/
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
- `homerooms` (if needed)
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
The same site URL can stay unchanged.

## 4) How to Reset for a New Day
Just replace the quiz content in `data/quizData.ts` and redeploy on Vercel.

That is the only daily reset needed.

## 5) Connect Google Sheets
Create a Google Sheet with headers in row 1:
```text
Timestamp | Date | Weekday | Homeroom | Score | Total Questions | Percentage Correct
```

### Create a Google service account
1. Open Google Cloud Console.
2. Create a project.
3. Enable the **Google Sheets API**.
4. Create a **Service Account**.
5. Generate a JSON key.
6. Share the Google Sheet with the service account email as an editor.

### Add environment variables in Vercel
Use these values from the service account JSON:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id
GOOGLE_SHEETS_RANGE=Sheet1!A:G
```

### Find Spreadsheet ID
In the Google Sheet URL:
```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
```

## 6) Deploy on Vercel
1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables above.
4. Click **Deploy**.

## Notes
- The app validates the access code before quiz start and again on result submission.
- Results are appended as new rows to the sheet.
- The graph is motivational only and does not affect scoring.
- For best reliability, keep the quiz file simple and only update one active quiz at a time.
