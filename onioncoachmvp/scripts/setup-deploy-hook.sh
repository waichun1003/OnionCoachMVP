#!/bin/bash

# Setup Deploy Hook for Vercel Scraping Automation
# This script helps configure automatic scraping after each deployment

echo "🚀 Setting up Vercel deployment hooks for automatic scraping..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up post-deployment scraping automation...${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Generate secrets
echo -e "${BLUE}Generating security secrets...${NC}"
DEPLOY_HOOK_SECRET=$(openssl rand -hex 32)
SCRAPER_API_KEY=$(openssl rand -hex 16)
NEXTAUTH_SECRET=$(openssl rand -hex 32)

# Create .env.production file
echo -e "${BLUE}Creating .env.production file...${NC}"
cat > .env.production << EOF
# Production Environment Variables for Vercel
# Update DATABASE_URL and NEXTAUTH_URL with your actual values

# Database Configuration
DATABASE_URL="your_production_database_url_here"

# NextAuth Configuration  
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"

# Scraping Automation
DEPLOY_HOOK_SECRET="$DEPLOY_HOOK_SECRET"
SCRAPER_API_KEY="$SCRAPER_API_KEY"

# Optional: Additional Configuration
NEXT_PUBLIC_APP_ENV="production"
EOF

echo -e "${GREEN}✅ .env.production file created successfully!${NC}"

# Create .env.preview file as well
echo -e "${BLUE}Creating .env.preview file...${NC}"
cat > .env.preview << EOF
# Preview Environment Variables for Vercel
# Update DATABASE_URL and NEXTAUTH_URL with your actual values

# Database Configuration
DATABASE_URL="your_preview_database_url_here"

# NextAuth Configuration  
NEXTAUTH_URL="https://your-preview-domain.vercel.app"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"

# Scraping Automation
DEPLOY_HOOK_SECRET="$DEPLOY_HOOK_SECRET"
SCRAPER_API_KEY="$SCRAPER_API_KEY"

# Optional: Additional Configuration
NEXT_PUBLIC_APP_ENV="preview"
EOF

echo -e "${GREEN}✅ .env.preview file created successfully!${NC}"

echo -e "${YELLOW}📝 IMPORTANT: Please update these values in your .env files:${NC}"
echo "1. DATABASE_URL - Your PostgreSQL database connection string"
echo "2. NEXTAUTH_URL - Your actual Vercel domain"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit .env.production and .env.preview with your actual DATABASE_URL and domain"
echo "2. Deploy your project: vercel --prod"
echo "3. Set up a webhook in your Vercel project settings:"
echo "   - Go to Project Settings > Git > Deploy Hooks"
echo "   - Add webhook URL: https://your-domain.vercel.app/api/deploy-hook?secret=$DEPLOY_HOOK_SECRET"
echo "   - This will trigger scraping after each deployment"

echo -e "${GREEN}🎉 Setup complete! Vercel will automatically load environment variables from .env.production${NC}"

# Save the secrets to a file for reference
echo "DEPLOY_HOOK_SECRET=$DEPLOY_HOOK_SECRET" > .env.deployment.local
echo "SCRAPER_API_KEY=$SCRAPER_API_KEY" >> .env.deployment.local
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" >> .env.deployment.local
echo -e "${YELLOW}💾 Secrets saved to .env.deployment.local for reference${NC}" 