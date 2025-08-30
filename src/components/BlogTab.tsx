import React from 'react';
import { BookOpen, Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '../types/community';
import { mockBlogPosts } from '../data/mockCommunity';

interface BlogTabProps {
  isDarkMode: boolean;
}

export function BlogTab({ isDarkMode }: BlogTabProps) {
  const [posts] = React.useState<BlogPost[]>(mockBlogPosts);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div>
        <button
          onClick={() => setSelectedPost(null)}
          className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          ← Back to Blog
        </button>

        <article className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
            : 'bg-white/70 backdrop-blur-xl border-gray-200'
        } border rounded-2xl p-8`}>
          {selectedPost.imageUrl && (
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          )}
          
          <div className="flex items-center space-x-4 mb-4">
            <span className={`px-3 py-1 text-sm rounded-full ${
              selectedPost.featured
                ? isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                : isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-100 text-gray-700'
            }`}>
              {selectedPost.featured ? '⭐ Featured' : 'Article'}
            </span>
            <div className="flex items-center space-x-2">
              <Clock className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedPost.readTime} min read
              </span>
            </div>
          </div>

          <h1 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedPost.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedPost.author}
              </span>
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {selectedPost.publishedAt.toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-sm rounded-full ${
                  isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className={`prose max-w-none ${
            isDarkMode ? 'prose-invert' : ''
          }`}>
            <div className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {selectedPost.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className={`text-2xl font-bold mt-8 mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
        }`}>
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Language Blog
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Tips, insights, and stories about language
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`group cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/70 backdrop-blur-xl border-gray-200 hover:bg-white/90'
            } border rounded-2xl p-6 hover:shadow-xl`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {post.imageUrl && (
                <div className="md:w-1/3">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 md:h-32 object-cover rounded-xl"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  {post.featured && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      ⭐ Featured
                    </span>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-3 w-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.readTime} min read
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>

                <p className={`text-base mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.author}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      • {post.publishedAt.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}