import React, { useState, useEffect } from 'react';
import { useBookmarks } from './BookmarkContext';

const TMDB_API_KEY = "0df7ebe8a4ed33b8d69c2ea0db419f99";

const Bookmark = () => {
  const [search, setSearch] = useState("");
  const [playingStates, setPlayingStates] = useState<{[key: string]: boolean}>({});
  const [videoUrls, setVideoUrls] = useState<{[key: string]: string}>({});
  const { bookmarks, removeBookmark } = useBookmarks();

  // Separate movies and TV shows from bookmarks
  const bookmarkedMovies = bookmarks.filter(item => item.type === 'movie');
  const bookmarkedShows = bookmarks.filter(item => item.type === 'tv');

  // Filter based on search
  const filteredMovies = bookmarkedMovies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredShows = bookmarkedShows.filter((show) =>
    show.name?.toLowerCase().includes(search.toLowerCase())
  );

  const allFilteredContent = [...filteredMovies, ...filteredShows];

  // Fetch video trailers for bookmarked content
  useEffect(() => {
    const fetchVideos = async () => {
      for (const item of bookmarks) {
        try {
          const endpoint = item.type === 'movie' 
            ? `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${TMDB_API_KEY}`
            : `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${TMDB_API_KEY}`;
          
          const videoRes = await fetch(endpoint);
          const videoData = await videoRes.json();
          const trailer = videoData.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
          
          if (trailer) {
            setVideoUrls(prev => ({
              ...prev,
              [`${item.type}-${item.id}`]: `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`
            }));
          }
        } catch (error) {
          console.error(`Error fetching video for ${item.type} ${item.id}:`, error);
        }
      }
    };

    if (bookmarks.length > 0) {
      fetchVideos();
    }
  }, [bookmarks]);

  const handleRemoveBookmark = (id: number, type: 'movie' | 'tv') => {
    removeBookmark(id, type);
  };

  const handlePlayPause = (itemId: number, type: string) => {
    setPlayingStates(prev => ({
      ...prev,
      [`${type}-${itemId}`]: !prev[`${type}-${itemId}`]
    }));
  };

  return (
    <div className="px-1 py-6 mt-5 min-w-6xl ml-[8rem] mx-auto">
      {/* Animated Search Bar */}
      <div className="mb-8 flex items-center">
        <div className="relative flex items-center group transition-all duration-300">
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"></path></svg>
          <input
            type="text"
            placeholder="Search for bookmarked content..."
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

      <h2 className="text-2xl font-semibold text-slate-100 mb-6">Bookmarked Content</h2>
      
      {bookmarks.length === 0 ? (
        <div className="text-slate-400 text-center py-8">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="currentColor" viewBox="0 0 17 20">
            <path d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z" />
          </svg>
          <p className="text-lg">No bookmarked content yet</p>
          <p className="text-sm text-slate-500 mt-2">Start bookmarking movies and TV shows to see them here!</p>
        </div>
      ) : search ? (
        allFilteredContent.length === 0 ? (
          <div className="text-slate-400 flex items-center gap-2">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
            No results found for "{search}" in Bookmarks
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {allFilteredContent.map((item) => (
              <div key={`${item.id}-${item.type}`} className="bg-transparent rounded-2xl overflow-hidden shadow-md group transition-all duration-200">
                <div className="relative">
                  <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/400x225?text=No+Image'}
                    alt={item.title || item.name}
                    className={`w-full aspect-video object-cover rounded-2xl transition-opacity duration-300 ${playingStates[`${item.type}-${item.id}`] ? 'opacity-0' : 'opacity-100'}`}
                    onError={e => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image'; }}
                  />
                  {videoUrls[`${item.type}-${item.id}`] && (
                    <iframe
                      id={`video-${item.type}-${item.id}`}
                      className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-300 ${playingStates[`${item.type}-${item.id}`] ? 'opacity-100' : 'opacity-0'}`}
                      src={playingStates[`${item.type}-${item.id}`] ? videoUrls[`${item.type}-${item.id}`] : ''}
                      title={item.title || item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <button 
                    className="absolute top-3 right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-600 transition-colors shadow"
                    onClick={() => handleRemoveBookmark(item.id, item.type)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2 2 0 0 1 2 2v16l-7-5-7 5V5a2 2 0 0 1 2-2h10z" />
                    </svg>
                  </button>
                  <button
                    className="absolute top-3 left-3 rounded-full p-2 bg-black/60 text-white transition-all duration-300 shadow hover:bg-white/20 group-hover:bg-white/20"
                    onClick={() => handlePlayPause(item.id, item.type)}
                    aria-label={playingStates[`${item.type}-${item.id}`] ? "Pause" : "Play"}
                  >
                    {playingStates[`${item.type}-${item.id}`] ? (
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
                    <span>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}</span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    <span className="flex items-center gap-1">
                      {item.title ? (
                        <>
                          <svg className="w-4 h-4 inline-block text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" /></svg>Movie
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 inline-block text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" /></svg>TV Series
                        </>
                      )}
                    </span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    <span>{item.adult ? "18+" : "PG"}</span>
                  </div>
                  <div className="text-white font-semibold text-base leading-tight mt-1" style={{textShadow:'0 1px 2px #000'}}>
                    {item.title || item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-8">
          {/* Bookmarked Movies Section */}
          {bookmarkedMovies.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Bookmarked Movies</h3>
              {filteredMovies.length === 0 && search ? (
                <div className="text-slate-400 flex items-center gap-2">
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  No results found for "{search}" in Bookmarked Movies
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredMovies.map((movie) => (
                    <div key={`${movie.id}-${movie.type}`} className="bg-transparent rounded-2xl overflow-hidden shadow-md group transition-all duration-200">
                      <div className="relative">
                        <img
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/400x225?text=No+Image'}
                          alt={movie.title}
                          className={`w-full aspect-video object-cover rounded-2xl transition-opacity duration-300 ${playingStates[`${movie.type}-${movie.id}`] ? 'opacity-0' : 'opacity-100'}`}
                          onError={e => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image'; }}
                        />
                        {videoUrls[`${movie.type}-${movie.id}`] && (
                          <iframe
                            id={`video-${movie.type}-${movie.id}`}
                            className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-300 ${playingStates[`${movie.type}-${movie.id}`] ? 'opacity-100' : 'opacity-0'}`}
                            src={playingStates[`${movie.type}-${movie.id}`] ? videoUrls[`${movie.type}-${movie.id}`] : ''}
                            title={movie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        <button 
                          className="absolute top-3 right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-600 transition-colors shadow"
                          onClick={() => handleRemoveBookmark(movie.id, movie.type)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2 2 0 0 1 2 2v16l-7-5-7 5V5a2 2 0 0 1 2-2h10z" />
                          </svg>
                        </button>
                        <button
                          className="absolute top-3 left-3 rounded-full p-2 bg-black/60 text-white transition-all duration-300 shadow hover:bg-white/20 group-hover:bg-white/20"
                          onClick={() => handlePlayPause(movie.id, movie.type)}
                          aria-label={playingStates[`${movie.type}-${movie.id}`] ? "Pause" : "Play"}
                        >
                          {playingStates[`${movie.type}-${movie.id}`] ? (
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
          )}

          {/* Bookmarked TV Shows Section */}
          {bookmarkedShows.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Bookmarked TV Shows</h3>
              {filteredShows.length === 0 && search ? (
                <div className="text-slate-400 flex items-center gap-2">
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  No results found for "{search}" in Bookmarked TV Shows
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {bookmarkedShows.map((show) => (
                    <div key={`${show.id}-${show.type}`} className="bg-transparent rounded-2xl overflow-hidden shadow-md group transition-all duration-200">
                      <div className="relative">
                        <img
                          src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'https://via.placeholder.com/400x225?text=No+Image'}
                          alt={show.name}
                          className={`w-full aspect-video object-cover rounded-2xl transition-opacity duration-300 ${playingStates[`${show.type}-${show.id}`] ? 'opacity-0' : 'opacity-100'}`}
                          onError={e => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image'; }}
                        />
                        {videoUrls[`${show.type}-${show.id}`] && (
                          <iframe
                            id={`video-${show.type}-${show.id}`}
                            className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-300 ${playingStates[`${show.type}-${show.id}`] ? 'opacity-100' : 'opacity-0'}`}
                            src={playingStates[`${show.type}-${show.id}`] ? videoUrls[`${show.type}-${show.id}`] : ''}
                            title={show.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        <button 
                          className="absolute top-3 right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-600 transition-colors shadow"
                          onClick={() => handleRemoveBookmark(show.id, show.type)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2 2 0 0 1 2 2v16l-7-5-7 5V5a2 2 0 0 1 2-2h10z" />
                          </svg>
                        </button>
                        <button
                          className="absolute top-3 left-3 rounded-full p-2 bg-black/60 text-white transition-all duration-300 shadow hover:bg-white/20 group-hover:bg-white/20"
                          onClick={() => handlePlayPause(show.id, show.type)}
                          aria-label={playingStates[`${show.type}-${show.id}`] ? "Pause" : "Play"}
                        >
                          {playingStates[`${show.type}-${show.id}`] ? (
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
                          <span>{show.first_air_date?.slice(0, 4)}</span>
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          <span className="flex items-center gap-1"><svg className="w-4 h-4 inline-block text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" /></svg>TV Series</span>
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          <span>{show.adult ? "18+" : "PG"}</span>
                        </div>
                        <div className="text-white font-semibold text-base leading-tight mt-1" style={{textShadow:'0 1px 2px #000'}}>
                          {show.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmark;