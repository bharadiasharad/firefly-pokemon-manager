import axios from "axios";
import NodeCache from "node-cache";
import { POKEAPI_URL } from "../config/consts";
import Favorite from "../models/Favorite";
import { Pokemon, PokemonDetails } from "../types/Pokemon";
import { Move } from "Move";
import { Ability } from "Ability";

// Initialize cache with a 100-minute TTL (time-to-live) for caching API results
const cache = new NodeCache({ stdTTL: 6000, checkperiod: 600 });

/**
 * Helper function to fetch and cache data from an external API.
 * @param url - The API URL to fetch data from.
 * @param cacheKey - The cache key for storing/retrieving data.
 * @param transform - A function to transform the data before caching.
 * @returns A promise resolving to the cached or fetched data.
 */
const fetchDataAndCache = async <T>(
  url: string,
  cacheKey: string,
  transform: (data: any) => T
): Promise<T> => {
  // Check if data is already cached
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    console.log(`Returning cached data for ${cacheKey}`);
    return cachedData;
  }

  try {
    const response = await axios.get(url);
    const transformedData = transform(response.data);
    cache.set(cacheKey, transformedData);
    return transformedData;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
};

/**
 * Fetches a list of Pokemon from the PokeAPI.
 * @param offset - The number of Pokemon to skip before fetching.
 * @param limit - The number of Pokemon to fetch.
 * @returns A promise resolving to an array of Pokemon objects.
 */
export const getPokemonList = async (offset: number, limit: number): Promise<Pokemon[]> => {
  const cacheKey = `pokemonList-${offset}-${limit}`;
  return fetchDataAndCache<Pokemon[]>(
    `${POKEAPI_URL}/pokemon?offset=${offset}&limit=${limit}`,
    cacheKey,
    (data) => data.results.map((pokemon: Pokemon) => ({
      ...pokemon,
      id: parseInt(pokemon.url.split("/").filter(Boolean).pop()),
      thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    }))
  );
};

/**
 * Fetches detailed information about a specific Pokemon.
 * @param pokeName - The name of the Pokemon to retrieve details for.
 * @returns A promise resolving to a Pokemon details object.
 */
export const getPokemonDetails = async (pokeName: string): Promise<PokemonDetails> => {
  const cacheKey = pokeName;
  return fetchDataAndCache<PokemonDetails>(
    `${POKEAPI_URL}/pokemon/${pokeName}`,
    cacheKey,
    (data) => ({
      abilities: data.abilities,
      types: data.types,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      stats: data.stats,
      moves: data.moves,
      name: data.name,
      id: data.id
    })
  );
};

/**
 * Fetches the list of all Pokémon and caches it for a day.
 * @returns A promise resolving to an array of all Pokémon.
 */
const getAllPokemonList = async (): Promise<Pokemon[]> => {
  return fetchDataAndCache<Pokemon[]>(
    "https://pokeapi.co/api/v2/pokemon?limit=10000",
    "pokemonList",
    (data) => data.results.map((pokemon: Pokemon) => ({
      ...pokemon,
      id: parseInt(pokemon.url.split("/").filter(Boolean).pop()),
      thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    }))
  );
};

/**
 * Adds multiple Pokémon to the user's list of favorites.
 * @param userId - The ID of the user adding the favorites.
 * @param pokemonIds - An array of IDs of the Pokémon to add as favorites.
 * @returns A promise resolving to an object containing an array of the user's favorite Pokémon details.
 */
export const addFavorite = async (userId: number, pokemonIds: number[]): Promise<{ favoritePokemon: Pokemon[] }> => {
  try {
    const existingFavorites = await Favorite.findAll({
      where: { userId },
      attributes: ["pokemonId"]
    });

    const existingPokemonIds = new Set(existingFavorites.map(favorite => favorite.pokemonId));
    const newPokemonIds = pokemonIds.filter(pokemonId => !existingPokemonIds.has(pokemonId));

    if (newPokemonIds.length > 0) {
      await Favorite.bulkCreate(newPokemonIds.map(pokemonId => ({ userId, pokemonId })));
    }

    const favoritePokemonIds = await Favorite.findAll({
      where: { userId },
      attributes: ["pokemonId"]
    }).then(favorites => favorites.map(favorite => favorite.pokemonId));

    cache.set(`userFavorites_${userId}`, favoritePokemonIds);

    const allPokemon = await getAllPokemonList();
    const favoritePokemon = allPokemon.filter(pokemon => favoritePokemonIds.includes(pokemon.id));

    return { favoritePokemon };
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw new Error("Failed to add favorite Pokémon");
  }
};

/**
 * Removes a Pokemon from the user's list of favorites.
 * @param userId - The ID of the user removing the favorite.
 * @param pokemonId - The ID of the Pokemon to remove.
 * @returns A promise resolving to an array of the user's remaining favorite Pokemon.
 */
export const removeFavorite = async (userId: number, pokemonId: number): Promise<{ favoritePokemon: Pokemon[] }> => {
  try {
    await Favorite.destroy({ where: { userId, pokemonId } });

    const favoritePokemonIds = await Favorite.findAll({
      where: { userId },
      attributes: ["pokemonId"]
    }).then(favorites => favorites.map(favorite => favorite.pokemonId));

    const allPokemon = await getAllPokemonList();
    const favoritePokemon = allPokemon.filter(pokemon => favoritePokemonIds.includes(pokemon.id));

    return { favoritePokemon };
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw new Error("Failed to remove favorite Pokemon");
  }
};

/**
 * Retrieves a list of favorite Pokémon details for a given user.
 * @param userId - The ID of the user whose favorites should be retrieved.
 * @returns A promise resolving to an object containing an array of the user's favorite Pokémon details.
 */
export const listFavorites = async (userId: number): Promise<{ favoritePokemon: Pokemon[] }> => {
  try {
    const favoritePokemonIds = await Favorite.findAll({
      where: { userId },
      attributes: ["pokemonId"]
    }).then(favorites => favorites.map(favorite => favorite.pokemonId));

    const allPokemon = await getAllPokemonList();
    const favoritePokemon = allPokemon.filter(pokemon => favoritePokemonIds.includes(pokemon.id));

    return { favoritePokemon };
  } catch (error) {
    console.error("Error fetching favorites list:", error);
    throw new Error("Failed to fetch favorite Pokémon list");
  }
};

/**
 * Fetches details for a specific move from the PokeAPI.
 * @param moveName - The name of the move.
 * @returns A promise resolving to move details.
 */
export const getMoveDetails = async (moveName: string): Promise<Move> => {
  const cacheKey = moveName;
  return fetchDataAndCache<Move>(
    `https://pokeapi.co/api/v2/move/${moveName}`,
    cacheKey,
    (data) => data
  );
};

/**
 * Fetches details for a specific ability from the PokeAPI.
 * @param abilityName - The name of the ability.
 * @returns A promise resolving to ability details.
 */
export const getAbilityDetails = async (abilityName: string): Promise<Ability> => {
  const cacheKey = abilityName;
  return fetchDataAndCache<Ability>(
    `https://pokeapi.co/api/v2/ability/${abilityName}`,
    cacheKey,
    (data) => data
  );
};
