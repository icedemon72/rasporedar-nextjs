import { getPayloadURL } from '@/utils/docker';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // Optional: Basic validation
  const { name, email, phone, reason, message } = body;
  if (!name || !email || !reason || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const payloadResponse = await fetch(`${getPayloadURL()}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYLOAD_CMS_KEY}`, 
      },
      body: JSON.stringify(body),
    });

    if (!payloadResponse.ok) {
      const error = await payloadResponse.json();
      console.error("Payload error:", error);
      return NextResponse.json({ error }, { status: payloadResponse.status });
    }

    const data = await payloadResponse.json();
    return NextResponse.json({ message: 'Contact submitted successfully', data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}