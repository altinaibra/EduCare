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

// age group information returned from server
export interface AgeGroup {
  id: number;
  ageRange: string;
  numberOfClasses: number;
  educatorName: string;
  status: boolean;
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

  // age group endpoints
  getAgeGroups: async (): Promise<AgeGroup[]> => {
    const { data } = await axiosInstance.get<AgeGroup[]>('/agegroup');
    return data;
  },

  getAgeGroupById: async (id: number): Promise<AgeGroup> => {
    const { data } = await axiosInstance.get<AgeGroup>(`/agegroup/${id}`);
    return data;
  },

  createAgeGroup: async (payload: Omit<AgeGroup, 'id'>): Promise<AgeGroup> => {
    const { data } = await axiosInstance.post<AgeGroup>('/agegroup', payload);
    return data;
  },

  updateAgeGroup: async (id: number, payload: Omit<AgeGroup, 'id'>): Promise<AgeGroup> => {
    const { data } = await axiosInstance.put<AgeGroup>(`/agegroup/${id}`, payload);
    return data;
  },

  deleteAgeGroup: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/agegroup/${id}`);
  }
};
