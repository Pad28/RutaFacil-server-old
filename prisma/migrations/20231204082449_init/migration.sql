/*
  Warnings:

  - Added the required column `id_ruta` to the `Notificacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notificacion` ADD COLUMN `id_ruta` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Notificacion` ADD CONSTRAINT `Notificacion_id_ruta_fkey` FOREIGN KEY (`id_ruta`) REFERENCES `Ruta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
