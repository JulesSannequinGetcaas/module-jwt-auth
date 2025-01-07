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
          handleLogout(); 
          return;
        }

      
        const response = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 && !isRefreshing && refreshToken) {
        
          setIsRefreshing(true);

          const refreshResponse = await fetch('/api/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (refreshResponse.ok) {
            const { accessToken } = await refreshResponse.json();
            localStorage.setItem('accessToken', accessToken); // Mettre à jour le token dans localStorage
            setIsRefreshing(false);
            fetchProfile(); 
          } else {
            setIsRefreshing(false);
            handleLogout(); 
          }
        } else if (response.ok) {
          const data = await response.json();
          setUser(data.user); 
        } else {
          handleLogout(); 
        }
      } catch (error) {
        handleLogout(); 
      }
    };

    fetchProfile();
  }, [isRefreshing]); // Dépendance pour redéclencher si le token est rafraîchi

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login'); // Redirection vers la page de connexion
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {isRefreshing ? (
        <p>Refreshing your session...</p>
      ) : user ? (
        <p>Welcome, {user.username}!</p> // Utilisation du state pour afficher le username
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

