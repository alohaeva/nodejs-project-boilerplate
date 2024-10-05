import { describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { TokenService } from '../../src/services/TokenService.ts';
import { MockOf } from '../helpers';
import { IRepository } from '../../src/interfaces/repositories/IRepository.ts';
import { TokenDTO } from '../../src/dtos/TokenDTO.ts';
import { Roles, Token } from '../../src/types.ts';

describe('Test TokenService', () => {
  it('should create Access Token with same type', () => {
    const token = TokenService.generateToken(Token.Access, {
      action: 'read',
    });

    const parsedToken = TokenService.verifyToken(token);

    expect(parsedToken.isValid).toBeTruthy();
    expect(parsedToken.payload).toEqual(
      expect.objectContaining({
        type: Token.Access,
      })
    );
  });

  it('should create Refresh Token with same type', () => {
    const token = TokenService.generateToken(Token.Refresh, {
      action: 'read',
    });

    const parsedToken = TokenService.verifyToken(token);

    expect(parsedToken.isValid).toBeTruthy();
    expect(parsedToken.payload).toEqual(
      expect.objectContaining({
        type: Token.Refresh,
      })
    );
  });

  it('Should process expired token', () => {
    const token = TokenService.generateToken(Token.Refresh, {
      action: 'read',
    });

    vi.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      return {
        exp: Date.now() / 1000 - 1000,
      };
    });

    const result = TokenService.verifyToken(token);

    expect(result.isValid).toBeFalsy();
    expect(result.payload).toBeFalsy();
  });

  it('Should catch error', () => {
    const token = TokenService.generateToken(Token.Refresh, {
      action: 'read',
    });

    vi.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw Error('some error');
    });

    const result = TokenService.verifyToken(token);

    expect(result.isValid).toBeFalsy();
    expect(result.payload).toBeFalsy();
  });

  it('Should create token and return token after DTO parsing', async () => {
    const mockTokenRepo = MockOf<IRepository<TokenDTO>>('create', 'getOne');

    const id = new mongoose.Types.ObjectId().toHexString();

    const token = TokenService.generateToken(Token.Access, {
      email: 'read',
      role: Roles.User,
      scopes: ['read'],
    });

    vi.spyOn(mockTokenRepo, 'create').mockResolvedValueOnce({
      id,
    });
    vi.spyOn(mockTokenRepo, 'getOne').mockResolvedValueOnce({
      id,
      value: token,
      type: Token.Access,
    });

    const tokenService = new TokenService(mockTokenRepo);

    const result = await tokenService.createToken({
      type: Token.Access,
      email: 'read',
      role: Roles.User,
      scopes: ['read'],
    });

    expect(result).toEqual(token);
  });
});
