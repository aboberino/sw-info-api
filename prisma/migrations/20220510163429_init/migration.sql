-- CreateTable
CREATE TABLE "BattleDungeonHisto" (
    "id" TEXT NOT NULL,
    "dungeonId" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "autoRepeat" INTEGER,
    "wizardId" INTEGER NOT NULL,
    "winLose" BOOLEAN,
    "clearTime" INTEGER,

    CONSTRAINT "BattleDungeonHisto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "wizardId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonCount" (
    "id" TEXT NOT NULL,
    "dungeonName" TEXT,
    "dungeonId" INTEGER,
    "stageId" INTEGER,
    "clearTimeAverage" INTEGER,
    "win" INTEGER,
    "lose" INTEGER,
    "wizardId" INTEGER,

    CONSTRAINT "DungeonCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BattleDungeonHisto_id_key" ON "BattleDungeonHisto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DungeonCount_id_key" ON "DungeonCount"("id");
