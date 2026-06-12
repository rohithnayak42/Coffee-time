import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for an existing session
    const storedUser = localStorage.getItem('coffee_auth_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newUser = {
      uid: `user_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      role: 'customer',
      loyaltyPoints: 0,
    };
    setCurrentUser(newUser);
    localStorage.setItem('coffee_auth_user', JSON.stringify(newUser));
    return newUser;
  };

  const login = async (email, password) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hardcoded Admin login
    if (email === 'admin@coffee.com' && password === 'admin123') {
      const adminUser = {
        uid: 'admin_123',
        email,
        name: 'Coffee Admin',
        role: 'admin',
        loyaltyPoints: 9999,
      };
      setCurrentUser(adminUser);
      localStorage.setItem('coffee_auth_user', JSON.stringify(adminUser));
      return adminUser;
    }

    const customerUser = {
      uid: `user_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name: email.split('@')[0],
      role: 'customer',
      loyaltyPoints: Math.floor(Math.random() * 500),
    };
    setCurrentUser(customerUser);
    localStorage.setItem('coffee_auth_user', JSON.stringify(customerUser));
    return customerUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('coffee_auth_user');
  };

  const loginWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const googleUser = {
      uid: `google_${Math.random().toString(36).substr(2, 9)}`,
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'customer',
      loyaltyPoints: 100,
    };
    setCurrentUser(googleUser);
    localStorage.setItem('coffee_auth_user', JSON.stringify(googleUser));
    return googleUser;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
