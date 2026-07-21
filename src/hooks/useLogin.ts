import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, login } from '../api/auth.ts'
import { ApiError } from '../api/client.ts'
import { useAuth } from './useAuth.ts'
import type { LoginFormValues } from '../pages/Login.schema.ts'

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const submit = async (data: LoginFormValues) => {
    setError(null)

    try {
      await login(data)
      setUser(await getCurrentUser())
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err instanceof ApiError ? err.message : 'Something went wrong, please try again')
    }
  }

  return { submit, error }
}
