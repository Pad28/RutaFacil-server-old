/*
  Warnings:

  - Added the required column `descripcion` to the `Reporte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reporte` ADD COLUMN `descripcion` VARCHAR(200) NOT NULL;
