/*
  Warnings:

  - You are about to drop the `assessment_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "assessment_tokens";

-- CreateTable
CREATE TABLE "AssessmentToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentToken_token_key" ON "AssessmentToken"("token");
