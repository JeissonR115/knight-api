import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { readFileSync } from "fs";
import { join } from "path";

const { PORT, NODE_ENV, HOST } = process.env;

export const setupSwagger = (app: Express) => {
  try {
    // Lee el archivo swagger.json generado por tsoa
    const swaggerJsonPath = join(process.cwd(), 'docs', 'swagger.json');
    const swaggerDocument = JSON.parse(readFileSync(swaggerJsonPath, 'utf8'));
    
    // Opcional: Actualiza dinámicamente los servers
    const serverUrl = `${HOST}:${PORT}`;
    swaggerDocument.servers = [
      {
        url:serverUrl,
        description: `${NODE_ENV || 'development'} server`
      }
    ];

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: "Knight API - Auto Documentation",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      }
    }));

    console.log(`Swagger documentation available at ${HOST}:${PORT}/api-docs`);
  } catch (error) {
    console.error('Error loading Swagger documentation:', error);
    console.log('Make sure to run: npm run generate:docs');
  }
};