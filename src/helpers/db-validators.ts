import { Horario, Parada, Reporte, Ruta, RutaGuardada, Usuario, Vehiculo } from "@prisma/client";
import { server } from "..";

const validators = {
    verificarEmailRepetido: async(correo: string) => {
        const validar =  await server.prisma.usuario.findUnique({
            where: { correo }
        });
        
        if(validar){
            throw new Error(`El correo ${correo} ya fue registrado anteriormente`);
        }
        
    },
    varficarEmailExiste: async(correo: string) => {
        const validar =  await server.prisma.usuario.findUnique({
            where: { correo }
        });
        
        if(!validar){
            throw new Error(`El correo ${correo} no existe`);
        }
        
    },
    verficarTelefonoRepetido: async(telefono: string) => {
        const validar = await server.prisma.usuario.findUnique({ where: { telefono } });

        if(validar) {
            throw new Error(`El telefono ${telefono} ya fue registrado anteriormente`);
        } 
    },
    verificarIDExiste: async(id: string, model: 'Usuario' | 'Ruta' | 'Horario' | 'Parada' | 'Vehiculo' | 'RutaGuardada' | 'Reporte' ) => {
        let validar: Usuario | Parada | Ruta | Horario | Vehiculo | RutaGuardada | Reporte | null = null;

        switch (model) {
            case "Usuario":
                validar = await server.prisma.usuario.findUnique({ where: { id } });
                break;

            case "Ruta":
                validar = await server.prisma.ruta.findUnique({ where: { numero: parseInt(id) } });
                break;

            case "Horario":
                validar = await server.prisma.horario.findUnique({ where: { id } });
                break;

            case "Parada":
                validar = await server.prisma.parada.findUnique({ where: { id } });
                break;

            case "Vehiculo":
                validar = await server.prisma.vehiculo.findUnique({ where: { numero: parseInt(id) } });
                break;

            case 'RutaGuardada':
                validar = await server.prisma.rutaGuardada.findUnique({ where: { id } })
                break;

            case 'Reporte':
                validar = await server.prisma.reporte.findUnique({ where: { id } })
                break;
        }

        if(!validar){
            throw new Error('No existe el ID: ' + id);
        }
    },
    validarEnum: async(list: string[], value: string) => {
        if(!list.includes(value)) {
            throw  new Error('El tipo de reporte no es valido');
        }
    }
}

export default validators;