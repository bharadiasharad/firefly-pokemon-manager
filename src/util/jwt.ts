import { jwtConfig } from "../config/config";
import jwt from "jsonwebtoken";

/**
 * Signs and generates a JWT token.
 * 
 * @param {any} payload - The data to encode in the token.
 * @param {jwt.SignOptions} [options={ expiresIn: jwtConfig.expiry + "h" }] - Optional token signing options.
 * @returns {string} - The signed JWT token.
 */
export const sign = (
  payload: any,
  options = { expiresIn: jwtConfig.expiry + "h" }
): string => {
  return jwt.sign(payload, jwtConfig.secret, options);
};

/**
 * Verifies and decodes a JWT token.
 * 
 * @param {string} token - The JWT token to verify.
 * @returns {{
 *   valid: boolean;
 *   expired: boolean;
 *   decoded: any | null;
 *   msg?: string;
 * }} - The verification result including whether the token is valid, expired, or an error message.
 */
export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log("token verification failed", token, { error });

    let msg;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = String(error);
    }

    return {
      valid: false,
      expired: msg === "jwt expired",
      msg: msg,
      decoded: null as null,
    };
  }
};
