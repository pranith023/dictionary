import { Word } from '../types/dictionary';

// In a real application, these would be fetched from a dedicated API
const trendingWordList = ['serendipity', 'ephemeral', 'ubiquitous'];

export const fetchWord = async (query: string): Promise<Word | null> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch word data');
    }
    const data = await response.json();
    const wordData = data[0];

    // Map the API response to the Word interface
    const etymology = wordData.origin && wordData.origin.trim() !== '' ? wordData.origin : 'Not available from this API.';
    
    return {
      id: wordData.word,
      word: wordData.word,
      phonetic: wordData.phonetic || wordData.phonetics[0]?.text || 'N/A',
      audioUrl: wordData.phonetics.find((p: any) => p.audio)?.audio || undefined,
      definitions: wordData.meanings.map((m: any) => ({
        partOfSpeech: m.partOfSpeech,
        definition: m.definitions[0].definition,
        example: m.definitions[0].example,
        level: undefined
      })),
      synonyms: wordData.meanings.flatMap((m: any) => m.synonyms).filter((s: string) => s),
      antonyms: wordData.meanings.flatMap((m: any) => m.antonyms).filter((a: string) => a),
      etymology: etymology,
      translations: {},
      trending: trendingWordList.includes(wordData.word.toLowerCase())
    };
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

// New function to fetch translations
export const fetchTranslations = async (word: string, targetLang: string): Promise<string> => {
  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${word}`);
    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error(`Translation API Error for ${targetLang}:`, error);
    return 'N/A';
  }
};

export const searchWords = async (query: string): Promise<Word[]> => {
  const word = await fetchWord(query);
  return word ? [word] : [];
};

export const getWordOfTheDay = async (): Promise<Word | null> => {
  const words = ['serendipity', 'ephemeral', 'ubiquitous', 'mellifluous', 'paradigm'];
  const today = new Date().getDate();
  const wordToFetch = words[today % words.length];
  return fetchWord(wordToFetch);
};

export const getTrendingWords = async (): Promise<Word[]> => {
  const trendingWords: Word[] = [];
  for (const word of trendingWordList) {
    const fetchedWord = await fetchWord(word);
    if (fetchedWord) {
      trendingWords.push(fetchedWord);
    }
  }
  return trendingWords;
};

// These functions will now be obsolete with API integration but are kept for context
export const getSuggestions = async (query: string): Promise<string[]> => {
  return [];
};

export const getWordById = async (id: string): Promise<Word | undefined> => {
  const word = await fetchWord(id);
  return word || undefined;
};

export const getWordByName = async (name: string): Promise<Word | undefined> => {
  const word = await fetchWord(name);
  return word || undefined;
};
