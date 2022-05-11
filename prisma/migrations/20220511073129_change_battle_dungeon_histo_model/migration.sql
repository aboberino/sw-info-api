/*
  Warnings:

  - The primary key for the `BattleDungeonHisto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BattleDungeonHisto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BattleDungeonHisto_id_key";

-- AlterTable
ALTER TABLE "BattleDungeonHisto" DROP CONSTRAINT "BattleDungeonHisto_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BattleDungeonHisto_pkey" PRIMARY KEY ("wizardId", "dungeonId", "stageId");
