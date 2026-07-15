export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAuthState {
  accessToken: string | null;
  user: IUser | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;

  logout: () => void;
}
