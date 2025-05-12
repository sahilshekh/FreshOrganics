import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes and fetch user profile from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // User profile exists in Firestore
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: userData.name || firebaseUser.displayName || 'User',
            address: userData.address || 'Not set',
            phone: userData.phone || 'Not set', // Add phone field (optional for now)
          });
        } else {
          // Create a new user profile in Firestore if it doesn't exist
          const newUser = {
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email,
            address: 'Not set',
            phone: 'Not set',
            createdAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, newUser);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: newUser.name,
            address: newUser.address,
            phone: newUser.phone,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
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
        address: address || 'Not set',
        phone: 'Not set', // Add phone field (optional for now)
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

  // Update profile function
  const updateProfile = async (updatedData) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, updatedData, { merge: true });
      setUser((prev) => ({ ...prev, ...updatedData }));
    } catch (error) {
      console.error('Error updating profile:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, updateProfile, loading }}>
      {!loading && children}
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