import {
  createUser,
  findOneUser,
  userExists,
  validatePassword,
} from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { sign } from "../util/jwt";
import { ApiError } from "../util/ApiError";

// Fields to omit from the response
const omitData = ["password"];

/**
 * @function registerUser
 * @description Handles user registration by creating a new user and returning an access token.
 * @param {Request} req - Express request object containing user details in the body.
 * @param {Response} res - Express response object to send the response.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<Response>} JSON response with user data and access token.
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.body;

    // Check if the user already exists using email or mobile number
    const userExist = await userExists({
      email: user.email,
      mobile: user.mobile,
    });
    if (userExist) {
      throw new ApiError(400, "Email or Mobile is already used");
    }

    // Create new user
    user = await createUser(user);
    
    // Remove sensitive data before sending response
    const userData = omit(user?.toJSON(), omitData);
    
    // Generate an access token
    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      error: false,
      accessToken,
      msg: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function loginUser
 * @description Handles user login by verifying credentials and returning an access token.
 * @param {Request} req - Express request object containing email and password.
 * @param {Response} res - Express response object to send the response.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<Response>} JSON response with user data and access token.
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await findOneUser({ email });
    if (!user) {
      throw new ApiError(400, "Email ID is incorrect");
    }

    // Validate password
    const validPassword = await validatePassword(user.email, password);
    if (!validPassword) {
      throw new ApiError(400, "Password is incorrect");
    }

    // Remove sensitive data before sending response
    const userData = omit(user?.toJSON(), omitData);
    
    // Generate an access token
    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      access_token: accessToken,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
