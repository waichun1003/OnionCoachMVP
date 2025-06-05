#!/bin/bash

# Setup Cron Jobs for Article Scraping
# This script helps configure different cron schedules for Vercel

echo "⏰ Setting up cron jobs for article scraping..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Choose a cron schedule:${NC}"
echo "1. Every 6 hours (default) - 0 */6 * * *"
echo "2. Every 4 hours - 0 */4 * * *"
echo "3. Every 12 hours - 0 */12 * * *"
echo "4. Daily at 6 AM UTC - 0 6 * * *"
echo "5. Every 2 hours - 0 */2 * * *"
echo "6. Custom schedule"

read -p "Enter your choice (1-6): " choice

case $choice in
  1) SCHEDULE="0 */6 * * *"; DESC="Every 6 hours";;
  2) SCHEDULE="0 */4 * * *"; DESC="Every 4 hours";;
  3) SCHEDULE="0 */12 * * *"; DESC="Every 12 hours";;
  4) SCHEDULE="0 6 * * *"; DESC="Daily at 6 AM UTC";;
  5) SCHEDULE="0 */2 * * *"; DESC="Every 2 hours";;
  6) 
    read -p "Enter custom cron schedule (e.g., '0 */3 * * *'): " SCHEDULE
    DESC="Custom schedule"
    ;;
  *) SCHEDULE="0 */6 * * *"; DESC="Every 6 hours (default)";;
esac

echo -e "${BLUE}Updating vercel.json with schedule: ${YELLOW}$SCHEDULE${NC} ($DESC)"

# Update vercel.json with the new schedule
cat > vercel.json << EOF
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npx prisma generate && npx next build",
  "devCommand": "next dev",
  "installCommand": "npm cache clean --force && npm install --no-audit --prefer-offline --no-fund || npm install --no-audit --no-fund",
  "outputDirectory": ".next",
  "regions": ["iad1", "sfo1"],
  "crons": [
    {
      "path": "/api/scrape",
      "schedule": "$SCHEDULE"
    }
  ],
  "functions": {
    "src/app/api/scrape/route.ts": {
      "maxDuration": 300
    },
    "src/app/api/deploy-hook/route.ts": {
      "maxDuration": 300
    }
  }
}
EOF

echo -e "${GREEN}✅ Cron schedule updated successfully!${NC}"

echo -e "${BLUE}🧪 Testing options:${NC}"
echo "1. Test locally: npm run test:scraper"
echo "2. Test cron locally: npm run test:cron"
echo "3. Test production scraping: npm run scrape:prod"
echo "4. Test deploy hook: npm run trigger:deploy-hook"

echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Commit and deploy to Vercel"
echo "2. Vercel will automatically run scraping at: $DESC"
echo "3. Check Vercel Functions logs to monitor cron execution"
echo "4. Each deployment will also trigger automatic scraping"

echo -e "${GREEN}🎉 Cron configuration complete!${NC}" 