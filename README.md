# 🎬 Entertainment Web App

A modern, responsive web application for discovering and bookmarking movies and TV shows. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎭 Movie & TV Show Discovery**: Browse trending and popular content from TMDb API
- **🔍 Smart Search**: Search across movies and TV shows with real-time filtering
- **❤️ Bookmark System**: Save your favorite movies and TV shows for later viewing
- **🎥 Video Trailers**: Watch YouTube trailers directly in the app
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🌙 Dark Theme**: Modern dark interface for comfortable viewing

## 🚀 Live Demo

[Add your deployed URL here]

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **API**: TMDb (The Movie Database)
- **State Management**: React Context API

## 📱 Pages & Features

### 🏠 Home Page
- Trending movies with horizontal scrolling
- Movie recommendations in grid layout
- Search functionality across all content
- Video trailer playback

### 🎬 Movies Page
- Popular movies display
- Search and filter functionality
- Bookmark movies for later
- Video trailer integration

### 📺 TV Series Page
- Trending TV shows
- Popular TV series
- Search and bookmark functionality
- Video trailer playback

### 🔖 Bookmarks Page
- View all bookmarked content
- Separate sections for movies and TV shows
- Search within bookmarks
- Remove bookmarks functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sk5190/entertainment-web-app.git
   cd entertainment-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```



3. **Get TMDb API Key**
   - Visit [TMDb](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Add your API key to the `.env` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables
4. Deploy automatically

### GitHub Pages
1. Add `gh-pages` to devDependencies
2. Add deploy script to package.json
3. Run `npm run deploy`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## 📁 Project Structure

```
src/
├── Components/
│   ├── Home.tsx          # Home page with trending content
│   ├── Movies.tsx        # Movies page
│   ├── TvSeries.tsx      # TV Series page
│   ├── Bookmark.tsx      # Bookmarks page
│   ├── BookmarkContext.tsx # Global bookmark state
│   └── Nav.tsx           # Navigation component
├── routes/
│   └── Mainroute.tsx     # App routing
├── App.tsx               # Main app component
└── main.tsx             # Entry point
```

## 🎨 Features in Detail

### Video Integration
- YouTube trailer playback
- Smooth transitions between poster and video
- Autoplay and loop functionality
- Responsive video containers

### Bookmark System
- Global state management with Context API
- Persistent storage with localStorage
- Separate sections for movies and TV shows
- Search within bookmarks

### Search Functionality
- Real-time search across all content
- Animated search bar with expand/collapse
- Search results with "No results found" messages
- Search across trending, popular, and bookmarked content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie and TV show data
- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Contact

- GitHub: [@sk5190](https://github.com/yourusername)
- Email: ssk282175@gmail.com

---

⭐ Star this repository if you found it helpful!
