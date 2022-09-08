import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hash(password: string) {
  if (!password) throw new TypeError('Password should not be empty');

  return bcrypt.hash(password, saltRounds);
}

async function match(plainPassword: string, hashedPassword: string) {
  if (!plainPassword || !hashedPassword) {
    throw new TypeError('Password/Hash should not be empty');
  }

  return bcrypt.compare(plainPassword, hashedPassword);
}

const PasswordServ = { hash, match };

export default PasswordServ;
