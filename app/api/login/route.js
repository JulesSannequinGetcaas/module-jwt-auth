import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;  // La clé secrète pour signer les tokens, définie dans le fichier .env
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;  // Optionnel : une autre clé pour le refresh token

export async function POST(request) {
  // 1. Récupération du "username" et du "password" depuis la requête.
  const { username, password } = await request.json(); // On attend un JSON contenant les identifiants

  // 2. Simulation d'un utilisateur enregistré en BDD
  const mockUser = {
    username: 'johndoe',
    password: 'password123',  // Le mot de passe est stocké en clair dans cet exemple, ce n'est pas sécurisé en production !
  };

  // 3. Vérification des identifiants
  if (username === mockUser.username && password === mockUser.password) {
    // 4. Génération du token d'accès (module jsonwebtoken)
    const accessToken = jwt.sign(
      { username: mockUser.username, id: 'user-123' },  // Payload contenant des informations utiles
      SECRET_KEY,
      { expiresIn:process.env.JWT_REFRESH_EXPIRATION }  // Le token expire après 1 heure
    );

    // 5. Génération du refresh token (module jsonwebtoken)
    const refreshToken = jwt.sign(
      { username: mockUser.username, id: 'user-123' }, 
      REFRESH_SECRET_KEY, 
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION  }  // Le refresh token expire après 7 jours
    );

    // 6. Envoi des tokens dans la réponse
    return NextResponse.json(
      { accessToken, refreshToken },
      { status: 200 }
    );
  }

  // 7. Retour d'une erreur en cas d'identifiants invalides.
  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  );
}
