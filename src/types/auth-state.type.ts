export interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
}
