/*
  Warnings:

  - You are about to drop the column `coordenadas` on the `Parada` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Parada` DROP COLUMN `coordenadas`,
    ADD COLUMN `latitud` DECIMAL(65, 30) NULL,
    ADD COLUMN `longitud` DECIMAL(65, 30) NULL;
