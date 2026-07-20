import { createContext } from 'react'
import type { CurrentUser } from '../api/auth.ts'

export interface AuthContextValue {
  user: CurrentUser | null
  isLoading: boolean
  setUser: (user: CurrentUser | null) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
