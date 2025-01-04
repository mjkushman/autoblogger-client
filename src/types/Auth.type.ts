export type createAccountFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type loginFormDataType = {
  email: string;
  password: string;
};
export type DecodedJwt = {
  sub: string;
  iat: number;
  exp: number;
  accountId: string;
};
