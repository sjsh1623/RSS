export interface JwtPayloadWithRefresh {
  id: number;
  email: string;
  refreshToken: string;
}