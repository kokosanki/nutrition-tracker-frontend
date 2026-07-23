import { apiFetch } from "./client.ts";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const signup = (payload: SignupPayload): Promise<void> => {
  return apiFetch<void>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = (payload: LoginPayload): Promise<void> => {
  return apiFetch<void>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const logout = (): Promise<void> => {
  return apiFetch<void>("/auth/logout", {
    method: "POST",
  });
};

export interface CurrentUser {
  id: number;
  email: string;
  name: string;
}

interface CurrentUserResponse {
  user: CurrentUser;
}

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const { user } = await apiFetch<CurrentUserResponse>("/auth/me");
  return user;
};

