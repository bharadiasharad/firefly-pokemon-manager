import bcrypt from "bcrypt";
import { jwtConfig } from "../config/config";

export const encryptSync = (password: string) => {
  return bcrypt.hashSync(password, jwtConfig.saltRound);
};

export const compareSync = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
