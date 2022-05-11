/*
  Warnings:

  - You are about to drop the column `arenaEnergy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `eventCoin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardCrystal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardCrystalPaid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardEnergy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardEnergyMax` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardLevel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardMana` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wizardName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_wizardId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "arenaEnergy",
DROP COLUMN "eventCoin",
DROP COLUMN "wizardCrystal",
DROP COLUMN "wizardCrystalPaid",
DROP COLUMN "wizardEnergy",
DROP COLUMN "wizardEnergyMax",
DROP COLUMN "wizardId",
DROP COLUMN "wizardLevel",
DROP COLUMN "wizardMana",
DROP COLUMN "wizardName",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Wizard" (
    "wizardId" INTEGER NOT NULL,
    "wizardName" TEXT,
    "wizardMana" INTEGER,
    "wizardCrystal" INTEGER,
    "wizardCrystalPaid" INTEGER,
    "wizardLevel" INTEGER,
    "wizardEnergy" INTEGER,
    "wizardEnergyMax" INTEGER,
    "arenaEnergy" INTEGER,
    "eventCoin" INTEGER,
    "userId" TEXT,

    CONSTRAINT "Wizard_pkey" PRIMARY KEY ("wizardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wizard_wizardId_key" ON "Wizard"("wizardId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Wizard" ADD CONSTRAINT "Wizard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
