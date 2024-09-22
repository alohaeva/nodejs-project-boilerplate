import { Token } from '../types.ts';

import { TokenService } from './TokenService.ts';

export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async login(message: { email: string }) {
    const email = message.email;

    const accessToken = await this.tokenService.createToken({
      type: Token.Access,
      email,
    });

    const refreshToken = await this.tokenService.createToken({
      type: Token.Refresh,
      email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
