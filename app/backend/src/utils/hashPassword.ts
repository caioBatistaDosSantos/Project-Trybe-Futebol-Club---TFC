import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(5);

export const encriptPassword = (password: string) => {
  const encryptPass = bcrypt.hashSync(password, salt);

  return encryptPass;
};

export const decryptPassword = (password: string, passwordEncript: string) => {
  const isMatch = bcrypt.compareSync(password, passwordEncript);

  return isMatch;
};
