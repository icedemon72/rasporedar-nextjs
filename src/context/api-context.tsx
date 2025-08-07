'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { ApiClient, api as client } from '@/lib/fetch/api-client';

interface ApiFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

interface ApiContextType {
  api: <T>(
    fn: () => Promise<T>,
    options?: ApiFetchOptions<T>
  ) => Promise<T>;
  isLoading: boolean;
  error: string | null;
  client: ApiClient;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = async <T,>(fn: () => Promise<T>, options?: ApiFetchOptions<T>): Promise<T> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fn();
      options?.onSuccess?.(result);
      return result;
    } catch (err: any) {
      setError(err?.message || 'Došlo je do neočekivane greške...');
      options?.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ api, isLoading, error, client }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};