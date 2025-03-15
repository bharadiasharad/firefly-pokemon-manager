import { Request, Response } from "express";
import { getPokemonList, getPokemonDetails, addFavorite, removeFavorite, listFavorites, getMoveDetails, getAbilityDetails } from "../services/pokemonService";
import { customRequest } from "customDefinition";

/**
 * Fetches a paginated list of Pokemon from the external API.
 * @param req - Express request object containing optional query parameters: offset and limit.
 * @param res - Express response object to return the Pokemon list.
 */
export const fetchPokemonList = async (req: Request, res: Response) => {
    try {
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 150;
        const pokemonList = await getPokemonList(offset, limit);
        res.json(pokemonList);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pokemon data" });
    }
};

/**
 * Fetches details of a specific Pokemon by ID.
 * @param req - Express request object containing the Pokemon ID in the URL params.
 * @param res - Express response object to return the Pokemon details.
 */
export const fetchPokemonDetails = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const pokemonDetails = await getPokemonDetails(name);
        res.json(pokemonDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pokemon details" });
    }
};

/**
 * Adds a Pokemon to the user's favorites list.
 * @param req - Custom request object containing the authenticated user's ID and Pokemon ID in the body.
 * @param res - Express response object to return the updated favorites list.
 */
export const addFavoritePokemon = async (req: customRequest, res: Response) => {
    const { pokemonIds } = req.body;
    const userId = req.user.id;
    const favorites = await addFavorite(userId, pokemonIds);
    res.json(favorites);
};

/**
 * Removes a Pokemon from the user's favorites list.
 * @param req - Custom request object containing the authenticated user's ID and Pokemon ID in the body.
 * @param res - Express response object to return the updated favorites list.
 */
export const removeFavoritePokemon = async (req: customRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user.id;

    // Ensure that the 'id' parameter is a valid number
    const pokemonId = parseInt(id, 10);

    if (isNaN(pokemonId)) {
        return res.status(400).json({ message: "Invalid Pokemon ID" });
    }

    try {
        // Proceed with removing the favorite
        const favorites = await removeFavorite(userId, pokemonId);
        return res.json(favorites);
    } catch (error) {
        console.error("Error removing favorite:", error);
        return res.status(500).json({ message: "Failed to remove favorite Pokemon" });
    }
};


/**
 * Retrieves the user's list of favorite Pokemon.
 * @param req - Custom request object containing the authenticated user's ID.
 * @param res - Express response object to return the list of favorite Pokemon.
 */
export const listFavoritePokemon = async (req: customRequest, res: Response) => {
    const userId = req.user.id;
    const favorites = await listFavorites(userId);
    res.json(favorites);
};

export const fetchMoveDetails = async (req: Request, res: Response) => {
    const { moveName } = req.params;
    try {
      const moveDetails = await getMoveDetails(moveName);
      res.json(moveDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch move details" });
    }
  };
  
  export const fetchAbilityDetails = async (req: Request, res: Response) => {
    const { abilityName } = req.params;
    try {
      const abilityDetails = await getAbilityDetails(abilityName);
      res.json(abilityDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ability details" });
    }
  };