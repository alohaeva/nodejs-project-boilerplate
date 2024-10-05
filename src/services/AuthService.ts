import { Token } from '../types.ts';
import { AuthenticateDTO } from '../dtos/TokenDTO.ts';

import { TokenService } from './TokenService.ts';

export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async login(message: AuthenticateDTO) {
    const { email, role, scopes } = message;

    const accessToken = await this.tokenService.createToken({
      type: Token.Access,
      email,
      role,
      scopes,
    });

    const refreshToken = await this.tokenService.createToken({
      type: Token.Refresh,
      email,
      role,
      scopes,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
