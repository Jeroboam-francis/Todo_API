-- CreateTable
CREATE TABLE "tasks_table" (
    "id" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_table_pkey" PRIMARY KEY ("id")
);
