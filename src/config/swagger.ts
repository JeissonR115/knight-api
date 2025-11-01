import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { readFileSync } from "fs";
import { join } from "path";

const { PORT = '3001', NODE_ENV = 'development', HOST = 'localhost' } = process.env;

export const setupSwagger = (app: Express) => {
  try {
    const swaggerJsonPath = join(process.cwd(), 'docs', 'swagger.json');
    const swaggerDocument = JSON.parse(readFileSync(swaggerJsonPath, 'utf8'));
    
    const serverUrl = NODE_ENV === 'development' ? `${HOST}:${PORT}`: `${HOST}`;
    
    swaggerDocument.servers = [
      {
        url: serverUrl,
        description: `${NODE_ENV} server`
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

    console.log(`📚 Swagger documentation available at ${serverUrl}/api-docs`);
  } catch (error) {
    console.error('❌ Error loading Swagger documentation:', error);
    console.log('💡 Make sure to run: npm run generate:docs');
  }
};