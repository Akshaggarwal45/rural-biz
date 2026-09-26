import { GoogleGenAI } from '@google/genai';

export const getGeminiClient = (): GoogleGenAI | null => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
};

export const calculateEMIHelper = (text: string) => {
  const isEmiQuery = /\b(emi|loan|interest|installment|kist|repay|repayment|borrow|debt|tenure)\b/i.test(text);
  if (!isEmiQuery) return null;

  let amount = 0;
  const lakhMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lacs?|lac|l)/i);
  if (lakhMatch) {
    amount = parseFloat(lakhMatch[1]) * 100000;
  } else {
    const numMatch = text.match(/(?:rs\.?|inr|₹)?\s*(\d{4,8})/i);
    if (numMatch) amount = parseFloat(numMatch[1]);
  }

  let years = 5;
  const yrMatch = text.match(/(\d+)\s*(?:years?|yrs?|yr)/i);
  if (yrMatch) years = parseInt(yrMatch[1]);

  let rate = 9.5;
  const rateMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)/i);
  if (rateMatch) rate = parseFloat(rateMatch[1]);

  if (amount > 0) {
    const monthlyRate = rate / 12 / 100;
    const totalMonths = Math.round(years * 12);
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return {
      amount,
      years,
      rate,
      emi: Math.round(emi),
      totalPayment: Math.round(emi * totalMonths),
      totalInterest: Math.round((emi * totalMonths) - amount),
    };
  }
  return null;
};

export async function askBusinessAssistant(params: {
  query: string;
  location: string;
  state: string;
  capital: number;
}): Promise<string> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('MISSING_API_KEY');
  }

  const emiCalc = calculateEMIHelper(params.query);
  const cap = `₹${params.capital.toLocaleString('en-IN')}`;
  const systemPrompt = `You are the RuralBiz All-in-One Business & Financial Advisor.
You assist aspiring rural and semi-urban entrepreneurs across India.
Location: ${params.location}, State: ${params.state}, Capital: ${cap}.
${emiCalc ? `[Calculated EMI Data]: Loan: ₹${emiCalc.amount}, Tenure: ${emiCalc.years} yrs, Rate: ${emiCalc.rate}%, EMI: ₹${emiCalc.emi}/mo` : ''}

Respond dynamically and specifically to the user's inquiry with actionable steps and real figures. Never output canned templates.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${params.query}` }] }]
  });

  if (response.text) return response.text;
  throw new Error('EMPTY_AI_RESPONSE');
}

export async function askSchemeAssistant(params: {
  query: string;
  location: string;
  state: string;
  businessType: string;
}): Promise<string> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('MISSING_API_KEY');
  }

  const systemPrompt = `You are a verified government scheme expert for Indian rural micro-business.
Location: ${params.location}, State: ${params.state}, Sector: ${params.businessType}.
Provide real-time specific answers on PMEGP, Mudra, PMFME, PM Vishwakarma, NABARD, and official application portals.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${params.query}` }] }]
  });

  if (response.text) return response.text;
  throw new Error('EMPTY_AI_RESPONSE');
}
