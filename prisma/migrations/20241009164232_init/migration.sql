-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL DEFAULT '名無しさん',
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
