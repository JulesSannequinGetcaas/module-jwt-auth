'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 && refreshToken) {
          setIsRefreshing(true);
          
          const refreshResponse = await fetch('/api/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (refreshResponse.ok) {
            const { accessToken } = await refreshResponse.json();
            localStorage.setItem('accessToken', accessToken);
            setIsRefreshing(false);
            fetchProfile(); // Réessayer de récupérer le profil après le rafraîchissement
          } else {
            setIsRefreshing(false);
            router.push('/login');
          }
        } else if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');  // Supprimer aussi le username du localStorage
    router.push('/login');
  };

  const storedUsername = localStorage.getItem('username'); // Récupérer le username du localStorage

  return (
    <div>
      <h1>Profile Page</h1>
      {isRefreshing ? <p>Refreshing your session...</p> : user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
      {/* Affichage du username du localStorage si l'utilisateur n'est pas encore chargé */}
      {!user && storedUsername && <p>Welcome, {storedUsername}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
