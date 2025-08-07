import { LoginResponse, User } from "@/types/fetch"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Client-side fetch with authentication
export async function fetchWithAuthClient(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  })

  // If access token expired, try to refresh
  if (response.status === 401) {
    const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    })

    if (refreshResponse.ok) {
      // Retry original request
      const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include",
      })
      return retryResponse
    } else {
      // Refresh failed, redirect to login
      window.location.href = "/login"
      throw new Error("Authentication failed")
    }
  }

  return response
}

// Get current user (client-side)
export async function getCurrentUserClient(): Promise<User | null> {
  try {
    const response = await fetchWithAuthClient("/me")

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

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Login failed")
  }

  return data
}

// Logout function
export async function logout(): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
}