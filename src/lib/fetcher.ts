import { Mutex } from 'async-mutex';
import { getSession, setAccessToken } from '@/utils/session';
import { API_REFRESH_URL } from '@/utils/api';

const mutex = new Mutex();

export async function customFetch(
  input: RequestInfo,
  init?: RequestInit,
  retry = true
): Promise<Response> {
  const { accessToken } = getSession();

  const headers = new Headers(init?.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const res = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  });
  if (res.status === 401 && retry) {
    await mutex.waitForUnlock();
    
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const refreshRes = await fetch('http://localhost:3001/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setAccessToken(data.access_token);

          // Retry original request
          return customFetch(input, init, false);
        } else {
          // logout fallback
          setAccessToken(null);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      return customFetch(input, init, false);
    }
  }

  return res;
}