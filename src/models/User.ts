import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

/**
 * @class User
 * @extends Model
 * @description Represents a User model in the database.
 */
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string;
  public status!: boolean;

  // Timestamps
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  /**
   * @function validPassword
   * @description Compares a plain text password with the stored hashed password.
   * @param {string} password - The plain text password.
   * @param {string} hash - The hashed password.
   * @returns {boolean} True if passwords match, false otherwise.
   */
  static validPassword: (password: string, hash: string) => boolean;
}

// Initialize the User model with schema and configurations
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

// Method to validate password
User.validPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export default User;
