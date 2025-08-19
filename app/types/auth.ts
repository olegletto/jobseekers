export type PageState = "login" | "signup" | "forgot-password" | "success";

export interface User {
  email: string;
  password: string;
}

export interface AuthFormData {
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  user?: {
    email: string;
    id: string;
  };
  token?: string;
}

export interface MockFetchOptions extends RequestInit {
  body: string;
} 