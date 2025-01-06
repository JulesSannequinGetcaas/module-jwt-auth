import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Utiliser la clé secrète pour vérifier le JWT

export async function GET(request) {
  // 1. Récupérer "authorization" dans les "headers" et le stocker dans une variable "authHeader"
  const authHeader = request.headers.get('Authorization');

  // 2. Récupérer le token dans le "authHeader"
  if (!authHeader) {
    // 3. S'il n'y a pas de token, renvoyer une erreur
    return NextResponse.json(
      { message: 'Token is missing' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1]; // Le token est généralement envoyé sous la forme "Bearer <token>"

  if (!token) {
    return NextResponse.json(
      { message: 'Token is missing' },
      { status: 401 }
    );
  }

  try {
    // 4. Vérifier le JWT
    const decoded = jwt.verify(token, SECRET_KEY); // Vérifie la validité du token avec la clé secrète

    // 5. Renvoyer la réponse avec les données "decoded" (c'est-à-dire les données encodées dans le token)
    return NextResponse.json(
      { message: 'Protected data', user: decoded },
      { status: 200 }
    );
  } catch (error) {
    // 6. Renvoyer une erreur si le token est invalide
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 403 }
    );
  }
}
