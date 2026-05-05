export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  updated_at: string;
}

export type AuthRole = 'patient' | 'doctor';

export interface AuthSession {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
}

