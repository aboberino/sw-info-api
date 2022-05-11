/*
  Warnings:

  - The primary key for the `DungeonCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DungeonCount` table. All the data in the column will be lost.
  - Made the column `dungeonId` on table `DungeonCount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stageId` on table `DungeonCount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wizardId` on table `DungeonCount` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "DungeonCount_id_key";

-- AlterTable
ALTER TABLE "DungeonCount" DROP CONSTRAINT "DungeonCount_pkey",
DROP COLUMN "id",
ALTER COLUMN "dungeonId" SET NOT NULL,
ALTER COLUMN "stageId" SET NOT NULL,
ALTER COLUMN "wizardId" SET NOT NULL,
ADD CONSTRAINT "DungeonCount_pkey" PRIMARY KEY ("wizardId", "dungeonId", "stageId");
