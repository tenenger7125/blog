export type LoginResponseData = {
  profile: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};
