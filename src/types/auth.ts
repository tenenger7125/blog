export type LoginResponseData = {
  profile: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type SignupResponseData = null;

export type SignupRequestData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ValidateResponseData = {
  message: string;
};

export type ReIssueTokenResponseData = {
  accessToken: string;
  refreshToken: string;
};
