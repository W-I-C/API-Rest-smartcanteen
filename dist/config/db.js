"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const pg_1 = __importDefault(require("pg"));
const createClient = () => {
    const user = process.env.DB_USERNAME;
    const host = process.env.DB_HOST;
    const database = process.env.DB_NAME;
    const password = process.env.DB_PASSWORD;
    const port = process.env.DB_PORT;
    const client = new pg_1.default.Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: Number(port)
    });
    client.connect();
    return client;
};
exports.createClient = createClient;
//# sourceMappingURL=db.js.map