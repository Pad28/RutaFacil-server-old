"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const limpiarImg = (nombreImg) => {
    try {
        if (!fs_1.default.existsSync(path_1.default.resolve(`uploads/usuarios/${nombreImg}`))) {
            return;
        }
        fs_1.default.unlinkSync(path_1.default.resolve(`uploads/usuarios`) + `/${nombreImg}`);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = limpiarImg;
