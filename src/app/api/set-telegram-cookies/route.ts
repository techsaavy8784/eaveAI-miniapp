// /src/app/api/set-telegram-cookies/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { telegram_entity_id, telegram_username } = body;

    if (!telegram_entity_id || !telegram_username) {
      console.error('Telegram data is missing');
      return NextResponse.json({ error: 'Telegram data is required' }, { status: 400 });
    }

    const response = NextResponse.json({ message: 'Telegram data stored in cookies' }, { status: 200 });
    response.cookies.set('telegram_entity_id', telegram_entity_id);
    response.cookies.set('telegram_username', telegram_username);


    return response;
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
