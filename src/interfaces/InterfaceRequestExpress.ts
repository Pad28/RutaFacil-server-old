import { Usuario } from "@prisma/client";
import { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            authenticatedUser: Usuario;
        }   
    }
}