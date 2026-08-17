 import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Missing Supabase Environment Variables in Vercel settings." });
    }
    if (!geminiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY in Vercel settings." });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Prompt Gemini to generate structured, realistic notifications
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    const prompt = `Generate 5 latest Indian government job notifications (Central/State/Telangana/Andhra Pradesh) in a strict JSON array format.
Each object MUST have:
- title_en (string): Job title in English
- title_te (string): Job title translated to Telugu
- organization (string): Organization name (e.g. TSPSC, SSC, RRB, UPSC, SBI)
- vacancies (string): Total number of vacancies
- qualification (string): Required qualification (e.g. Any Degree, 10th Pass, B.Tech)
- salary (string): Salary range
- last_date (string): Application deadline
- sub_category (string): 'Central Govt', 'State PSC', 'Banking', or 'Railway'
- is_hot (boolean): true or false`;

    const aiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok) {
      return res.status(500).json({ error: "Gemini API Request Failed", details: aiData });
    }

    const rawText = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedUpdates = JSON.parse(rawText || "[]");

    // Insert into Supabase
    for (const item of parsedUpdates) {
      await supabase.from('updates').insert([
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
    }

    return res.status(200).json({ success: true, inserted: parsedUpdates.length, updates: parsedUpdates });
  } catch (err) {
    console.error("Cron Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
