-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" VARCHAR(255),
    "coach" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "max_participants" INTEGER NOT NULL,
    "current_participants" INTEGER DEFAULT 0,
    "duration" VARCHAR(50) NOT NULL,
    "sessions" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'upcoming',
    "campaign_goals" TEXT[],
    "target_audience" TEXT NOT NULL,
    "budget" VARCHAR(50) NOT NULL,
    "timeline" VARCHAR(50) NOT NULL,
    "preferred_channels" TEXT[],
    "message_style" VARCHAR(255) NOT NULL,
    "kpis" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_tags" (
    "campaign_id" INTEGER NOT NULL,
    "tag" VARCHAR(50) NOT NULL,

    CONSTRAINT "campaign_tags_pkey" PRIMARY KEY ("campaign_id","tag")
);

-- CreateTable
CREATE TABLE "coaches" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "linkedin_url" VARCHAR(255),
    "website" VARCHAR(255),
    "expertise" TEXT[],
    "experience" VARCHAR(50) NOT NULL,
    "languages" TEXT[],
    "timezone" VARCHAR(50) NOT NULL,
    "availability" VARCHAR(50) NOT NULL,
    "preferred_rate" VARCHAR(50) NOT NULL,
    "certifications" TEXT[],
    "bio" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "role" VARCHAR(255),
    "pricing_tier" VARCHAR(50) NOT NULL,
    "company" VARCHAR(255),
    "industry" VARCHAR(100),
    "company_size" VARCHAR(50),
    "experience_level" VARCHAR(50),
    "coaching_goals" TEXT[],
    "preferred_language" VARCHAR(50),
    "location" VARCHAR(100),
    "heard_from" VARCHAR(100),
    "budget_range" VARCHAR(50),
    "start_timeline" VARCHAR(50),
    "interests" TEXT[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) DEFAULT 'pending',
    "assessmentResults" JSONB,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "sourceUrl" VARCHAR(255) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "imageUrl" TEXT,
    "author" VARCHAR(100),
    "readTime" INTEGER,
    "publishedAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "relevanceScore" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "language" VARCHAR(10) NOT NULL DEFAULT 'en',
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recommendationCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "articleUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coaches_email_key" ON "coaches"("email");

-- CreateIndex
CREATE INDEX "idx_coaches_email" ON "coaches"("email");

-- CreateIndex
CREATE INDEX "idx_coaches_status" ON "coaches"("status");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");

-- CreateIndex
CREATE INDEX "Article_status_idx" ON "Article"("status");

-- CreateIndex
CREATE INDEX "Article_relevanceScore_idx" ON "Article"("relevanceScore");

-- CreateIndex
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");

-- CreateIndex
CREATE INDEX "Article_language_idx" ON "Article"("language");

-- CreateIndex
CREATE INDEX "Article_tags_idx" ON "Article"("tags");

-- CreateIndex
CREATE INDEX "Article_url_idx" ON "Article"("url");

-- AddForeignKey
ALTER TABLE "campaign_tags" ADD CONSTRAINT "campaign_tags_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
