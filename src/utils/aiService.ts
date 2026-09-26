export async function askBusinessAssistant(params: {
  query: string;
  location: string;
  state: string;
  capital: number;
}): Promise<string> {
  let res: Response;
  try {
    res = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.status === 404) {
      res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
    }
  } catch (e: any) {
    throw new Error('Network error connecting to API');
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Vercel API 404: Make sure "api/assistant.ts" is committed to your repository.');
    }
    if (data?.error === 'MISSING_API_KEY') {
      throw new Error('MISSING_API_KEY');
    }
    throw new Error(data?.message || `Server returned error ${res.status}`);
  }

  if (data?.response) {
    return data.response;
  }
  throw new Error('EMPTY_AI_RESPONSE');
}
