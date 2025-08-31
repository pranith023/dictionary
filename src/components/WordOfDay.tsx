import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Word } from '../types/dictionary';

interface WordOfDayProps {
  word: Word;
  isDarkMode: boolean;
  onWordClick: (word: Word) => void;
}

export function WordOfDay({ word, isDarkMode, onWordClick }: WordOfDayProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      onClick={() => onWordClick(word)}
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-xl border-purple-600/30' 
          : 'bg-gradient-to-br from-purple-50 to-indigo-50 backdrop-blur-xl border-purple-200'
      } border rounded-2xl p-4 sm:p-8 hover:shadow-2xl relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4">
          <Star className="h-20 w-20 md:h-32 md:w-32 text-current" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
          }`}>
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Word of the Day
            </h2>
            <div className="flex items-center space-x-2">
              <Calendar className={`h-4 w-4 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <span className={`text-sm ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {today}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {word.word}
          </h3>
          
          <p className={`text-lg font-mono ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            {word.phonetic}
          </p>
          
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            isDarkMode 
              ? 'bg-purple-600/30 text-purple-300' 
              : 'bg-purple-100 text-purple-700'
          }`}>
            {word.definitions[0].partOfSpeech}
          </div>
          
          <p className={`text-lg leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {word.definitions[0].definition}
          </p>

          {word.definitions[0].example && (
            <blockquote className={`pl-4 border-l-2 italic ${
              isDarkMode 
                ? 'text-gray-400 border-purple-600' 
                : 'text-gray-600 border-purple-300'
            }`}>
              "{word.definitions[0].example}"
            </blockquote>
          )}
        </div>

        <div className={`mt-6 pt-4 border-t ${
          isDarkMode ? 'border-purple-600/30' : 'border-purple-200'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          <span className={`text-sm ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            Click to explore full details →
          </span>
        </div>
      </div>
    </div>
  );
}