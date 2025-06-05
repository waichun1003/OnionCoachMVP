#!/bin/bash

# Setup Deploy Hook for Vercel Scraping Automation
# This script helps configure automatic scraping after each deployment

echo "🚀 Setting up Vercel deployment hooks for automatic scraping..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up post-deployment scraping automation...${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Set environment variables for security
echo -e "${BLUE}Setting up environment variables...${NC}"

# Generate a random secret for the deploy hook
DEPLOY_HOOK_SECRET=$(openssl rand -hex 32)

# Set environment variables in Vercel
vercel env add DEPLOY_HOOK_SECRET production <<< $DEPLOY_HOOK_SECRET
vercel env add DEPLOY_HOOK_SECRET preview <<< $DEPLOY_HOOK_SECRET

# Optional: Set scraper API key for additional security
SCRAPER_API_KEY=$(openssl rand -hex 16)
vercel env add SCRAPER_API_KEY production <<< $SCRAPER_API_KEY
vercel env add SCRAPER_API_KEY preview <<< $SCRAPER_API_KEY

echo -e "${GREEN}✅ Environment variables set up successfully!${NC}"

echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Deploy your project: vercel --prod"
echo "2. Get your deployment URL from Vercel dashboard"
echo "3. Set up a webhook in your Vercel project settings:"
echo "   - Go to Project Settings > Git > Deploy Hooks"
echo "   - Add webhook URL: https://your-domain.vercel.app/api/deploy-hook?secret=$DEPLOY_HOOK_SECRET"
echo "   - This will trigger scraping after each deployment"

echo -e "${GREEN}🎉 Setup complete! Your scraping will now run automatically after deployments.${NC}"

# Save the secrets to a file for reference (optional)
echo "DEPLOY_HOOK_SECRET=$DEPLOY_HOOK_SECRET" > .env.deployment.local
echo "SCRAPER_API_KEY=$SCRAPER_API_KEY" >> .env.deployment.local
echo -e "${YELLOW}💾 Secrets saved to .env.deployment.local (add to .gitignore!)${NC}" 