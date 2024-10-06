import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todos HTTP API',
      version: '1.0.0',
      description: 'Todo HTTP API swagger documentation',
    },
  },
  apis: [
    './src/api/v1/**/*.ts'
  ], // Path to your API routes
};

export const swaggerSpecs = swaggerJsdoc(options);
export const swaggerUI = swaggerUi;
