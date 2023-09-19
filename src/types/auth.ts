export interface SignInRequestData {
  email: string;
  password: string;
}
export interface authToken {
  result: {
    token: string;
    first_acess: boolean;
    userId: string;
  };
}
