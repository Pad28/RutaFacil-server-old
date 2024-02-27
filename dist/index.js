"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const Server_1 = __importDefault(require("./models/Server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new Server_1.default();
exports.server = server;
server.listen();
