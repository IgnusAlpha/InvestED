import { Pool } from 'pg';

export type SubmissionRow = {
  timestamp: string;
  date: string;
  weekday: string;
  homeroom: string;
  score: number;
  totalQuestions: number;
  percentageCorrect: string;
};

const globalForPg = globalThis as typeof globalThis & {
  investedPgPool?: Pool;
};

function getPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('Missing DATABASE_URL.');
  }

  if (!globalForPg.investedPgPool) {
    globalForPg.investedPgPool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }

  return globalForPg.investedPgPool;
}

let initialized = false;

async function ensureTable() {
  if (initialized) return;

  const pool = getPool();

  await pool.query(`
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

    CREATE TABLE IF NOT EXISTS page_visits (
      id BIGSERIAL PRIMARY KEY,
      date_label TEXT NOT NULL,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  initialized = true;
}

export async function insertPageVisit(dateLabel: string, userAgent: string) {
  await ensureTable();
  const pool = getPool();
  await pool.query(
    `INSERT INTO page_visits (date_label, user_agent) VALUES ($1, $2)`,
    [dateLabel, userAgent],
  );
}

export async function insertQuizSubmission(row: SubmissionRow) {
  await ensureTable();

  const pool = getPool();

  await pool.query(
    `
      INSERT INTO quiz_submissions (
        timestamp_utc,
        date_label,
        weekday,
        homeroom,
        score,
        total_questions,
        percentage_correct
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [row.timestamp, row.date, row.weekday, row.homeroom, row.score, row.totalQuestions, row.percentageCorrect],
  );
}
