import type { NextApiRequest, NextApiResponse } from 'next';
import { insertPageVisit } from '@/lib/postgres';
import { getCurrentDateParts } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date } = getCurrentDateParts();
    const userAgent = (req.headers['user-agent'] ?? 'unknown').slice(0, 300);
    await insertPageVisit(date, userAgent);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not track visit.' });
  }
}
