// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WordOfDay } from './components/WordOfDay';
import { TrendingWords } from './components/TrendingWords';
import { SearchResults } from './components/SearchResults';
import { FavoritesTab } from './components/FavoritesTab';
import { HistoryTab } from './components/HistoryTab';
import { WordDetail } from './components/WordDetail';
import { CommunityTab } from './components/CommunityTab';
import { BlogTab } from './components/BlogTab';
import { GamificationTab } from './components/GamificationTab';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  getWordOfTheDay, 
  getTrendingWords, 
  searchWords,
  fetchWord
} from './data/mockWords';
import { Word, UserPreferences } from './types/dictionary';

interface UserStats {
  level: number;
  points: number;
  streak: number;
  totalSearches: number;
  voiceSearchCount: number;
}

function App() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('wordvault-preferences', {
    theme: 'light',
    language: 'en',
    favoriteWords: [],
    searchHistory: []
  });

  const [userStats, setUserStats] = useLocalStorage<UserStats>('wordvault-stats', {
    level: 1,
    points: 150,
    streak: 5,
    totalSearches: 23,
    voiceSearchCount: 8
  });

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Word[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [wordOfTheDay, setWordOfTheDay] = useState<Word | null>(null);
  const [trendingWords, setTrendingWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isDarkMode = preferences.theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const [wotd, trending] = await Promise.all([getWordOfTheDay(), getTrendingWords()]);
      setWordOfTheDay(wotd);
      setTrendingWords(trending);
      setIsLoading(false);
    };
    fetchInitialData();
  }, []);

  const toggleDarkMode = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    const results = await searchWords(searchQuery);
    setSearchResults(results);
    setActiveTab('search');
    
    // Update user stats
    setUserStats(prev => ({
      ...prev,
      totalSearches: prev.totalSearches + 1,
      points: prev.points + 5
    }));
    
    if (results.length === 1) {
      setSelectedWord(results[0]);
    }
    
    setIsLoading(false);
  };

  const addToHistory = (searchQuery: string) => {
    setPreferences(prev => ({
      ...prev,
      searchHistory: [
        searchQuery,
        ...prev.searchHistory.filter(item => item !== searchQuery)
      ].slice(0, 50) // Keep only last 50 searches
    }));
  };

  const toggleFavorite = (word: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteWords: prev.favoriteWords.includes(word)
        ? prev.favoriteWords.filter(w => w !== word)
        : [...prev.favoriteWords, word]
    }));
  };

  const clearHistory = () => {
    setPreferences(prev => ({
      ...prev,
      searchHistory: []
    }));
  };

  const handleWordClick = async (word: Word) => {
    // Re-fetch the word to get all details, in case it was a search result with partial data
    setIsLoading(true);
    const fullWord = await fetchWord(word.word);
    if (fullWord) {
      setSelectedWord(fullWord);
      addToHistory(fullWord.word);
    }
    setIsLoading(false);
  };

  const handleBackToSearch = () => {
    setSelectedWord(null);
    setQuery('');
    setSearchResults([]);
    setActiveTab('home');
  };

  const favoriteWordObjects = preferences.favoriteWords.map(wordName => {
    return {
      word: wordName,
      // Placeholder data for favorited words since we don't have all details readily available
      // In a real app, you would fetch this data or store it in local storage
      id: wordName,
      phonetic: '',
      definitions: [{ partOfSpeech: '', definition: 'Please click to view full details.' }],
      synonyms: [],
      antonyms: [],
      etymology: '',
      translations: {},
    };
  });

  if (selectedWord) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <WordDetail
          word={selectedWord}
          isDarkMode={isDarkMode}
          isFavorite={preferences.favoriteWords.includes(selectedWord.word)}
          onToggleFavorite={toggleFavorite}
          onBack={handleBackToSearch}
        />
      </div>
    );
  }
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-16">
          <svg className="animate-spin h-10 w-10 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Fetching word data...
          </p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="text-center mb-8">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Discover the Power of Words
              </h1>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Premium dictionary with instant search, pronunciations, and translations
              </p>
            </div>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              isDarkMode={isDarkMode}
              onAddToHistory={addToHistory}
            />
            {wordOfTheDay && (
              <div className="mb-12 mt-12">
                <WordOfDay
                  word={wordOfTheDay}
                  isDarkMode={isDarkMode}
                  onWordClick={handleWordClick}
                />
              </div>
            )}
            {trendingWords.length > 0 && (
              <TrendingWords
                words={trendingWords}
                isDarkMode={isDarkMode}
                favoriteWords={preferences.favoriteWords}
                onToggleFavorite={toggleFavorite}
                onWordClick={handleWordClick}
              />
            )}
          </>
        );
      case 'search':
        return (
          <>
            <div className="text-center mb-8">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Discover the Power of Words
              </h1>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Premium dictionary with instant search, pronunciations, and translations
              </p>
            </div>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              isDarkMode={isDarkMode}
              onAddToHistory={addToHistory}
            />
            <div className="mt-12">
              <SearchResults
                results={searchResults}
                query={query}
                isDarkMode={isDarkMode}
                favoriteWords={preferences.favoriteWords}
                onToggleFavorite={toggleFavorite}
                onWordClick={handleWordClick}
              />
            </div>
          </>
        );
      case 'favorites':
        return (
          <FavoritesTab
            favoriteWords={favoriteWordObjects}
            isDarkMode={isDarkMode}
            onToggleFavorite={toggleFavorite}
            onWordClick={handleWordClick}
          />
        );
      case 'history':
        return (
          <HistoryTab
            searchHistory={preferences.searchHistory}
            isDarkMode={isDarkMode}
            onSearch={handleSearch}
            onClearHistory={clearHistory}
          />
        );
      case 'community':
        return <CommunityTab isDarkMode={isDarkMode} />;
      case 'blog':
        return <BlogTab isDarkMode={isDarkMode} />;
      case 'progress':
        return (
          <GamificationTab
            isDarkMode={isDarkMode}
            userLevel={userStats.level}
            userPoints={userStats.points}
            userStreak={userStats.streak}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    }`}>
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;