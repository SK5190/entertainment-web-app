# 🚀 Deployment Guide

This guide will help you deploy your Entertainment Web App to various hosting platforms.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **TMDb API Key**: Get your API key from [TMDb](https://www.themoviedb.org/settings/api)
3. **Node.js**: Ensure you have Node.js installed (v18 or higher)

## 🔧 Environment Setup

Before deploying, make sure to:

1. **Update package.json**: Replace `yourusername` with your actual GitHub username
2. **Add Environment Variables**: You'll need to add your TMDb API key to your hosting platform

## 🌐 Deployment Options

### 1. Vercel (Recommended) ⭐

**Pros**: Fast, easy, great for React apps, automatic deployments
**Cons**: None for this use case

#### Steps:
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Add environment variable: `VITE_TMDB_API_KEY` with your API key

4. **Deploy**
   - Vercel will automatically deploy your app
   - You'll get a URL like: `https://entertainment-web-app.vercel.app`

### 2. Netlify

**Pros**: Free tier, easy setup, good performance
**Cons**: Slightly slower than Vercel

#### Steps:
1. **Push to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Choose your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add `VITE_TMDB_API_KEY` with your API key

5. **Deploy**
   - Netlify will automatically deploy your app

### 3. GitHub Pages

**Pros**: Free, integrated with GitHub
**Cons**: Requires manual deployment, no environment variables support

#### Steps:
1. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/entertainment-web-app",
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

**Note**: GitHub Pages doesn't support environment variables, so you'll need to hardcode your API key temporarily or use a different approach.

### 4. Firebase Hosting

**Pros**: Google's infrastructure, good performance
**Cons**: Requires Google account

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Configure**
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub Actions: No

5. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔑 Environment Variables

For all platforms except GitHub Pages, you'll need to add your TMDb API key:

- **Variable Name**: `VITE_TMDB_API_KEY`
- **Value**: Your TMDb API key

## 📝 Post-Deployment Checklist

- [ ] Test all features work correctly
- [ ] Check responsive design on mobile
- [ ] Verify video trailers play properly
- [ ] Test bookmark functionality
- [ ] Update README.md with your live URL
- [ ] Share your deployed app!

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check if all dependencies are installed
   - Ensure TypeScript compilation passes
   - Verify environment variables are set

2. **API Key Issues**
   - Make sure your TMDb API key is correct
   - Check if the key has proper permissions
   - Verify the environment variable name matches exactly

3. **Routing Issues**
   - For SPA routing, ensure your hosting platform is configured for single-page apps
   - Add a `_redirects` file for Netlify if needed

4. **Video Not Playing**
   - Check if YouTube embeds are allowed on your domain
   - Verify CORS settings if applicable

## 🎉 Success!

Once deployed, your Entertainment Web App will be live and accessible to anyone with the URL. Don't forget to:

1. Update your README.md with the live URL
2. Share your project on social media
3. Add it to your portfolio
4. Consider adding analytics to track usage

## 📞 Need Help?

If you encounter any issues:
1. Check the hosting platform's documentation
2. Look at the build logs for error messages
3. Verify all environment variables are set correctly
4. Test locally first with `npm run build && npm run preview` 