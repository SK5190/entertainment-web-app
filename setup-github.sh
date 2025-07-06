#!/bin/bash

echo "🚀 Setting up GitHub repository for Entertainment Web App"
echo "========================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Entertainment Web App

- React 19 + TypeScript + Vite
- TMDb API integration
- Video trailer playback
- Bookmark system
- Responsive design with Tailwind CSS
- Search functionality across all content"

echo ""
echo "🎉 Git repository is ready!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub named 'entertainment-web-app'"
echo "2. Run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/entertainment-web-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Get your TMDb API key from: https://www.themoviedb.org/settings/api"
echo ""
echo "4. Deploy to your preferred platform:"
echo "   - Vercel (recommended): https://vercel.com"
echo "   - Netlify: https://netlify.com"
echo "   - GitHub Pages: npm run deploy"
echo ""
echo "📖 See DEPLOYMENT.md for detailed deployment instructions" 