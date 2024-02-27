/*
  Warnings:

  - A unique constraint covering the columns `[id_ruta]` on the table `RutaGuardada` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RutaGuardada_id_ruta_key` ON `RutaGuardada`(`id_ruta`);
