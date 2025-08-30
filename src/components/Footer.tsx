import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`py-8 text-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/50 backdrop-blur-xl border-t border-gray-700 text-gray-400' 
        : 'bg-white/50 backdrop-blur-xl border-t border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-4 md:mb-0">
            Designed by <span className="font-bold">Pranith</span>
          </p>
          <a
            href="https://github.com/pranith023"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
              isDarkMode 
                ? 'hover:text-white' 
                : 'hover:text-gray-900'
            }`}
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}