export interface IMembership {

 tenantId:number;

 role:string;

}

export interface IUser {
  id: string;
  name: string;
  email: string;

  memberships:IMembership[];
}


export interface IAuthUser {

 id:number;

 name:string;

 email:string;

 memberships:IMembership[];

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
