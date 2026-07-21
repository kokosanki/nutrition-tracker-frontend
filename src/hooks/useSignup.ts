import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/auth.ts'
import { ApiError } from '../api/client.ts'
import type { SignupFormValues } from '../pages/Signup.schema.ts'

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const submit = async (data: SignupFormValues) => {
    setError(null)

    try {
      await signup({ name: data.name, email: data.email, password: data.password })
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err instanceof ApiError ? err.message : 'Something went wrong, please try again')
    }
  }

  return { submit, error }
}
