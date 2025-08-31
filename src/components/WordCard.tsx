// src/components/WordCard.tsx
import React, { useState } from 'react';
import { Heart, Volume2, Copy, ExternalLink, BookmarkPlus } from 'lucide-react';
import { Word } from '../types/dictionary';

interface WordCardProps {
  word: Word;
  isDarkMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: (word: string) => void;
  onWordClick: (word: Word) => void;
}

export function WordCard({ word, isDarkMode, isFavorite, onToggleFavorite, onWordClick }: WordCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = () => {
    if (word.audioUrl) {
      setIsPlaying(true);
      const audio = new Audio(word.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      audio.play().catch(() => setIsPlaying(false));
    } else {
      // Fallback: use speech synthesis
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      speechSynthesis.speak(utterance);
    }
  };

  const copyWord = () => {
    navigator.clipboard.writeText(word.word);
  };

  const primaryDefinition = word.definitions[0];

  return (
    <div 
      onClick={() => onWordClick(word)}
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:bg-gray-800/70' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200 hover:bg-white/90'
      } border rounded-2xl p-6 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between mb-4 flex-wrap">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {word.word}
            </h3>
            {word.trending && (
              <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-medium rounded-full">
                Trending
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`text-sm font-mono ${
              isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              {word.phonetic}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playPronunciation();
              }}
              className={`p-1 rounded-full transition-colors ${
                isPlaying
                  ? 'bg-indigo-500 text-white'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700'
                    : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
              }`}
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyWord();
            }}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Copy className="h-4 w-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(word.word);
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : isDarkMode
                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`text-sm font-medium ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`}>
          {primaryDefinition.partOfSpeech}
        </div>
        
        <p className={`text-base leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {primaryDefinition.definition}
        </p>

        {primaryDefinition.example && (
          <blockquote className={`text-sm italic pl-4 border-l-2 ${
            isDarkMode 
              ? 'text-gray-400 border-gray-600' 
              : 'text-gray-600 border-gray-300'
          }`}>
            "{primaryDefinition.example}"
          </blockquote>
        )}

        {word.synonyms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Synonyms:
            </span>
            {word.synonyms.slice(0, 3).map((synonym) => (
              <span
                key={synonym}
                className={`px-2 py-1 text-xs rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {synonym}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={`mt-4 pt-3 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Click to view full details
          </span>
          <ExternalLink className={`h-3 w-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
      </div>
    </div>
  );
}