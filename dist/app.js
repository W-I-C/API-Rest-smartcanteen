"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swaggerUi = require("swagger-ui-express");
const swagger_json_1 = __importDefault(require("./swagger.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const bothRoutes_1 = require("./routes/bothRoutes");
const employeeRoutes_1 = require("./routes/employeeRoutes");
const consumerRoutes_1 = require("./routes/consumerRoutes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(express_1.default.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_json_1.default));
app.use("/api/v1", bothRoutes_1.bothRouter);
app.use("/api/v1/consumer", consumerRoutes_1.consumerRouter);
app.use("/api/v1/employee", employeeRoutes_1.employeeRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT} \nSwagger documentation at http://localhost:${PORT}/api-docs`);
});
//# sourceMappingURL=app.js.map