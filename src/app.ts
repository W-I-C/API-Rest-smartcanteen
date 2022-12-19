import express, { request } from 'express';
import swaggerUi = require('swagger-ui-express')
import swaggerDocs from "./swagger.json"
import dotenv from "dotenv";
import { bothRouter } from "./routes/bothRoutes";
import { employeeRouter } from './routes/employeeRoutes';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/api/v1", bothRouter);
app.use("/api/v1/employee", employeeRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT} \nSwagger documentation at http://localhost:${PORT}/api-docs`);
});