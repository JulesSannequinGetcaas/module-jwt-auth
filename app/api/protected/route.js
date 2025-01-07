import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Utiliser la clé secrète pour vérifier le JWT

export async function GET(request) {
  try {
    // 1. Récupérer et valider l'en-tête Authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Extraire le token après "Bearer"

    if (!token) {
      return NextResponse.json(
        { message: 'Token is missing' },
        { status: 401 }
      );
    }

    // 2. Vérifier et décoder le JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // 3. Répondre avec les données utilisateur
    return NextResponse.json(
      { message: 'Protected data', user: decoded },
      { status: 200 }
    );
  } catch (error) {
    // 4. Gérer les erreurs liées au token
    const status = error.name === 'TokenExpiredError' ? 401 : 403; // Expiré = 401, autre problème = 403
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status }
    );
  }
}
