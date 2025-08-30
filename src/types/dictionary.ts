export interface WordDefinition {
  partOfSpeech: string;
  definition: string;
  example?: string;
  level?: 'formal' | 'informal' | 'slang';
}

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  audioUrl?: string;
  definitions: WordDefinition[];
  synonyms: string[];
  antonyms: string[];
  etymology: string;
  translations: {
    hindi?: string;
    telugu?: string;
    tamil?: string;
  };
  trending?: boolean;
}

export interface SearchSuggestion {
  word: string;
  frequency: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  favoriteWords: string[];
  searchHistory: string[];
}