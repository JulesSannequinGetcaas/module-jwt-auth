import { NextResponse } from 'next/server';

export async function POST() {
  // Renvoie juste une réponse avec le message "Logged out"
  return NextResponse.json(
    { message: 'Logged out' },  // Message de confirmation
    { status: 200 }  // Code de statut OK
  );
}
