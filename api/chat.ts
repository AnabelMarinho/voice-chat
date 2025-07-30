export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), { status: 405 });
  }

  const { pergunta } = await req.json();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://chat.online.vercel.app/',
      'X-Title': 'Chat Online'
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [{ role: 'user', content: pergunta }]
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify({ resposta: data.choices[0].message.content }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
