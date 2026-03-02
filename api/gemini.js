export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda není povolena' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }

    try {
        const { parts, systemPrompt, useJson } = req.body;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // Správný formát pro Gemini API
        const formattedParts = parts.map(p => {
            if (typeof p === 'string') return { text: p };
            if (p.text) return { text: p.text };
            if (p.inlineData) return { inlineData: p.inlineData };
            return p;
        });

        const payload = {
            contents: [{ role: "user", parts: formattedParts }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        if (useJson) {
            payload.generationConfig = { responseMimeType: "application/json" };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Chyba od Google API' });
        }

        return res.status(200).json({ text: data.candidates[0].content.parts[0].text });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


