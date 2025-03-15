import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * @function validateRequest
 * @description Middleware for validating request bodies using Joi schemas.
 * If validation fails, it returns a 400 response with the validation errors.
 *
 * @param {Schema} schema - Joi schema to validate the request body against.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
 */
const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate request body against the provided schema
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      // Extract error details and format messages
      const { details, message } = error;
      const messages = details.map(i => i.message).join(",");

      console.log("Validation error:", messages);
      
      // Send response with validation errors
      res.status(400).json({ error: messages, msg: message });
    }
  };
};

export default validateRequest;
