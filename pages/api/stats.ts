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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pool = getPool();

    const [visitsTotal, visitsToday, visitsPerDay, submissionsTotal, submissionsToday] = await Promise.all([
      pool.query<{ count: string }>(`SELECT COUNT(*) AS count FROM page_visits`),
      pool.query<{ count: string }>(`SELECT COUNT(*) AS count FROM page_visits WHERE created_at >= CURRENT_DATE`),
      pool.query<{ date_label: string; count: string }>(
        `SELECT date_label, COUNT(*) AS count FROM page_visits GROUP BY date_label ORDER BY date_label DESC LIMIT 14`,
      ),
      pool.query<{ count: string }>(`SELECT COUNT(*) AS count FROM quiz_submissions`),
      pool.query<{ count: string }>(`SELECT COUNT(*) AS count FROM quiz_submissions WHERE created_at >= CURRENT_DATE`),
    ]);

    return res.status(200).json({
      visits: {
        total: Number(visitsTotal.rows[0]?.count ?? 0),
        today: Number(visitsToday.rows[0]?.count ?? 0),
        perDay: visitsPerDay.rows.map((r) => ({ date: r.date_label, count: Number(r.count) })),
      },
      submissions: {
        total: Number(submissionsTotal.rows[0]?.count ?? 0),
        today: Number(submissionsToday.rows[0]?.count ?? 0),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not fetch stats.' });
  }
}
