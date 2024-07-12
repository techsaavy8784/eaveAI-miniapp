import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { creator } = await req.json();
    const cookieStore = cookies();
    const telegramEntityId = cookieStore.get('telegram_entity_id')?.value;

    if (!telegramEntityId) {
      return NextResponse.json({ error: 'Telegram entity ID not found in cookies' }, { status: 400 });
    }

    const url = `https://api-eave-dev.azurewebsites.net/api/accounts/${telegramEntityId}/unfollow/`;

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls',
      },
      body: JSON.stringify({ creator }),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to unfollow the creator');
    }

    const result = await apiResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in unfollow route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
