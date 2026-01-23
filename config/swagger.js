const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sayarat Backend API",
      version: "1.0.0",
      description: "API documentation for Sayarat backend",
    },
    servers: [
      {
        url: "http://13.51.216.122:3000/",
        description: "Local server",
      },
      {
        url: "http://13.51.216.122:3000/",
        description: "Production server",
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
   apis: ["./routes/*.js"], // 👈 scan all route files
  // apis: ['./routes/admin-analytics.js']

};

module.exports = swaggerJsdoc(options);
