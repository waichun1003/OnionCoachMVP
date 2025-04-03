-- CreateTable
CREATE TABLE "pricing_waitlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "linkedin_url" TEXT,
    "goals" TEXT,
    "selected_tier" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pricing_waitlist_pkey" PRIMARY KEY ("id")
);
