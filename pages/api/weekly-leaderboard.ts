import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const globalForPg = globalThis as typeof globalThis & { investedPgPool?: Pool };

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Missing DATABASE_URL.');
  if (!globalForPg.investedPgPool) {
    globalForPg.investedPgPool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  return globalForPg.investedPgPool;
}

export type WeeklyEntry = {
  homeroom: string;
  totalScore: number;
  submissions: number;
  rank: number;
};

function getMaltaWeekStart(): string {
  const now = new Date();
  const maltaNow = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Malta' }),
  );
  const day = maltaNow.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;
  maltaNow.setHours(0, 0, 0, 0);
  maltaNow.setDate(maltaNow.getDate() - daysFromMonday);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${maltaNow.getFullYear()}-${pad(maltaNow.getMonth() + 1)}-${pad(maltaNow.getDate())}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pool = getPool();
    const weekStart = getMaltaWeekStart();

    const result = await pool.query<{ homeroom: string; total_score: string; submissions: string }>(
      `
        SELECT
          homeroom,
          SUM(score) AS total_score,
          COUNT(*) AS submissions
        FROM quiz_submissions
        WHERE created_at >= $1::date
        GROUP BY homeroom
        ORDER BY total_score DESC, submissions DESC
      `,
      [weekStart],
    );

    const entries: WeeklyEntry[] = result.rows.map((row, index) => ({
      homeroom: row.homeroom,
      totalScore: Number(row.total_score),
      submissions: Number(row.submissions),
      rank: index + 1,
    }));

    return res.status(200).json({ entries, weekStart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not fetch weekly leaderboard.' });
  }
}
