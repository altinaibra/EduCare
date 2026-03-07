import axiosInstance from "./axiosInstance";

export type LoginType = "username" | "telephone";

export interface LoginRequest {
  loginType: LoginType;
  username?: string;
  telephone?: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  roleId: number;
  name: string;
  surname: string;
  username: string;
  telephone: string;
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

// Users table mapping:
// Username -> Users.Username
// Telephone -> Users.Telephone
// Password -> Users.Password
// Email -> Users.Email
export const authApi = {
  login: async (payload: LoginRequest) => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  requestPasswordReset: async (payload: ForgotPasswordRequest) => {
    const { data } = await axiosInstance.post<{ success: boolean; message: string }>(
      "/auth/forgot-password",
      payload
    );
    return data;
  },

  verifyCodeAndResetPassword: async (payload: ResetPasswordRequest) => {
    const { data } = await axiosInstance.post<{ success: boolean; message: string }>(
      "/auth/reset-password",
      payload
    );
    return data;
  },
};
