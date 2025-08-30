import React, { useState } from 'react';
import { Code, Key, Copy, ExternalLink, CheckCircle } from 'lucide-react';

interface ApiTabProps {
  isDarkMode: boolean;
}

export function ApiTab({ isDarkMode }: ApiTabProps) {
  const [apiKey] = useState('wv_live_sk_1234567890abcdef');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/words/{word}',
      description: 'Get detailed information about a specific word',
      example: 'https://api.wordvault.com/v1/words/serendipity'
    },
    {
      method: 'GET',
      path: '/api/v1/search',
      description: 'Search for words with query parameter',
      example: 'https://api.wordvault.com/v1/search?q=happi&limit=10'
    },
    {
      method: 'GET',
      path: '/api/v1/word-of-day',
      description: 'Get the current word of the day',
      example: 'https://api.wordvault.com/v1/word-of-day'
    },
    {
      method: 'GET',
      path: '/api/v1/trending',
      description: 'Get currently trending words',
      example: 'https://api.wordvault.com/v1/trending?limit=5'
    }
  ];

  const codeExamples = {
    javascript: `// JavaScript/Node.js Example
const response = await fetch('https://api.wordvault.com/v1/words/serendipity', {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});

const wordData = await response.json();
console.log(wordData);`,

    python: `# Python Example
import requests

headers = {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.wordvault.com/v1/words/serendipity',
    headers=headers
)

word_data = response.json()
print(word_data)`,

    curl: `# cURL Example
curl -X GET "https://api.wordvault.com/v1/words/serendipity" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
        }`}>
          <Code className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            API Access
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Integrate WordVault into your applications
          </p>
        </div>
      </div>

      {/* API Key Section */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl p-6 mb-8`}>
        <div className="flex items-center space-x-3 mb-4">
          <Key className={`h-5 w-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <h3 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your API Key
          </h3>
        </div>
        
        <div className={`${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        } rounded-lg p-4 flex items-center justify-between`}>
          <code className={`font-mono text-sm overflow-x-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {apiKey}
          </code>
          <button
            onClick={() => copyToClipboard(apiKey, 'key')}
            className={`p-2 rounded-lg transition-colors ${
              copiedEndpoint === 'key'
                ? 'bg-green-500 text-white'
                : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copiedEndpoint === 'key' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        
        <p className={`text-sm mt-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Keep your API key secure. Include it in the Authorization header as a Bearer token.
        </p>
      </div>

      {/* Endpoints */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl p-6 mb-8`}>
        <h3 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          API Endpoints
        </h3>

        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className={`${
                isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              } border rounded-xl p-4`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <span className={`px-2 py-1 text-xs font-mono rounded ${
                    endpoint.method === 'GET'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className={`font-mono text-sm overflow-x-auto ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {endpoint.path}
                  </code>
                </div>
                
                <button
                  onClick={() => copyToClipboard(endpoint.example, `endpoint-${index}`)}
                  className={`p-2 rounded-lg transition-colors ${
                    copiedEndpoint === `endpoint-${index}`
                      ? 'bg-green-500 text-white'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copiedEndpoint === `endpoint-${index}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              
              <p className={`text-sm mb-2 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {endpoint.description}
              </p>
              
              <code className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {endpoint.example}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Code Examples
        </h3>

        <div className="space-y-6">
          {Object.entries(codeExamples).map(([language, code]) => (
            <div key={language}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-lg font-medium capitalize ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {language}
                </h4>
                <button
                  onClick={() => copyToClipboard(code, language)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    copiedEndpoint === language
                      ? 'bg-green-500 text-white'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {copiedEndpoint === language ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              
              <pre className={`${
                isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
              } rounded-lg p-4 overflow-x-auto text-sm`}>
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>

        <div className={`mt-6 pt-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <ExternalLink className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <a
              href="#"
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              View full API documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}