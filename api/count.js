import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Metoda není povolena' });
    }

    const sql = neon(process.env.DATABASE_URL);

    try {
        const result = await sql`SELECT COUNT(*) as count FROM subscribers`;
        const count = parseInt(result[0].count);
        return res.status(200).json({ count });
    } catch (err) {
        return res.status(500).json({ count: 0 });
    }
}
