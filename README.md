# Pokémon Management API

## Overview

This backend is built with Node.js and Express. The application fetches data from the PokéAPI and allows users to manage their favorite Pokémon, which are persisted through a PostgreSQL database.

## Features

- **Node.js and Express** to route requests from the frontend to the PokéAPI.
- **Favorites Management System**:
  - **Add a favorite**: Save a Pokémon to the user’s favorites list.
  - **Delete a favorite**: Remove a Pokémon from the user’s favorites list.
  - **List favorites**: Return the current list of favorite Pokémon.
- **Database Persistence**: Favorite Pokémon are stored in a PostgreSQL database.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```sh
DB_HOST=localhost
DB_NAME=pokemon
DB_PASSWORD=admin
DB_PORT=5432
DB_TYPE=postgres
DB_USER=postgres
PORT=8080

TOKEN_EXPIRY_HOUR=168
SECRET=askjfghhwifuhgw

```

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pokemon-management-api.git
   cd pokemon-management-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   ```sh
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

4. Start the server:

   ```sh
   npm start
   ```

The server will be running at [http://localhost:3000](http://localhost:3000).

## API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Endpoints

### Pokémon

- **GET** `/api/v1/pokemon`
  - Fetch the list of Pokémon with pagination.
  - **Query Parameters**:
    - `offset`: The number of items to skip before starting to collect the result set.
    - `limit`: The number of items to return.

- **GET** `/api/v1/pokemon/:id`
  - Fetch details of a specific Pokémon by ID.

### Favorites

- **POST** `/api/v1/favorites`
  - Add a Pokémon to the user's favorites list.
  - **Request Body**:
    ```json
    {
      "id": "The ID of the Pokémon"
    }
    ```

- **DELETE** `/api/v1/favorites`
  - Remove a Pokémon from the user's favorites list.
  - **Request Body**:
    ```json
    {
      "id": "The ID of the Pokémon"
    }
    ```

- **GET** `/api/v1/favorites`
  - Get the list of favorite Pokémon for the authenticated user.