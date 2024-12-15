import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for Task Management',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerDocs = swaggerJsdoc(options);
export default swaggerDocs;
