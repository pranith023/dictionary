import React, { useState } from 'react';
import { Users, Plus, ThumbsUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { WordSuggestion } from '../types/community';
import { mockWordSuggestions } from '../data/mockCommunity';

interface CommunityTabProps {
  isDarkMode: boolean;
}

export function CommunityTab({ isDarkMode }: CommunityTabProps) {
  const [suggestions] = useState<WordSuggestion[]>(mockWordSuggestions);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    word: '',
    definition: '',
    partOfSpeech: 'noun',
    example: '',
    category: 'general' as const
  });

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('New suggestion:', newSuggestion);
    setShowSuggestForm(false);
    setNewSuggestion({
      word: '',
      definition: '',
      partOfSpeech: 'noun',
      example: '',
      category: 'general'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700';
      case 'rejected':
        return isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700';
      default:
        return isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'slang':
        return isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700';
      case 'technical':
        return isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'regional':
        return isDarkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-700';
      default:
        return isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'
          }`}>
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Community
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Help expand our dictionary together
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSuggestForm(true)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            isDarkMode
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          } hover:scale-105 active:scale-95`}
        >
          <Plus className="h-4 w-4" />
          <span>Suggest Word</span>
        </button>
      </div>

      {/* Suggest Word Form */}
      {showSuggestForm && (
        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
            : 'bg-white/70 backdrop-blur-xl border-gray-200'
        } border rounded-2xl p-6 mb-8`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Suggest a New Word
          </h3>
          
          <form onSubmit={handleSubmitSuggestion} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Word
                </label>
                <input
                  type="text"
                  value={newSuggestion.word}
                  onChange={(e) => setNewSuggestion(prev => ({ ...prev, word: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Enter the word"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Part of Speech
                </label>
                <select
                  value={newSuggestion.partOfSpeech}
                  onChange={(e) => setNewSuggestion(prev => ({ ...prev, partOfSpeech: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                >
                  <option value="noun">Noun</option>
                  <option value="verb">Verb</option>
                  <option value="adjective">Adjective</option>
                  <option value="adverb">Adverb</option>
                  <option value="interjection">Interjection</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Definition
              </label>
              <textarea
                value={newSuggestion.definition}
                onChange={(e) => setNewSuggestion(prev => ({ ...prev, definition: e.target.value }))}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Provide a clear definition"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Example (Optional)
              </label>
              <input
                type="text"
                value={newSuggestion.example}
                onChange={(e) => setNewSuggestion(prev => ({ ...prev, example: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Show how the word is used"
              />
            </div>

            <div className="flex items-center justify-between">
              <select
                value={newSuggestion.category}
                onChange={(e) => setNewSuggestion(prev => ({ ...prev, category: e.target.value as any }))}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              >
                <option value="general">General</option>
                <option value="slang">Slang</option>
                <option value="technical">Technical</option>
                <option value="regional">Regional</option>
              </select>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSuggestForm(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  } hover:scale-105 active:scale-95`}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Word Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
                : 'bg-white/70 backdrop-blur-xl border-gray-200'
            } border rounded-xl p-6 transition-all duration-200 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {suggestion.word}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(suggestion.category)}`}>
                    {suggestion.category}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(suggestion.status)}`}>
                    {getStatusIcon(suggestion.status)}
                    <span className="ml-1">{suggestion.status}</span>
                  </span>
                </div>
                
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  {suggestion.partOfSpeech}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100'
                  }`}>
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{suggestion.votes}</span>
                  </button>
                </div>
              </div>
            </div>

            <p className={`text-base mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {suggestion.definition}
            </p>

            {suggestion.example && (
              <blockquote className={`pl-4 border-l-2 italic mb-3 ${
                isDarkMode 
                  ? 'text-gray-400 border-gray-600' 
                  : 'text-gray-600 border-gray-300'
              }`}>
                "{suggestion.example}"
              </blockquote>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Suggested by {suggestion.suggestedBy}
              </span>
              <span className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {suggestion.submittedAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}