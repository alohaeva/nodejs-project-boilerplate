import { Token } from '../types.ts';
import { AuthenticateDTO } from '../dtos/TokenDTO.ts';

import { TokenService } from './TokenService.ts';

export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async login(message: AuthenticateDTO) {
    const { email, role } = message;

    const accessToken = await this.tokenService.createToken({
      type: Token.Access,
      email,
      role,
    });

    const refreshToken = await this.tokenService.createToken({
      type: Token.Refresh,
      email,
      role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
