import { useState, useEffect } from "react";
import { useBookmarks } from "./BookmarkContext";

const TMDB_API_KEY = "0df7ebe8a4ed33b8d69c2ea0db419f99";

const Movies = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingStates, setPlayingStates] = useState<{[key: string]: boolean}>({});
  const [videoUrls, setVideoUrls] = useState<{[key: string]: string}>({});
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
        
        // Fetch video trailers for movies
        for (const movie of data.results || []) {
          try {
            const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`);
            const videoData = await videoRes.json();
            const trailer = videoData.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) {
              setVideoUrls(prev => ({
                ...prev,
                [`movie-${movie.id}`]: `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`
              }));
            }
          } catch (error) {
            console.error(`Error fetching video for movie ${movie.id}:`, error);
          }
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Fallback to static data
        setMovies([
          { id: 1, title: "Inception", release_date: "2010", poster_path: null, adult: false },
          { id: 2, title: "The Dark Knight", release_date: "2008", poster_path: null, adult: false },
          { id: 3, title: "Interstellar", release_date: "2014", poster_path: null, adult: false },
          { id: 4, title: "Pulp Fiction", release_date: "1994", poster_path: null, adult: true }
        ]);
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookmarkClick = (movie: any) => {
    toggleBookmark({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      adult: movie.adult,
      type: 'movie'
    });
  };

  const handlePlayPause = (movieId: number) => {
    setPlayingStates(prev => ({
      ...prev,
      [`movie-${movieId}`]: !prev[`movie-${movieId}`]
    }));
  };

  return (
    <div className="px-1 py-6 mt-5 min-w-6xl ml-[8rem] mx-auto ">
      {/* Animated Search Bar */}
      <div className="mb-8 flex items-center">
        <div className="relative flex items-center group transition-all duration-300">
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"></path></svg>
          <input
            type="text"
            placeholder="Search for Movies..."
            className={`bg-transparent outline-none text-slate-100 placeholder:text-slate-400 pl-10 pr-4 py-2 rounded-lg transition-all duration-300 w-32 group-hover:w-72 focus:w-72 ${search ? 'w-72' : ''}`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => e.currentTarget.classList.add('w-72')}
            onBlur={e => { if (!e.currentTarget.value) e.currentTarget.classList.remove('w-72'); }}
            style={{ minWidth: 0 }}
          />
          {/* Animated bottom border */}
          <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-slate-700 rounded transition-all duration-300
            ${search ? 'opacity-100' : 'opacity-0'}
            group-hover:opacity-100 focus-within:opacity-100`}></span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-slate-100 mb-6 ">Popular Movies</h2>
      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : filteredMovies.length === 0 && search ? (
        <div className="text-slate-400 flex items-center gap-2">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
          No results found for "{search}" in Movies
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {filteredMovies.map((movie, idx) => (
            <div key={movie.id} className="bg-transparent rounded-2xl overflow-hidden shadow-md group transition-all duration-200">
              <div className="relative">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/400x225?text=No+Image'}
                  alt={movie.title}
                  className={`w-full aspect-video object-cover rounded-2xl transition-opacity duration-300 ${playingStates[`movie-${movie.id}`] ? 'opacity-0' : 'opacity-100'}`}
                  onError={e => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image'; }}
                />
                {videoUrls[`movie-${movie.id}`] && (
                  <iframe
                    id={`video-movie-${movie.id}`}
                    className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-300 ${playingStates[`movie-${movie.id}`] ? 'opacity-100' : 'opacity-0'}`}
                    src={playingStates[`movie-${movie.id}`] ? videoUrls[`movie-${movie.id}`] : ''}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                <button
                  className={`absolute top-3 right-3 rounded-full p-2 bg-black/60 text-white transition-all duration-300 shadow hover:bg-red-500 ${isBookmarked(movie.id, 'movie') ? 'bg-red-500' : ''}`}
                  onClick={() => handleBookmarkClick(movie)}
                  aria-label="Bookmark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2 2 0 0 1 2 2v16l-7-5-7 5V5a2 2 0 0 1 2-2h10z" />
                  </svg>
                </button>
                <button
                  className="absolute top-3 left-3 rounded-full p-2 bg-black/60 text-white transition-all duration-300 shadow hover:bg-white/20 group-hover:bg-white/20"
                  onClick={() => handlePlayPause(movie.id)}
                  aria-label={playingStates[`movie-${movie.id}`] ? "Pause" : "Play"}
                >
                  {playingStates[`movie-${movie.id}`] ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="px-4 pt-3 pb-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>{movie.release_date?.slice(0, 4)}</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 inline-block text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" /></svg>Movie</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  <span>{movie.adult ? "18+" : "PG"}</span>
                </div>
                <div className="text-white font-semibold text-base leading-tight mt-1" style={{textShadow:'0 1px 2px #000'}}> 
                  {movie.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies; 