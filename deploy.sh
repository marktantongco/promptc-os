#!/bin/bash
# promptc OS — Deployment Script
# Run this script after cloning to deploy to GitHub and Vercel

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           promptc OS — Deployment Script v2026.3            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
REPO_NAME="promptc-os"
GITHUB_USER="marktantongco"
FULL_REPO="${GITHUB_USER}/${REPO_NAME}"

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

# Step 2: Build for production
echo "🔨 Step 2: Building for production..."
npm run build

# Step 3: Create GitHub repository
echo ""
echo "🐙 Step 3: Creating GitHub repository..."
echo "   Repository: https://github.com/${FULL_REPO}"
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    # Check if already authenticated
    if gh auth status &> /dev/null; then
        echo "   ✓ GitHub CLI authenticated"
        # Create repo if it doesn't exist
        if gh repo view "${FULL_REPO}" &> /dev/null; then
            echo "   ✓ Repository already exists"
        else
            gh repo create "${FULL_REPO}" --public --source=. --push --description="promptc OS — AI Prompt Engineering Master Reference"
            echo "   ✓ Repository created and pushed"
        fi
    else
        echo "   ⚠ GitHub CLI not authenticated. Run: gh auth login"
        echo "   Then create repo manually at: https://github.com/new"
    fi
else
    echo "   ⚠ GitHub CLI not installed. Install it: https://cli.github.com/"
    echo "   Or create repo manually at: https://github.com/new"
fi

# Step 4: Push to GitHub
echo ""
echo "📤 Step 4: Pushing to GitHub..."
git remote get-url origin &> /dev/null || git remote add origin "https://github.com/${FULL_REPO}.git"
git push -u origin main --force
echo "   ✓ Pushed to main branch"

# Step 5: Deploy to GitHub Pages
echo ""
echo "📄 Step 5: Deploying to GitHub Pages..."
echo "   Option A: Automatic (via GitHub Actions) — Already configured!"
echo "            Go to: https://github.com/${FULL_REPO}/settings/pages"
echo "            Set Source: GitHub Actions → deploy.yml"
echo ""
echo "   Option B: Manual with gh-pages branch:"
echo "            npx gh-pages -d dist"

# Step 6: Deploy to Vercel
echo ""
echo "🚀 Step 6: Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    echo "   Vercel CLI detected. Running deployment..."
    vercel --yes --prod
    echo "   ✓ Deployed to Vercel!"
else
    echo "   Install Vercel CLI: npm install -g vercel"
    echo "   Then run: vercel --prod"
    echo "   Or deploy via: https://vercel.com/new/clone?repository-url=https://github.com/${FULL_REPO}"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    Deployment Complete!                     ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║ GitHub:  https://github.com/${FULL_REPO}             ║"
echo "║ Pages:   https://${GITHUB_USER}.github.io/${REPO_NAME}/           ║"
echo "║ Vercel:  https://${REPO_NAME}.vercel.app (after deploy)      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
