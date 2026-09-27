import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MISSING_API_KEY', message: 'GEMINI_API_KEY is missing in Vercel Environment Variables.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { query, location, state, capital } = body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const ai = new GoogleGenAI({ apiKey });

    // EMI calculation helper
    const isEmiQuery = /\b(emi|loan|interest|installment|kist|repay|repayment|borrow|debt|tenure)\b/i.test(query);
    let emiText = '';
    if (isEmiQuery) {
      let amount = 0;
      const lakhMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lacs?|lac|l)/i);
      if (lakhMatch) amount = parseFloat(lakhMatch[1]) * 100000;
      else {
        const numMatch = query.match(/(?:rs\.?|inr|₹)?\s*(\d{4,8})/i);
        if (numMatch) amount = parseFloat(numMatch[1]);
      }
      let years = 5;
      const yrMatch = query.match(/(\d+)\s*(?:years?|yrs?|yr)/i);
      if (yrMatch) years = parseInt(yrMatch[1]);

      let rate = 9.5;
      const rateMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)/i);
      if (rateMatch) rate = parseFloat(rateMatch[1]);

      if (amount > 0) {
        const monthlyRate = rate / 12 / 100;
        const totalMonths = Math.round(years * 12);
        const emi = Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
        emiText = `[Calculated EMI: ₹${emi.toLocaleString('en-IN')}/mo on ₹${amount.toLocaleString('en-IN')} for ${years} yrs at ${rate}%]`;
      }
    }

    const systemPrompt = `You are the RuralBiz All-in-One Business & Financial Advisor.
You assist aspiring rural and semi-urban entrepreneurs across India.
Location: ${location || 'Rural'}, State: ${state || 'All India'}, Capital: ₹${Number(capital || 100000).toLocaleString('en-IN')}.
${emiText}

Respond dynamically and specifically to the user's question with actionable steps, real numbers, and official portals like jansamarth.in or kviconline.gov.in. Never output canned generic responses.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }] }]
    });

    return res.status(200).json({ response: response.text });
  } catch (err: any) {
    console.error('Serverless Gemini Error:', err);
    return res.status(500).json({ error: 'AI_ERROR', message: err?.message || 'Failed to generate response' });
  }
}
