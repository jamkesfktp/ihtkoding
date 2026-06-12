import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Ambil data user dari Firestore (berisi namaLengkap, instansi, dll)
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Handle legacy data that doesn't have role
            if (!data.role) {
              data.role = data.isAdmin ? 'admin' : 'peserta';
            }
            setUserData(data);
          } else {
            // Jika dokumen di firestore sudah dihapus oleh admin
            setUserData({ username: user.email.split('@')[0], role: 'peserta', isAdmin: false, isApproved: false });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userData,
    loading,
    logout
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #e2e8f0',
          borderTopColor: '#1e40af',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <h3 style={{ marginTop: '1.5rem', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Memuat Aplikasi...</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Harap tunggu sebentar</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
