import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import * as cheerio from 'cheerio';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  try {
    // 1. Fetch raw text from education news source
    const targetUrl = 'https://education.sakshi.com/en';
    const response = await fetch(targetUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const rawText = $('body').text().slice(0, 15000);

    // 2. Instruct Gemini to categorize all sections
    const prompt = `
      You are an expert education editor and career advisor.
      Analyze the raw educational news text below.
      Extract fresh items for: Jobs, Admit Cards, Results, and Daily Current Affairs.
      
      Return ONLY a JSON array of objects with this structure:
      [
        {
          "category": "job" | "admit_card" | "result" | "answer_key" | "current_affairs",
          "sub_category": "TSPSC" | "APPSC" | "SSC" | "Banking" | "Railway" | "Police" | "Teaching" | "General",
          "title_en": "English title",
          "title_te": "Telugu title",
          "organization": "Organization name",
          "vacancies": "Count or N/A",
          "qualification": "Eligibility or N/A",
          "salary": "Pay scale in INR or N/A",
          "last_date": "Last date / Exam date",
          "details_json": {
            "syllabus": "Key topics",
            "preparation_strategy": "Step-by-step strategy",
            "summary": "Brief explanation"
          },
          "apply_url": "Direct link or official portal",
          "is_hot": true
        }
      ]

      Raw Text: ${rawText}
    `;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const cleanedText = aiResponse.text.replace(/```json|```/g, '').trim();
    const items = JSON.parse(cleanedText);

    // 3. Insert items into Supabase
    const { error: dbError } = await supabase
      .from('updates')
      .insert(items);

    if (dbError) throw dbError;

    return res.status(200).json({ success: true, count: items.length });
  } catch (error) {
    console.error('Automation error:', error);
    return res.status(500).json({ error: error.message });
  }
}
