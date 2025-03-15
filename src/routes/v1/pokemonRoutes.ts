import { Router } from "express";
import { 
  fetchPokemonList, 
  fetchPokemonDetails, 
  addFavoritePokemon, 
  removeFavoritePokemon, 
  listFavoritePokemon 
} from "../../controllers/pokemonController";
import requireUser from "../../middleware/requiresUser";

const pokemonRouter = Router();

/**
 * @route GET /
 * @description Fetches a list of Pokémon.
 * @access Public
 */
pokemonRouter.get("/", fetchPokemonList);

/**
 * @route POST /favorites
 * @description Adds a Pokémon to the user's favorites.
 * @access Private (Requires authentication)
 */
pokemonRouter.post("/favorites", requireUser, addFavoritePokemon);

/**
 * @route DELETE /favorites
 * @description Removes a Pokémon from the user's favorites.
 * @access Private (Requires authentication)
 */
pokemonRouter.delete("/favorites", requireUser, removeFavoritePokemon);

/**
 * @route GET /favorites
 * @description Retrieves the list of favorite Pokémon for the authenticated user.
 * @access Private (Requires authentication)
 */
pokemonRouter.get("/favorites", listFavoritePokemon);

/**
 * @route GET /:id
 * @description Fetches details of a specific Pokémon by ID.
 * @access Public
 */
pokemonRouter.get("/:id", fetchPokemonDetails);

export default pokemonRouter;

/**
 * @swagger
 * tags:
 *   name: Pokémon
 *   description: Pokémon management
 */

/**
 * @swagger
 * /v1/pokemon:
 *   get:
 *     summary: Get the list of Pokémon
 *     description: Fetch the first 150 Pokémon.
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
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
 */

/**
 * @swagger
 * /v1/pokemon/{id}:
 *   get:
 *     summary: Get Pokémon details
 *     description: Fetch details of a specific Pokémon by ID.
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon
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
 *     summary: Add a Pokémon to favorites
 *     description: Add a Pokémon to the user's favorites list.
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *             example:
 *               id: 5
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
 *                   userId:
 *                     type: number
 *                   pokemonId:
 *                     type: number
 *
 *   delete:
 *     summary: Remove a Pokémon from favorites
 *     description: Remove a Pokémon from the user's favorites list.
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: id
 *             example:
 *               id: 5
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
 *                   userId:
 *                     type: number
 *                   pokemonId:
 *                     type: number
 *
 *   get:
 *     summary: Get favorite Pokémon
 *     description: Get the list of favorite Pokémon for a user.
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
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
 *                   userId:
 *                     type: number
 *                   pokemonId:
 *                     type: number
 */