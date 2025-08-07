import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, LoginResponse } from '@/types/fetch';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Server-side fetch with authentication
export async function fetchWithAuthServer(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  console.log(`${API_BASE_URL}${endpoint}`);
  console.log(cookieHeader);

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options.headers,
    },
    credentials: "include",
  })

  console.log(response);

  // If access token expired, try to refresh
  
  if (response.status === 401) {
    const refreshResponse = await refreshToken(cookieHeader);

    if (refreshResponse.ok) {
      const newCookie = refreshResponse.headers.get("set-cookie") || cookieHeader;

      // Retry original request with updated cookie
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Cookie: newCookie,
          ...options.headers,
        },
        credentials: "include",
      });
    } else {
      redirect("/auth/login");
    }
  }

  return response
}

let isRefreshing = false;
let refreshPromise: Promise<Response> | null = null;

async function refreshToken(cookieHeader: string): Promise<Response> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
      credentials: "include",
    }).finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }

  return refreshPromise!;
}

// Get current user (server-side)
export async function getCurrentUserServer(): Promise<User | null> {
  try {
    const response = await fetchWithAuthServer("/me")

    if (response.ok) {
      const data: LoginResponse = await response.json()
      return data.user
    }

    return null
  } catch (error) {
    // console.error("Failed to get current user:", error)
    return null
  }
}