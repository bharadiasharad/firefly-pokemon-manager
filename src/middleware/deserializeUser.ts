import { get } from "lodash";
import { verify } from "../util/jwt";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";

/**
 * @function deserializeUser
 * @description Middleware to extract and verify the JWT from the request headers.
 * If valid, attaches the decoded user data to the request object.
 *
 * @param {customRequest} req - Custom Express request object with user property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Response|void} Proceeds to the next middleware if the token is valid, otherwise returns a 403 response.
 */
const deserializeUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const bearerToken = get(req, "headers.authorization");
  let token = bearerToken;

  // Remove 'Bearer ' prefix if present
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    token = bearerToken.substring(7);
  }

  // If no token is provided, proceed without authentication
  if (!token) return next();

  // Verify the token
  const { decoded, expired, valid, msg: errorMsg } = verify(token);

  // If token is valid and not expired, attach decoded user data to request
  if (valid && !expired) {
    req.user = decoded;
    return next();
  } else {
    // Respond with an error if token is invalid or expired
    return res.status(403).json({
      error: true,
      errorMsg: errorMsg,
    });
  }
};

export default deserializeUser;
