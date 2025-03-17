const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon Manager API documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${process.env.HOST}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["src/routes/v1/*.ts", "src/app.ts"],
};
export { swaggerOption };
