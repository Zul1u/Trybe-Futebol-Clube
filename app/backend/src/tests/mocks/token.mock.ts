import Token from '../../helpers/token.helper';

const tokenGenerator = new Token();

export const payload = {
  id: 2,
  username: 'KleitinhoGamer22',
  role: 'user',
}

export const mockToken = tokenGenerator.createToken(payload);

export const invalidToken = 'Token must be a valid token';
export const tokenNotFound = 'Token not found';
