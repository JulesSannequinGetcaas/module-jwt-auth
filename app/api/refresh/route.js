import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

export async function POST(request) {
  // 1. Récupérer le "refreshToken" de la requête
  const { refreshToken } = await request.json();

  // 2. S'il n'y a pas de "refreshToken", renvoyer une erreur
  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token is required' },
      { status: 400 }
    );
  }

  try {
    // 3. Vérifier le refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    // 4. Générer un nouveau token d'accès
    const newAccessToken = jwt.sign(
      { username: decoded.username, id: decoded.id },
      SECRET_KEY,
      { expiresIn: '1h' } // Token valide pour 1 heure
    );

    // 5. Renvoyer le nouveau token en réponse
    return NextResponse.json(
      { accessToken: newAccessToken },
      { status: 200 }
    );
  } catch (error) {
    // 6. Renvoyer une erreur spécifiant que le "refreshToken" n'est pas valide
    return NextResponse.json(
      { message: 'Invalid or expired refresh token' },
      { status: 401 }
    );
  }
}
