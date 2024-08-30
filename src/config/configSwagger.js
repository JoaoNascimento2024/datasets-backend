import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DataHub.IO',
      version: '1.0.0',
      description: ""
    },
    servers: [{url: "http://localhost:3000"}]
  },
  apis: ['./src/routers/*.js'] // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
