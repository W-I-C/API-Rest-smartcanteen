import express, { request } from 'express';
import swaggerUi = require('swagger-ui-express')
import swaggerDocs from "./swagger.json"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/customers", (req, res) => {
  console.log(request);
  res.status(200).send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT} \nSwagger documentation at http://localhost:${PORT}/api-docs`);
});