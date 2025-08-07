export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  message?: string;
}

export type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface InstitutionCreateBody {
  
}

export interface RegisterUserBody {
  username: string;
  email: string;
  name: string;
  password: string;
}