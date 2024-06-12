"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL, login as apiLogin } from '@/utils/api';
import { Product } from "@/data/data";  // Ensure this path is correct

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const defaultAuthValue: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedAuth = JSON.parse(storedAuth);

        setUser(parsedUser);
        setIsAuthenticated(parsedAuth);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiLogin({ email, password });

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));

      setIsAuthenticated(true);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('previousPage', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, cartItems, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};
