/*
  Warnings:

  - The primary key for the `BattleDungeonHisto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `BattleDungeonHisto` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `BattleDungeonHisto` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "BattleDungeonHisto" DROP CONSTRAINT "BattleDungeonHisto_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "BattleDungeonHisto_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "BattleDungeonHisto_id_key" ON "BattleDungeonHisto"("id");
