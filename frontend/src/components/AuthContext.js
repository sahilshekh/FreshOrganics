import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Ensure db (Firestore) is exported from firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'User',
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Signup function with address
  const signup = async (name, email, password, address) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's displayName
      await updateProfile(user, { displayName: name });

      // Store additional user data (address) in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        address,
        createdAt: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error('Signup error:', error.message);
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  // Forgot Password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Password reset error:', error.message);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add useAuth hook to simplify context access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};