export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), { status: 405 });
  }

  try {
    const { pergunta } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env['OPENROUTER_API_KEY']}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://chat.online.vercel.app/',
        'X-Title': 'Chat Online'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: pergunta }]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Erro na API OpenRouter:', response.status, text);
      return new Response(JSON.stringify({ error: 'Erro na API OpenRouter' }), { status: 500 });
    }

    const data = await response.json();
    console.log('Resposta OpenRouter:', JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ resposta: data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro no handler:', error);
    return new Response(JSON.stringify({ error: 'Erro interno no servidor' }), { status: 500 });
  }
}
