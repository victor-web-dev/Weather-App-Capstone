-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
