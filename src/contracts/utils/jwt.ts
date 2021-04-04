export interface JWTUtilContract {
  create(payload: Pick<JWTPayload, 'sub'>): Promise<string>;
  verify(token: string): Promise<JWTPayload>;
}

export interface JWTPayload {
  sub: string;
  exp: number;
  iat: number;
  nbf: number;
}
