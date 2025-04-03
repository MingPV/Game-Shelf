// utils/swagger.ts
import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => createSwaggerSpec({
  apiFolder: "app/api",
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Shelf API",
      version: "1.0.0",
      description: "API documentation for Game Shelf",
    },
  },
});
