import React from 'react';
import { Search } from 'lucide-react';
import { Word } from '../types/dictionary';
import { WordCard } from './WordCard';
import { ImageDisplay } from './ImageDisplay';

interface SearchResultsProps {
  results: Word[];
  query: string;
  isDarkMode: boolean;
  favoriteWords: string[];
  onToggleFavorite: (word: string) => void;
  onWordClick: (word: Word) => void;
}

export function SearchResults({ 
  results, 
  query, 
  isDarkMode, 
  favoriteWords, 
  onToggleFavorite, 
  onWordClick 
}: SearchResultsProps) {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex p-6 rounded-full mb-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Search className={`h-12 w-12 ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          No results found
        </h3>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Try searching for a different word or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Search Results
        </h2>
        <p className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="md:col-span-1">
          <ImageDisplay query={query} isDarkMode={isDarkMode} />
        </div>
        <div className="md:col-span-1">
          <div className="grid gap-6">
            {results.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                isDarkMode={isDarkMode}
                isFavorite={favoriteWords.includes(word.word)}
                onToggleFavorite={onToggleFavorite}
                onWordClick={onWordClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}