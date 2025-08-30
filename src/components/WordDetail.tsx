import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Volume2, Copy, Share2, BookmarkPlus, Globe } from 'lucide-react';
import { Word } from '../types/dictionary';
import { fetchTranslations } from '../data/mockWords';

interface WordDetailProps {
  word: Word;
  isDarkMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: (word: string) => void;
  onBack: () => void;
}

export function WordDetail({ word, isDarkMode, isFavorite, onToggleFavorite, onBack }: WordDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({
    'hi': 'Loading...',
    'te': 'Loading...',
    'ta': 'Loading...'
  });

  useEffect(() => {
    const fetchAllTranslations = async () => {
      const hi = await fetchTranslations(word.word, 'hi');
      const te = await fetchTranslations(word.word, 'te');
      const ta = await fetchTranslations(word.word, 'ta');
      setTranslations({ 'hi': hi, 'te': te, 'ta': ta });
    };

    fetchAllTranslations();
  }, [word.word]);

  const playPronunciation = () => {
    if (word.audioUrl) {
      setIsPlaying(true);
      const audio = new Audio(word.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      audio.play().catch(() => setIsPlaying(false));
    } else {
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

  const shareWord = () => {
    if (navigator.share) {
      navigator.share({
        title: `${word.word} - WordVault`,
        text: `Check out the definition of "${word.word}": ${word.definitions[0].definition}`,
        url: window.location.href,
      });
    } else {
      copyWord();
    }
  };

  const languageList = [
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' }
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyWord}
              className={`p-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Copy className="h-4 w-4" />
            </button>
            
            <button
              onClick={shareWord}
              className={`p-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => onToggleFavorite(word.word)}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
                    : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Word Header */}
        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
            : 'bg-white/70 backdrop-blur-xl border-gray-200'
        } border rounded-2xl p-8 mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {word.word}
              </h1>
              <div className="flex items-center space-x-3">
                <span className={`text-lg font-mono ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  {word.phonetic}
                </span>
                <button
                  onClick={playPronunciation}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isPlaying
                      ? 'bg-indigo-500 text-white scale-110'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700'
                        : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
                  }`}
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {word.trending && (
              <div className="text-center">
                <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-medium rounded-full">
                  🔥 Trending
                </span>
              </div>
            )}
          </div>

          {/* Translations */}
          <div className={`${
            isDarkMode 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-gray-50 border-gray-200'
          } border rounded-xl p-4`}>
            <div className="flex items-center space-x-2 mb-3">
              <Globe className={`h-4 w-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Translations
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {languageList.map((lang) => (
                <div key={lang.code} className="text-center">
                  <div className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {lang.name}
                  </div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {translations[lang.code] || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Definitions */}
        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
            : 'bg-white/70 backdrop-blur-xl border-gray-200'
        } border rounded-2xl p-8 mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Definitions
          </h2>
          
          <div className="space-y-6">
            {word.definitions.map((def, index) => (
              <div key={index} className={`pb-6 ${
                index < word.definitions.length - 1 
                  ? isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  : ''
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    isDarkMode 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {def.partOfSpeech}
                  </span>
                  {def.level && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      def.level === 'formal'
                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                        : def.level === 'informal'
                          ? isDarkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
                          : isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {def.level}
                    </span>
                  )}
                </div>
                
                <p className={`text-lg mb-3 leading-relaxed ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {def.definition}
                </p>
                
                {def.example && (
                  <blockquote className={`pl-4 border-l-2 italic ${
                    isDarkMode 
                      ? 'text-gray-400 border-gray-600' 
                      : 'text-gray-600 border-gray-300'
                  }`}>
                    "{def.example}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Synonyms & Antonyms */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {word.synonyms.length > 0 && (
            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
                : 'bg-white/70 backdrop-blur-xl border-gray-200'
            } border rounded-2xl p-6`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Synonyms
              </h3>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((synonym) => (
                  <span
                    key={synonym}
                    className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      isDarkMode 
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}

          {word.antonyms.length > 0 && (
            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
                : 'bg-white/70 backdrop-blur-xl border-gray-200'
            } border rounded-2xl p-6`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Antonyms
              </h3>
              <div className="flex flex-wrap gap-2">
                {word.antonyms.map((antonym) => (
                  <span
                    key={antonym}
                    className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      isDarkMode 
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {antonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Etymology */}
        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
            : 'bg-white/70 backdrop-blur-xl border-gray-200'
        } border rounded-2xl p-6`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Etymology
          </h3>
          <p className={`text-base leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {word.etymology}
          </p>
        </div>
      </div>
    </div>
  );
}