import React from 'react';
import { Heart, BookOpen } from 'lucide-react';
import { Word } from '../types/dictionary';
import { WordCard } from './WordCard';

interface FavoritesTabProps {
  favoriteWords: Word[];
  isDarkMode: boolean;
  onToggleFavorite: (word: string) => void;
  onWordClick: (word: Word) => void;
}

export function FavoritesTab({ favoriteWords, isDarkMode, onToggleFavorite, onWordClick }: FavoritesTabProps) {
  if (favoriteWords.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex p-6 rounded-full mb-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Heart className={`h-12 w-12 ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          No favorites yet
        </h3>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Start exploring words and add them to your favorites
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-red-600' : 'bg-red-500'
        }`}>
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Favorites
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {favoriteWords.length} saved word{favoriteWords.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {favoriteWords.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            isDarkMode={isDarkMode}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onWordClick={onWordClick}
          />
        ))}
      </div>
    </div>
  );
}