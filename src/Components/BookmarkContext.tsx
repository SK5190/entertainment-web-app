import React, { createContext, useContext, useState, useEffect } from 'react';

interface BookmarkItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  adult?: boolean;
  type: 'movie' | 'tv';
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (item: BookmarkItem) => void;
  removeBookmark: (id: number, type: 'movie' | 'tv') => void;
  isBookmarked: (id: number, type: 'movie' | 'tv') => boolean;
  toggleBookmark: (item: BookmarkItem) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (item: BookmarkItem) => {
    setBookmarks(prev => {
      const exists = prev.some(bookmark => bookmark.id === item.id && bookmark.type === item.type);
      if (!exists) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeBookmark = (id: number, type: 'movie' | 'tv') => {
    setBookmarks(prev => prev.filter(bookmark => !(bookmark.id === id && bookmark.type === type)));
  };

  const isBookmarked = (id: number, type: 'movie' | 'tv') => {
    return bookmarks.some(bookmark => bookmark.id === id && bookmark.type === type);
  };

  const toggleBookmark = (item: BookmarkItem) => {
    if (isBookmarked(item.id, item.type)) {
      removeBookmark(item.id, item.type);
    } else {
      addBookmark(item);
    }
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      toggleBookmark
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}; 