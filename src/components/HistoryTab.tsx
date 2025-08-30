import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryTabProps {
  searchHistory: string[];
  isDarkMode: boolean;
  onSearch: (query: string) => void;
  onClearHistory: () => void;
}

export function HistoryTab({ searchHistory, isDarkMode, onSearch, onClearHistory }: HistoryTabProps) {
  if (searchHistory.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex p-6 rounded-full mb-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Clock className={`h-12 w-12 ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          No search history
        </h3>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Your recent searches will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Search History
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {searchHistory.length} recent search{searchHistory.length !== 1 ? 'es' : ''}
            </p>
          </div>
        </div>

        <button
          onClick={onClearHistory}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
          }`}
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid gap-3">
        {searchHistory.slice().reverse().map((search, index) => (
          <button
            key={`${search}-${index}`}
            onClick={() => onSearch(search)}
            className={`text-left p-4 rounded-xl transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/70 backdrop-blur-xl border-gray-200 hover:bg-white/90'
            } border hover:shadow-lg group`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {search}
              </span>
              <Clock className={`h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}