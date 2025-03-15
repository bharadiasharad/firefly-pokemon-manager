import { Request, Response } from "express";
import { getPokemonList, getPokemonDetails, addFavorite, removeFavorite, listFavorites } from "../services/pokemonService";
import { customRequest } from "customDefinition";

/**
 * Fetches a paginated list of Pokémon from the external API.
 * @param req - Express request object containing optional query parameters: offset and limit.
 * @param res - Express response object to return the Pokémon list.
 */
export const fetchPokemonList = async (req: Request, res: Response) => {
    try {
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 150;
        const pokemonList = await getPokemonList(offset, limit);
        res.json(pokemonList);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pokémon data" });
    }
};

/**
 * Fetches details of a specific Pokémon by ID.
 * @param req - Express request object containing the Pokémon ID in the URL params.
 * @param res - Express response object to return the Pokémon details.
 */
export const fetchPokemonDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pokemonDetails = await getPokemonDetails(id);
        res.json(pokemonDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pokémon details" });
    }
};

/**
 * Adds a Pokémon to the user's favorites list.
 * @param req - Custom request object containing the authenticated user's ID and Pokémon ID in the body.
 * @param res - Express response object to return the updated favorites list.
 */
export const addFavoritePokemon = async (req: customRequest, res: Response) => {
    const { id } = req.body;
    const userId = req.user.id;
    const favorites = await addFavorite(userId, id);
    res.json(favorites);
};

/**
 * Removes a Pokémon from the user's favorites list.
 * @param req - Custom request object containing the authenticated user's ID and Pokémon ID in the body.
 * @param res - Express response object to return the updated favorites list.
 */
export const removeFavoritePokemon = async (req: customRequest, res: Response) => {
    const { id } = req.body;
    const userId = req.user.id;
    const favorites = await removeFavorite(userId, id);
    res.json(favorites);
};

/**
 * Retrieves the user's list of favorite Pokémon.
 * @param req - Custom request object containing the authenticated user's ID.
 * @param res - Express response object to return the list of favorite Pokémon.
 */
export const listFavoritePokemon = async (req: customRequest, res: Response) => {
    const userId = req.user.id;
    const favorites = await listFavorites(userId);
    res.json(favorites);
};
