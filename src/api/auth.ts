import { apiFetch } from './client.ts'

export interface SignupPayload {
  name: string
  email: string
  password: string
}

export const signup = (payload: SignupPayload): Promise<void> => {
  return apiFetch<void>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface LoginPayload {
  email: string
  password: string
}

export const login = (payload: LoginPayload): Promise<void> => {
  return apiFetch<void>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface CurrentUser {
  email: string
  name: string
}

interface CurrentUserResponse extends CurrentUser {
  password: string
}

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const { email, name } = await apiFetch<CurrentUserResponse>('/auth/me')
  return { email, name }
}
