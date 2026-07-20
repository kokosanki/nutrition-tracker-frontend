import { useEffect, useState, type ReactNode } from 'react'
import { getCurrentUser, type CurrentUser } from '../api/auth.ts'
import { AuthContext } from './auth-context.ts'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, setUser }}>{children}</AuthContext.Provider>
}
