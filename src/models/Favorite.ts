import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import User from "./User";

/**
 * Favorite Model
 * Represents the favorite Pokémon saved by users.
 */
class Favorite extends Model {
  /**
   * Unique identifier for the favorite entry.
   */
  public id!: number;

  /**
   * The ID of the user who favorited the Pokémon.
   */
  public userId!: number;

  /**
   * The ID of the Pokémon marked as a favorite.
   */
  public pokemonId!: number;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    pokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "favorites",
  }
);

// Define model relationships

/**
 * Establishes a one-to-many relationship between User and Favorite.
 * A user can have multiple favorite Pokémon.
 */
User.hasMany(Favorite, { foreignKey: "userId" });

/**
 * Establishes a many-to-one relationship between Favorite and User.
 * Each favorite Pokémon belongs to a single user.
 */
Favorite.belongsTo(User, { foreignKey: "userId" });

export default Favorite;
