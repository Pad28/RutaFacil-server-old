# API - REST

Esta API requiere Node.js para ejecutarse. Sigue los siguientes pasos para configurar y ejecutar el servidor.

## Pasos de instalación

1. Clona o descarga este repositorio.

2. Desde la carpeta raíz del proyecto, ejecuta el comando siguiente para instalar las dependencias: `npm i`

3. Crea un archivo llamado `.env` en la carpeta raíz del proyecto y define las variables de entorno necesarias. Estas variables se describen a continuación.

4. Para ejecutar el sistema en producción, utiliza el siguiente comando: `npm run start`

5. Para ejecutar en modo de desarrollo, usa el comando siguiente: `npm run dev`. Ten en cuenta que necesitarás instalar `nodemon` como dependencia de desarrollo: `npm i --save-dev nodemon`

## Variables de entorno

Asegúrate de definir las siguientes variables de entorno en tu archivo `.env`:

- `DATABASE_URL`: URL de MySQL para la conexión y autenticación de la base de datos.
- `PORT`: Puerto en el que estará activo el servidor API-REST.
- `SECRETORPRIVATEKEY`: Clave para la firma y verificacion de tokens.
