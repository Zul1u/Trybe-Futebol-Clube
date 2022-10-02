import * as bcrypt from 'bcryptjs';

const EMAIL = 'kleitin@kleiton.com';
const PASSWORD = 'superSecretPassword';

export const SERVER_ERROR = 'Algo deu errado!!'

export const userIfos = {
  id: 2,
  username: 'KleitinhoGamer22',
  role: 'user',
  email: EMAIL,
  password: bcrypt.hashSync(PASSWORD)
}

export const userLogin = {
  email: EMAIL,
  password: PASSWORD
}

export const incorrectLogins = [
  { password: PASSWORD },
  { email: EMAIL, },
  { email: 'email@email.com', password: PASSWORD },
  { email: EMAIL, password: 'password' }
];

export const fieldFillMessage = 'All fields must be filled';
export const incorrectDataMessage = 'Incorrect email or password';
