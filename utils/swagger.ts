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
    servers: [
      {
        url: "http://localhost:3000", // ✅ สำหรับตอน dev
        description: "Local dev server",
      },
      {
        url: "https://boardgame-shelf.vercel.app", // ✅ สำหรับ production (เช่น deploy บน Vercel)
        description: "Production server",
      },
    ],
  },
});
