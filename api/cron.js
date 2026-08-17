import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Missing Supabase Environment Variables." });
    }
    if (!geminiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY." });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`;

    const today = new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const prompt = `Today's real date is ${today}. Using Google Search, find 5 REAL, CURRENTLY OPEN Indian government job notifications (Central/State/Telangana/Andhra Pradesh) with application deadlines that have NOT yet passed as of today.

Do not invent or recall old notifications from memory. Only include jobs you can verify are currently open for applications right now, based on actual search results.

Return ONLY a strict JSON array (no markdown, no extra text) where each object has exactly these fields:
- title_en (string): Job title in English
- title_te (string): Job title in Telugu
- organization (string): Organization name (e.g. TSPSC, SSC, RRB, UPSC, SBI)
- vacancies (string): Number of vacancies
- qualification (string): Required qualification
- salary (string): Salary range
- last_date (string): Application deadline (must be a date on or after ${today})
- sub_category (string): 'Central Govt', 'State PSC', 'Banking', or 'Railway'
- is_hot (boolean): true or false`;

    const aiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok) {
      return res.status(500).json({ error: "Gemini API Request Failed", details: aiData });
    }

    const rawText = aiData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;

    let parsedUpdates;
    try {
      parsedUpdates = JSON.parse(rawText || "[]");
    } catch (parseErr) {
      return res.status(500).json({
        error: "Failed to parse Gemini response as JSON",
        rawResponse: rawText,
        parseError: parseErr.message
      });
    }

    if (!Array.isArray(parsedUpdates)) {
      return res.status(500).json({
        error: "Gemini response was not a JSON array",
        rawResponse: rawText
      });
    }

    let insertedCount = 0;
    const insertErrors = [];

    for (const item of parsedUpdates) {
      const { error: insertError } = await supabase.from('updates').insert([
        {
          category: 'job',
          sub_category: item.sub_category || 'Central Govt',
          title_en: item.title_en || 'Latest Job Notification',
          title_te: item.title_te || 'తాజా ఉద్యోగ నోటిఫికేషన్',
          organization: item.organization || 'Govt Board',
          vacancies: String(item.vacancies || '100'),
          qualification: item.qualification || 'Any Degree',
          salary: item.salary || 'As per notification',
          last_date: item.last_date || 'Coming Soon',
          is_hot: Boolean(item.is_hot)
        }
      ]);

      if (insertError) {
        insertErrors.push(insertError.message);
      } else {
        insertedCount++;
      }
    }

    return res.status(200).json({
      success: true,
      generated: parsedUpdates.length,
      inserted: insertedCount,
      insertErrors,
      updates: parsedUpdates
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
