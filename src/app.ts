import express, { request } from 'express';
import swaggerUi = require('swagger-ui-express')
// import swaggerJsDoc = require('swagger-jsdoc')
import swaggerDocs from "./swagger.json"

const app = express();
const port = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      tittle: "Documentação da API SmartCanteen",
      description: "Documentação da api de suporte à aplicação SmartCanteen",
      contact: { "name": "Teste", "email": "teste@teste.com" },
      version: "1.0.0",
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["app.ts"]
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/customers", (req, res) => {
  console.log(request);
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port} \nSwagger documentation at http://localhost:${port}/api-docs`);
});