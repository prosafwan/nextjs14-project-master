import { NextResponse } from 'next/server';

export async function GET() {
  const users = [{ id: 1, name: 'Safwan' }, { id: 2, name: 'Alamgir' }, { id: 3, name: 'Momain' }];
  return NextResponse.json(users);
}
