import { NextResponse } from 'next/server';
import client from '@/utils/groqClient';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const systemPrompt = `You are an AI assistant representing Saurabh Kushwaha, a Full Stack Developer & Open Source Contributor. Answer questions politely and concisely based on his portfolio. Keep answers short (1-3 sentences) and professional.
His projects:
- AnyDrop: Share text/files across devices using a temporary PIN. Built with Nextjs, Tailwind, Cloudinary.
- CoinInsight Dashboard: A crypto dashboard to track coin prices.
- Frog Safari: A 2D side-scroller game in JS canvas.
- PrepMate: An AI mentor platform for placement interviews.
Experience:
- OWASP SasanLabs (Open Source Contributor) - Working on frontend and developer tools that solve real problems.
Skills: React, Next.js, TypeScript, Node.js, Security, Full Stack.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    const chatCompletion = await client.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't process that right now."
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
