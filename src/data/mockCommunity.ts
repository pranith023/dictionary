import { WordSuggestion, BlogPost, Badge, Achievement } from '../types/community';

export const mockWordSuggestions: WordSuggestion[] = [
  {
    id: '1',
    word: 'ghosting',
    definition: 'The practice of ending a personal relationship by suddenly stopping all communication',
    partOfSpeech: 'verb',
    example: 'After three great dates, he started ghosting her completely.',
    suggestedBy: 'user123',
    submittedAt: new Date('2024-12-15'),
    votes: 47,
    status: 'approved',
    category: 'slang'
  },
  {
    id: '2',
    word: 'rizz',
    definition: 'Charisma or charm, especially in romantic contexts',
    partOfSpeech: 'noun',
    example: 'He has so much rizz that everyone wants to talk to him.',
    suggestedBy: 'wordlover99',
    submittedAt: new Date('2024-12-14'),
    votes: 32,
    status: 'pending',
    category: 'slang'
  },
  {
    id: '3',
    word: 'sonder',
    definition: 'The realization that each random passerby is living a life as vivid and complex as your own',
    partOfSpeech: 'noun',
    example: 'Walking through the busy street, she experienced a moment of sonder.',
    suggestedBy: 'philosopher42',
    submittedAt: new Date('2024-12-13'),
    votes: 89,
    status: 'approved',
    category: 'general'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of English: How Language Adapts to Digital Age',
    excerpt: 'Explore how social media and technology are reshaping the English language, creating new words and changing communication patterns.',
    content: `The digital revolution has fundamentally transformed how we communicate, and with it, the English language itself has evolved at an unprecedented pace. From "googling" becoming a verb to "ghosting" entering mainstream vocabulary, technology continues to shape our linguistic landscape.

## The Rise of Digital Vernacular

Social media platforms have become linguistic laboratories where new words are born, tested, and either adopted or forgotten. Terms like "selfie," "hashtag," and "viral" have seamlessly integrated into our daily vocabulary, demonstrating language's remarkable adaptability.

## Generational Language Gaps

Each generation brings its own linguistic innovations. Gen Z has introduced terms like "rizz," "cap," and "periodt," while millennials popularized "ghosting," "adulting," and "FOMO." These generational markers serve as cultural timestamps, reflecting the values and experiences of their creators.

## The Speed of Language Change

What once took decades to enter dictionaries now happens in months. The internet has accelerated language evolution, creating a dynamic environment where words can gain global recognition overnight through viral content and social media trends.

## Preserving Linguistic Heritage

While embracing innovation, it's crucial to maintain connections to our linguistic roots. Understanding etymology and traditional usage helps us appreciate the rich tapestry of language evolution while navigating modern communication effectively.`,
    author: 'Dr. Sarah Chen',
    publishedAt: new Date('2024-12-10'),
    readTime: 8,
    tags: ['linguistics', 'technology', 'social-media', 'evolution'],
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Mastering Pronunciation: A Guide to English Phonetics',
    excerpt: 'Learn the fundamentals of English pronunciation with practical tips for improving your speaking skills and understanding phonetic symbols.',
    content: `Pronunciation is often the most challenging aspect of language learning, but understanding the basics of English phonetics can dramatically improve your speaking confidence and comprehension.

## Understanding the International Phonetic Alphabet (IPA)

The IPA provides a standardized way to represent sounds across languages. Learning key symbols helps you decode pronunciation guides in dictionaries and language learning materials.

## Common Pronunciation Challenges

Many English learners struggle with specific sound combinations and silent letters. We'll explore the most common difficulties and provide targeted practice strategies.

## Regional Variations

English pronunciation varies significantly across regions. Understanding these differences helps you choose the accent that best suits your goals and context.

## Practice Techniques

Effective pronunciation practice involves listening, repetition, and feedback. We'll share proven methods for developing accurate pronunciation skills.`,
    author: 'Prof. Michael Rodriguez',
    publishedAt: new Date('2024-12-08'),
    readTime: 12,
    tags: ['pronunciation', 'phonetics', 'learning', 'speaking'],
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Building Your Vocabulary: Strategies for Word Mastery',
    excerpt: 'Discover effective techniques for expanding your vocabulary and retaining new words through proven learning strategies.',
    content: `A rich vocabulary is one of the most valuable assets for effective communication. Whether you're a student, professional, or language enthusiast, strategic vocabulary building can enhance your expression and comprehension.

## The Science of Word Learning

Research shows that we learn words best through multiple exposures in varied contexts. Understanding how memory works helps us design effective learning strategies.

## Context-Based Learning

Learning words in isolation is less effective than encountering them in meaningful contexts. We'll explore how to use reading, listening, and conversation to build vocabulary naturally.

## Spaced Repetition Systems

Scientific spacing of review sessions dramatically improves retention. Learn how to implement spaced repetition in your vocabulary practice.

## Making Words Stick

Techniques for creating memorable associations, using mnemonics, and building personal connections to new vocabulary.`,
    author: 'Emma Thompson',
    publishedAt: new Date('2024-12-05'),
    readTime: 10,
    tags: ['vocabulary', 'learning', 'memory', 'strategies'],
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Word Explorer',
    description: 'Searched for your first word',
    icon: '🔍',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Daily Learner',
    description: 'Maintained a 7-day search streak',
    icon: '🔥',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Vocabulary Master',
    description: 'Learned 100 new words',
    icon: '📚',
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Community Contributor',
    description: 'Suggested 5 words to the community',
    icon: '🤝',
    rarity: 'rare'
  },
  {
    id: '5',
    name: 'Pronunciation Pro',
    description: 'Used voice search 50 times',
    icon: '🎤',
    rarity: 'epic'
  },
  {
    id: '6',
    name: 'Dictionary Legend',
    description: 'Reached level 10',
    icon: '👑',
    rarity: 'legendary'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Search for your first word',
    points: 10,
    requirement: 'Complete 1 search',
    progress: 1,
    maxProgress: 1,
    completed: true
  },
  {
    id: '2',
    title: 'Word Collector',
    description: 'Add 10 words to favorites',
    points: 50,
    requirement: 'Save 10 words to favorites',
    progress: 3,
    maxProgress: 10,
    completed: false
  },
  {
    id: '3',
    title: 'Voice Master',
    description: 'Use voice search 25 times',
    points: 75,
    requirement: 'Complete 25 voice searches',
    progress: 8,
    maxProgress: 25,
    completed: false
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Suggest 3 new words',
    points: 100,
    requirement: 'Submit 3 word suggestions',
    progress: 0,
    maxProgress: 3,
    completed: false
  }
];