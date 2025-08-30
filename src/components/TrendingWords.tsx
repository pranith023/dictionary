import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Word } from '../types/dictionary';
import { WordCard } from './WordCard';

interface TrendingWordsProps {
  words: Word[];
  isDarkMode: boolean;
  favoriteWords: string[];
  onToggleFavorite: (word: string) => void;
  onWordClick: (word: Word) => void;
}

export function TrendingWords({ words, isDarkMode, favoriteWords, onToggleFavorite, onWordClick }: TrendingWordsProps) {
  if (words.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-orange-600' : 'bg-orange-500'
        }`}>
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Trending Words
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {words.map((word) => (
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
  );
}