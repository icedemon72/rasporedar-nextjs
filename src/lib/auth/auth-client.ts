import type { LoginResponse } from '@/types/fetch';
import { getApiURL } from '@/utils/docker';

const API_BASE_URL = getApiURL() || 'http://localhost:3001';

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}