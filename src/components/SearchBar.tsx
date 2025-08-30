import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, X } from 'lucide-react';
import { getSuggestions } from '../data/mockWords';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  isDarkMode: boolean;
  onAddToHistory: (query: string) => void;
}

export function SearchBar({ query, onQueryChange, onSearch, isDarkMode, onAddToHistory }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { isListening, transcript, isSupported, error, hasPermission, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onQueryChange(transcript);
      handleSearch(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (query.length > 0) {
      const newSuggestions = getSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onAddToHistory(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        const selectedSuggestion = suggestions[activeSuggestion];
        onQueryChange(selectedSuggestion);
        handleSearch(selectedSuggestion);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onQueryChange(suggestion);
    handleSearch(suggestion);
  };

  const handleVoiceSearch = () => {
    if (!isSupported) {
      alert('Voice search is not supported in your browser');
      return;
    }
    
    if (hasPermission === false) {
      alert('Microphone permission is required for voice search. Please enable it in your browser settings.');
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const clearSearch = () => {
    onQueryChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative group ${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-600' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl transition-all duration-300 hover:shadow-lg focus-within:shadow-xl focus-within:scale-[1.02]`}>
        <div className="flex items-center px-4 py-3">
          <Search className={`h-5 w-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(suggestions.length > 0)}
            placeholder="Search for any word..."
            className={`flex-1 mx-3 bg-transparent border-none outline-none text-lg ${
              isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
            }`}
          />

          <div className="flex items-center space-x-2">
            {query && (
              <button
                onClick={clearSearch}
                className={`p-1 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={handleVoiceSearch}
              title={
                error
                  ? `Voice search error: ${error}`
                  : isListening
                    ? 'Stop listening'
                    : hasPermission === false
                      ? 'Microphone permission required'
                      : 'Start voice search'
              }
              className={`p-2 rounded-lg transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : error
                    ? 'bg-red-500/20 text-red-500'
                    : !isSupported
                      ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                      : hasPermission === false
                        ? isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              disabled={!isSupported}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            {error && (
              <div className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-lg text-sm ${
                isDarkMode ? 'bg-red-600/20 text-red-400 border border-red-600/30' : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {error}
              </div>
            )}

            <button
              onClick={() => handleSearch()}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              } hover:scale-105 active:scale-95`}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-2 ${
          isDarkMode 
            ? 'bg-gray-800/95 backdrop-blur-xl border-gray-600' 
            : 'bg-white/95 backdrop-blur-xl border-gray-200'
        } border rounded-xl shadow-xl z-50 overflow-hidden`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 transition-colors ${
                index === activeSuggestion
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700'
                  : isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Search className="h-4 w-4 opacity-60" />
                <span className="font-medium">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}