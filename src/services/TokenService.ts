import jwt from 'jsonwebtoken';

import { Token, VerifyTokenResult } from '../types.ts';
import { logger } from '../logger/index.ts';
import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { CreateToken, TokenDTO, tokenDTOSchema } from '../dtos/TokenDTO.ts';

const secret = 'jwtToken';

export const ACCESS_TOKEN_EXPIRE_IN_SECONDS = 60 * 60 * 1000;
export const REFRESH_TOKEN_EXPIRE_IN_SECONDS = 7 * 24 * 60 * 60 * 1000;

export class TokenService {
  constructor(private readonly tokenRepository: IRepository<TokenDTO>) {}

  async createToken({ type, ...data }: CreateToken): Promise<TokenDTO['value']> {
    const generatedToken = TokenService.generateToken(type, data);

    const newToken = await this.tokenRepository.create({
      type,
      value: generatedToken,
    });

    const token = await this.tokenRepository.getOne(newToken.id);

    return tokenDTOSchema.parse(token).value;
  }

  static generateToken(tokenType: Token, payload: Record<string, unknown>) {
    let token: string = '';

    if (tokenType === Token.Access) {
      token = this.generateAccessToken(payload);
    }

    if (tokenType === Token.Refresh) {
      token = this.generateRefreshToken(payload);
    }

    return token;
  }

  static generateAccessToken(payload: Record<string, unknown>) {
    return jwt.sign(
      {
        ...payload,
        type: Token.Access,
        exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRE_IN_SECONDS,
      },
      secret
    );
  }

  static generateRefreshToken(payload: Record<string, unknown>) {
    return jwt.sign(
      {
        ...payload,
        type: Token.Refresh,
        exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRE_IN_SECONDS,
      },
      secret
    );
  }

  static verifyToken<T>(token: string): VerifyTokenResult<T> {
    try {
      const payload = jwt.verify(token, secret);

      if (typeof payload !== 'string' && payload?.exp && payload.exp > Date.now() / 1000) {
        return {
          isValid: true,
          payload: payload as T,
        };
      }

      return {
        isValid: false,
        payload: null,
      };
    } catch (err: unknown) {
      logger.error('TokenService', err);

      return {
        isValid: false,
        payload: null,
      };
    }
  }
}
