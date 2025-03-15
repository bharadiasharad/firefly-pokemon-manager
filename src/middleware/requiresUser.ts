import { get } from "lodash";
import { getUserById } from "../services/userService";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";

/**
 * @function requireUser
 * @description Middleware to ensure the authenticated user exists in the database.
 * If valid, attaches the user data to the request object.
 *
 * @param {customRequest} req - Custom Express request object with user property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Response|void} Proceeds to the next middleware if the user is found, otherwise returns an error response.
 */
const requireUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user object from the request
    const user: any = get(req, "user");

    // If no user is found in the token, return an error response
    if (!user) {
      return res
        .status(403)
        .json({ errorMsg: "Auth token user not found", error: true });
    }

    // Fetch the user details from the database
    const data = await getUserById(user.id);
    
    // Attach user data to request after converting to JSON
    req.user = data?.toJSON();

    return next();
  } catch (err) {
    let msg = "Internal Server Error";
    
    // Extract error message if available
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    
    return res.status(400).json({ errorMsg: msg, error: true });
  }
};

export default requireUser;
