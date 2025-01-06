'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  // 1. Définir un état pour le "user" (null au départ)
  // 2. Définir un état pour le "isRefreshing" (false au départ)
  // 3. Définir le "router"

  useEffect(() => {
    const fetchProfile = async () => {
      try {    
        // 4. Récupérer le "token" et le "refreshToken" du localStorage
        
        // 5. Faire la requête vers "/api/protected"
        
        // 6. Si la réponse n'est pas bonne, a un status 401, que "isRefreshing" est "false" et qu'on a bien un "refreshToken"
        if () {
          // 7. Passer isRefreshing à "true"

          // 8. Faire la requête vers "'/api/refresh"

          // 9. Si la réponse est bonne
          if () {
            // 10. Récupérer le token dans la réponse
            // 11. Stocker ce token dans le localStorage
            // 12. Passer isRefreshing à "false"
            // 13. Appeler la fonction "fetchProfile"
          } else {
            // 14. Passer isRefreshing à "false"
            // 15. Déconnecter l'utilisateur
          }
        } else if (response.ok) {
          // 16. Récupérer les données de la réponse
          // 17. Utiliser "setUser" pour mettre à jour l'utilisateur avec les données récupérées.
        }
      } catch (error) {
        // 18. Rediriger vers la page "/login"
        router.push('/login'); 
      }
    };

    // 19. Récupérer le "token"
    if (!token) {
      // 20. Rediriger vers la page "/login"
      router.push('/login');
    } else {
      // 21. Appeler la fonction "fetchProfile
      fetchProfile();
    }
  }, []);

  const handleLogout = () => {
    // 22. Supprimer le "token" et le "refreshToken" du localStorage
    // 23. Rediriger vers la page "/login"
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
