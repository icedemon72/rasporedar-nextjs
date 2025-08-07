import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export async function customFetch(
  input: RequestInfo,
  init?: RequestInit,
  retry = true
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    credentials: 'include', // ensures cookies are sent
  });
  // If access token expired
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
          // Cookie has been updated on server side
          return customFetch(input, init, false); // Retry original request
        } else {
          // Redirect to login/logout
          return res;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      return customFetch(input, init, false); // Retry once
    }
  }

  return res;
}

