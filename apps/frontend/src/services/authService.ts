import { httpClient } from "./httpClient";

export type SignupParams = {
  name: string
  email: string
  password: string
}

export type SigninParams = {
  email: string
  password: string
}

const signup = async (body: SignupParams) => {
  const { data } = await httpClient.post<{accessToken: string}>('/auth/signup', body)
  return data;
}

const signin = async (data: SigninParams) => {
  const { data: { accessToken } } = await httpClient.post<{accessToken: string}>('/auth/signin', data)
  return accessToken;
}

export const authService = { signup, signin }
