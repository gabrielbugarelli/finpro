import { httpClient } from "./HttpClient";

export type SignupParams = {
  name: string
  email: string
  password: string
}

const signup = async (body: SignupParams) => {
  const { data } = await httpClient.post<{accessToken: string}>('/auth/signup', body)
  return data;
}

export const authService = { signup }
