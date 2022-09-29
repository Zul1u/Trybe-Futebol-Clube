type TokenInfos = {
  id: number,
  role: string,
  username: string,
};

type VerifyToken = {
  data: TokenInfos,
  iat: number,
  exp: number
};

export { TokenInfos, VerifyToken };
