"use client";

import React, { createContext, useContext, useState } from 'react';
import { API_LOGOUT_URL } from '@/utils/api';

interface SessionContextProps {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
  };

  const logout = () => {
    setAccessToken(null);
    fetch(API_LOGOUT_URL, {
      method: 'POST',
      credentials: 'include',
    });
  };

  return (
    <SessionContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};