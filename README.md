
# Pokemon Management API

## Overview

This backend is built with **Node.js** and **Express**. The application fetches data from the **PokeAPI** as a proxy and allows users to manage their favorite Pokémon, which are persisted through a PostgreSQL database.

## Approach

- **PokeAPI Proxy**: The application uses the PokeAPI as a proxy to fetch Pokémon data.
- **Caching**: Third-party responses from PokeAPI are cached to reduce delays in repeated requests, improving performance.
- **Swagger**: A **Swagger** interface is implemented for API testing and documentation, making it easier to interact with the API.
- **Authorization**: Middlewares are used to authorize API requests to ensure secure access to specific endpoints.
- **User-Specific Favorites**: Favorites are stored based on the logged-in user to ensure that each user's preferences are handled separately.
- **Database Compatibility**: Built with **Sequelize ORM**, this app supports multiple databases, including **Postgres**, **MySQL**, **MariaDB**, **SQLite**, **DB2**, **Microsoft SQL Server**, and **Snowflake**. This allows the same codebase to work across various database systems.
- **API Routes**: API routes are defined in the `routes` folder for better organization and scalability.
- **Written in TypeScript**: The application is written in TypeScript, providing type safety and improved developer experience.
- **Public Data**: All Pokémon data routes are public and accessible without authentication.
- **Protected Routes**: All favorite-related routes are restricted to authenticated users only.
- **Authentication**: **JWT tokens** are used for user authentication and authorization.
- **Logging**: **Winston** is used for logging

Additionally, the API includes endpoints for fetching a Pokémon’s **moves** and **abilities**.

For **infinite scrolling**, pagination is implemented with `offset` and `limit` parameters.

## Features

- **Favorites Management**:
  - **Add a favorite**: Save a Pokémon to the user’s favorites list.
  - **Delete a favorite**: Remove a Pokémon from the user’s favorites list.
  - **List favorites**: Return the current list of the user's favorite Pokémon.
- **Database Persistence**: Favorite Pokémon are stored in a PostgreSQL database.
- **Pokémon Data**: Get detailed data on Pokémon, including abilities and moves.
- **Infinite Scrolling**: Fetch Pokémon data with pagination using `offset` and `limit` to handle large datasets.

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **PostgreSQL** (or any compatible database)
- **npm** or **yarn**

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
   git clone https://github.com/bharadiasharad/firefly-pokemon-manager.git
   cd firefly-pokemon-manager
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the project:

   ```sh
   npm run build
   ```

4. Start the server:

   ```sh
   npm start
   ```

The server will be running at `http://localhost:8080`.

### Swagger Documentation

Once the server is running, you can access the **Swagger** documentation and API testing interface at:

```
http://localhost:8080/api/v1/docs
```

## API Documentation

Detailed API documentation is available via Swagger at the endpoint above. Use it to explore all available endpoints, including examples for Pokémon data, managing favorites, and additional functionality like moves and abilities.

## Limitations

- **Test Cases**: Test cases are not added yet. 

Let us know if you need any additional functionality or clarification!
