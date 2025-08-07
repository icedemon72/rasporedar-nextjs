"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUserClient } from "@/lib/auth/auth"
import { AuthState, User } from "@/types/fetch"

interface AuthContextType extends AuthState {
  setUser: (user: User | null) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode
  initialUser?: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch user on client if we don't have initial user data
    if (!initialUser && !user) {
      setIsLoading(true)
      getCurrentUserClient()
        .then(setUser)
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false))
    }
  }, [initialUser, user])

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    setUser,
    setError,
    setLoading: setIsLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}