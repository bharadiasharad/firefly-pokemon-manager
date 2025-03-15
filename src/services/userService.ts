import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import { Op } from "sequelize";

/**
 * Creates a new user with encrypted password.
 * @param payload - User data.
 * @returns The created user object.
 */
export const createUser = async (payload: any) => {
  payload.password = encryptSync(payload.password);
  const user = await User.create(payload);
  return user;
};

/**
 * Retrieves a user by ID, excluding the password field.
 * @param id - The ID of the user.
 * @returns The user object.
 */
export const getUserById = async (id: number) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

/**
 * Checks if a user exists by email or mobile number.
 * @param options - Object containing email or mobile.
 * @returns A boolean indicating whether the user exists.
 */
export const userExists = async (
  options: { email: string | null; mobile: string | null } = {
    email: null,
    mobile: null,
  }
) => {
  if (!options.email) {
    throw new Error("Please provide either of these options: email");
  }
  const where: any = {
    [Op.or]: [],
  };
  if (options.email) {
    where[Op.or].push({ email: options.email });
  }
  if (options.mobile) {
    where[Op.or].push({ mobile: options.mobile });
  }

  const users = await User.findAll({ where: where });
  return users.length > 0;
};

/**
 * Validates user password.
 * @param email - User's email.
 * @param password - User's password.
 * @returns A boolean indicating if the password is valid.
 */
export const validatePassword = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (email) {
    where[Op.or].push({ email: email });
  }

  const user = await User.findOne({ where });
  if (!user) {
    throw new Error("User not found");
  }
  return User.validPassword(password, user.password);
};

/**
 * Finds a user by email or ID.
 * @param options - Object containing email or ID.
 * @returns The user object if found.
 */
export const findOneUser = async (options: any) => {
  if (!options.email && !options.id) {
    throw new Error("Please provide email or id ");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.email) {
    where[Op.or].push({ email: options.email });
  }
  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const user = await User.findOne({
    where,
    attributes: { exclude: ["password"] },
  });
  return user;
};

/**
 * Updates user details by user ID.
 * @param user - User data to update.
 * @param userId - The ID of the user.
 * @returns The update result.
 */
export const updateUserById = (user: any, userId: number) => {
  if (!user || !userId) {
    throw new Error("Please provide user data and/or user id to update");
  }
  if (isNaN(userId)) {
    throw new Error("Invalid user id");
  }
  const id = user.id || userId;

  if (user.password) {
    user.password = encryptSync(user.password);
  }

  return User.update(user, {
    where: { id: id },
  });
};
