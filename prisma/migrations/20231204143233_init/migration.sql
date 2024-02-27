-- AlterTable
ALTER TABLE `Ruta` ADD COLUMN `latitudDestino` DECIMAL(65, 30) NULL,
    ADD COLUMN `latitudOrigen` DECIMAL(65, 30) NULL,
    ADD COLUMN `longitudDestino` DECIMAL(65, 30) NULL,
    ADD COLUMN `longitudOrigen` DECIMAL(65, 30) NULL;
