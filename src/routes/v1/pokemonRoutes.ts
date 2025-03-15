import { Router } from "express";
import { 
  fetchPokemonList, 
  fetchPokemonDetails, 
  addFavoritePokemon, 
  removeFavoritePokemon, 
  listFavoritePokemon, 
  fetchMoveDetails,
  fetchAbilityDetails
} from "../../controllers/pokemonController";
import requireUser from "../../middleware/requiresUser";

const pokemonRouter = Router();

/**
 * @route GET /
 * @description Fetches a list of Pokemon.
 * @access Public
 */
pokemonRouter.get("/", fetchPokemonList);

/**
 * @route POST /favorites
 * @description Adds a Pokemon to the user's favorites.
 * @access Private (Requires authentication)
 */
pokemonRouter.post("/favorites", requireUser, addFavoritePokemon);

/**
 * @route DELETE /favorites
 * @description Removes a Pokemon from the user's favorites.
 * @access Private (Requires authentication)
 */
pokemonRouter.delete("/favorites/:id", requireUser, removeFavoritePokemon);

/**
 * @route GET /favorites
 * @description Retrieves the list of favorite Pokemon for the authenticated user.
 * @access Private (Requires authentication)
 */
pokemonRouter.get("/favorites", requireUser, listFavoritePokemon);

/**
 * @route GET /:name
 * @description Fetches details of a specific Pokemon by name.
 * @access Public
 */
pokemonRouter.get("/:name", fetchPokemonDetails);

/**
 * @route GET /move/:moveName
 * @description Fetches details of a specific move by its name.
 * @access Public
 */
pokemonRouter.get("/move/:moveName", fetchMoveDetails);

/**
 * @route GET /ability/:abilityName
 * @description Fetches details of a specific ability by its name.
 * @access Public
 */
pokemonRouter.get("/ability/:abilityName", fetchAbilityDetails);


export default pokemonRouter;

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: Pokemon management
 */

/**
 * @swagger
 * /v1/pokemon:
 *   get:
 *     summary: Get the list of Pokemon
 *     description: Fetch the first 150 Pokemon.
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   url:
 *                     type: string
 *                   id:
 *                     type: number  
 *                   thumbnail:
 *                     type: string
 */

/**
 * @swagger
 * /v1/pokemon/{name}:
 *   get:
 *     summary: Get Pokemon details
 *     description: Fetch details of a specific Pokemon by ID.
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokemon
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 abilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ability:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                 types:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 */

/**
 * @swagger
 * /v1/pokemon/favorites:
 *   post:
 *     summary: Add a Pokemon to favorites
 *     description: Add a Pokemon to the user's favorites list.
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemonIds:
 *                 type: array
 *                 items:
 *                   type: number
 *             example:
 *               pokemonIds: [1, 2]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoritePokemon:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       url:
 *                         type: string
 *                       id:
 *                         type: number
 *                       thumbnail:
 *                         type: string
 *             example:
 *               favoritePokemon:
 *                 - name: "ivysaur"
 *                   url: "https://pokeapi.co/api/v2/pokemon/2/"
 *                   id: 2
 *                   thumbnail: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/undefined.png"
 *       "404":
 *         description: Pokemon not found or not in favorites.
 *       "500":
 *         description: Internal server error.
 *
 *
 *   get:
 *     summary: Get favorite Pokemon
 *     description: Get the list of favorite Pokemon for a user.
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoritePokemon:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       url:
 *                         type: string
 *                       id:
 *                         type: number
 *                       thumbnail:
 *                         type: string
 *             example:
 *               favoritePokemon:
 *                 - name: "ivysaur"
 *                   url: "https://pokeapi.co/api/v2/pokemon/2/"
 *                   id: 2
 *                   thumbnail: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/undefined.png"
 *       "404":
 *         description: Pokemon not found or not in favorites.
 *       "500":
 *         description: Internal server error.
 */


/**
 * @swagger
 * /v1/pokemon/favorites/{id}:
 *   delete:
 *     summary: Remove a Pokemon from favorites
 *     description: Removes a Pokemon from the user's favorites list.
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Pokemon to remove from favorites.
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoritePokemon:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       url:
 *                         type: string
 *                       id:
 *                         type: number
 *                       thumbnail:
 *                         type: string
 *             example:
 *               favoritePokemon:
 *                 - name: "ivysaur"
 *                   url: "https://pokeapi.co/api/v2/pokemon/2/"
 *                   id: 2
 *                   thumbnail: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/undefined.png"
 *       "404":
 *         description: Pokemon not found or not in favorites.
 *       "500":
 *         description: Internal server error.
 */

/**
 * @swagger
 * /v1/pokemon/move/{moveName}:
 *   get:
 *     summary: Fetches details of a specific move by its name.
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: moveName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the move to fetch details for.
 *     responses:
 *       200:
 *         description: Move details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Move not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /v1/pokemon/ability/{abilityName}:
 *   get:
 *     summary: Fetches details of a specific ability by its name.
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: abilityName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the ability to fetch details for.
 *     responses:
 *       200:
 *         description: Ability details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Ability not found.
 *       500:
 *         description: Internal server error.
 */