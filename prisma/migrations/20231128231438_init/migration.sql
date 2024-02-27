-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(20) NOT NULL,
    `apellidos` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(10) NOT NULL,
    `foto` VARCHAR(40) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `rol` ENUM('ADMIN', 'USER', 'CHOFER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    UNIQUE INDEX `Usuario_telefono_key`(`telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruta` (
    `id` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL AUTO_INCREMENT,
    `destino` VARCHAR(40) NOT NULL,
    `origen` VARCHAR(40) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Ruta_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` VARCHAR(191) NOT NULL,
    `dia_hora` DATETIME(3) NOT NULL,
    `numero_ruta` INTEGER NOT NULL,
    `id_ruta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parada` (
    `id` VARCHAR(191) NOT NULL,
    `nombre_calle` VARCHAR(20) NOT NULL,
    `coordenadas` VARCHAR(100) NOT NULL,
    `numero_ruta` INTEGER NOT NULL,
    `id_ruta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `numero` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_chofer` VARCHAR(20) NOT NULL,
    `apellidos_chofer` VARCHAR(20) NULL,
    `numero_ruta` INTEGER NOT NULL,
    `id_usuario` VARCHAR(36) NOT NULL,
    `id_ruta` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vehiculo_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RutaGuardada` (
    `id` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(36) NOT NULL,
    `id_ruta` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reporte` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('QUEJA', 'SUGERENCIA') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `id_usuario` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_id_ruta_fkey` FOREIGN KEY (`id_ruta`) REFERENCES `Ruta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `Parada_id_ruta_fkey` FOREIGN KEY (`id_ruta`) REFERENCES `Ruta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_id_ruta_fkey` FOREIGN KEY (`id_ruta`) REFERENCES `Ruta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RutaGuardada` ADD CONSTRAINT `RutaGuardada_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RutaGuardada` ADD CONSTRAINT `RutaGuardada_id_ruta_fkey` FOREIGN KEY (`id_ruta`) REFERENCES `Ruta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
