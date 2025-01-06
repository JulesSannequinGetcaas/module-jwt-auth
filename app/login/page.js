'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // 1. Définir un état pour le "username"
  // 2. Définir un état pour le "password"
  // 3. Définir un état pour le "error"
  // 4. Définir le "router"

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 5. Faire la requête vers "/api/login"

      // 6. S'il y a une erreur, la lever avec le message "Invalid credentials"

      // 7. Sinon, récupérer le "token" et le "refreshToken" dans la réponse

      // 8. Stocker le "token" et le "refreshToken" dans le localStorage
     
      // Rediriger vers la page protégée
      router.push('/profile');
    } catch (err) {
      // 8. Changer la valeur de l'état "error" avec le message 'Invalid credentials'
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
