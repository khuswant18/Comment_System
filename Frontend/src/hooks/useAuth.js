import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userPhoto = localStorage.getItem("userPhoto");
    
    if (userName && userId) {
      setUser({
        name: userName,
        id: userId,
        email: userEmail,
        photoURL: userPhoto,
      });
    }
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName,
          id: firebaseUser.uid,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userPhoto", userData.photoURL);
      } else {
        setUser(null);
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhoto");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPhoto");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, loading, logout };
};