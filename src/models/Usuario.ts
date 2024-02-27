import { Usuario, Rol_Usuario, $Enums } from "@prisma/client";

interface UsuarioInterface extends Usuario {
    id: string;
    correo: string;
    nombre: string;
    apellidos: string;
    password: string;
    telefono: string;
    foto: string | null;
    estado: boolean;
    rol: $Enums.Rol_Usuario;
}

