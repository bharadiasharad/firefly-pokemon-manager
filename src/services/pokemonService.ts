import axios from "axios";
import { POKEAPI_URL } from "../config/consts";
import Favorite from "../models/Favorite";
import { Pokemon, PokemonDetails } from "../types/Pokemon";

/**
 * Fetches a list of Pokémon from the PokéAPI.
 * @param offset - The number of Pokémon to skip before fetching.
 * @param limit - The number of Pokémon to fetch.
 * @returns A promise resolving to an array of Pokémon objects.
 */
export const getPokemonList = async (offset: number, limit: number): Promise<Pokemon[]> => {
    const response = await axios.get(`${POKEAPI_URL}/pokemon`, {
      params: { offset, limit },
    });
  
    // Extract Pokémon data and assign an ID based on the URL
    const pokemonList = response.data.results.map((pokemon: any) => {
      const id = parseInt(pokemon.url.split("/").filter(Boolean).pop());
      return {
        ...pokemon,
        id,
      };
    });
  
    return pokemonList;
};

/**
 * Fetches detailed information about a specific Pokémon.
 * @param id - The ID of the Pokémon to retrieve details for.
 * @returns A promise resolving to a Pokémon details object.
 */
export const getPokemonDetails = async (id: string): Promise<PokemonDetails> => {
  const response = await axios.get(`${POKEAPI_URL}/pokemon/${id}`);
  const { abilities, types, height, weight, base_experience, stats, moves } = response.data;
  return { abilities, types, height, weight, base_experience, stats, moves };
};

/**
 * Adds a Pokémon to the user's list of favorites.
 * @param userId - The ID of the user adding the favorite.
 * @param pokemonId - The ID of the Pokémon to add as a favorite.
 * @returns A promise resolving to an array of the user's favorite Pokémon.
 */
export const addFavorite = async (userId: number, pokemonId: number): Promise<Favorite[]> => {
  await Favorite.create({ userId, pokemonId }); // Add the favorite to the database
  return Favorite.findAll({ where: { userId } }); // Return updated list of favorites
};

/**
 * Removes a Pokémon from the user's list of favorites.
 * @param userId - The ID of the user removing the favorite.
 * @param pokemonId - The ID of the Pokémon to remove.
 * @returns A promise resolving to an array of the user's remaining favorite Pokémon.
 */
export const removeFavorite = async (userId: number, pokemonId: number): Promise<Favorite[]> => {
  await Favorite.destroy({ where: { userId, pokemonId } }); // Remove the favorite from the database
  return Favorite.findAll({ where: { userId } }); // Return updated list of favorites
};

/**
 * Retrieves a list of favorite Pokémon IDs for a given user.
 * @param userId - The ID of the user whose favorites should be retrieved.
 * @returns A promise resolving to an array of Pokémon IDs.
 */
export const listFavorites = async (userId: number): Promise<number[]> => {
    const favorites = await Favorite.findAll({
      where: { userId },
      attributes: ["pokemonId"], // Only select the pokemonId field
    });
    return favorites.map(favorite => favorite.pokemonId); // Extract and return the list of Pokémon IDs
};
