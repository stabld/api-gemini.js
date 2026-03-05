import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda není povolena' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Neplatný e-mail.' });
    }

    const sql = neon(process.env.DATABASE_URL);

    try {
        // Vytvoř tabulku pokud neexistuje
        await sql`
            CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `;

        // Zkus vložit email - pokud už existuje, vyhodí chybu
        await sql`
            INSERT INTO subscribers (email) VALUES (${email.toLowerCase().trim()})
        `;

        return res.status(200).json({ success: true });

    } catch (err) {
        // Kód 23505 = duplicate key = email už existuje
        if (err.code === '23505') {
            return res.status(409).json({ duplicate: true });
        }
        console.error('DB chyba:', err);
        return res.status(500).json({ error: 'Chyba serveru.' });
    }
}
