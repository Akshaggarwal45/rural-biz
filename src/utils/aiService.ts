export async function askBusinessAssistant(params: {
  query: string;
  location: string;
  state: string;
  capital: number;
}): Promise<string> {
  const res = await fetch('/api/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
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

export async function askSchemeAssistant(params: {
  query: string;
  location: string;
  state: string;
  businessType: string;
}): Promise<string> {
  const res = await fetch('/api/schemes/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
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
