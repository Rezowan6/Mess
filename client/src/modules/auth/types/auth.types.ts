export interface IUser {
  id: string;
  name: string;
  email: string;

  // পরে /auth/me endpoint থেকে আনবে
  role?: string;
}

export interface IAuthState {
  accessToken: string | null;
  user: IUser | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;

  logout: () => void;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}
