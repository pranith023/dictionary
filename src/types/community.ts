export interface WordSuggestion {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  example?: string;
  suggestedBy: string;
  submittedAt: Date;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  category: 'slang' | 'technical' | 'regional' | 'general';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  points: number;
  level: number;
  badges: Badge[];
  joinedAt: Date;
  streak: number;
  totalSearches: number;
  wordsLearned: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  requirement: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
}
</parameter>