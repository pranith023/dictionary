// Dictionary App - Main JavaScript File
class DictionaryApp {
    constructor() {
        this.currentAudio = null;
        this.searchCache = new Map();
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.initializeTheme();
        this.setupKeyboardNavigation();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const themeToggle = document.getElementById('themeToggle');

        searchInput.addEventListener('input', this.handleSearchInput.bind(this));
        searchInput.addEventListener('keypress', this.handleKeyPress.bind(this));
        searchBtn.addEventListener('click', this.handleSearch.bind(this));
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));

        // Clear search function (global)
        window.clearSearch = this.clearSearch.bind(this);
        window.searchWord = this.searchWord.bind(this);
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('dictionary-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
        });
    }

    handleSearchInput(e) {
        const query = e.target.value.trim();
        if (query.length > 2) {
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (!query) {
            this.showError('Please enter a word to search');
            return;
        }

        this.searchWord(query);
        this.hideSearchSuggestions();
    }

    async searchWord(word) {
        if (!word) return;

        this.showLoading();
        this.hideError();
        this.hideResults();

        try {
            // Check cache first
            if (this.searchCache.has(word.toLowerCase())) {
                const cachedData = this.searchCache.get(word.toLowerCase());
                this.displayResults(cachedData, word);
                return;
            }

            const wordData = await this.fetchWordData(word);
            
            if (wordData && wordData.length > 0) {
                // Cache the result
                this.searchCache.set(word.toLowerCase(), wordData);
                this.displayResults(wordData, word);
                
            // Image functionality removed - using dictionary API only
            // this.fetchRelatedImages(word);
            } else {
                this.showError();
            }
        } catch (error) {
            console.error('Search error:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    async fetchWordData(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

    async fetchRelatedImages(word) {
        // Images functionality removed - using dictionary API only
        console.log('Image functionality disabled - dictionary API only');
    }

    displayResults(data, searchedWord) {
        const results = document.getElementById('results');
        const wordHeader = document.getElementById('wordHeader');
        const wordDetails = document.getElementById('wordDetails');

        // Display word header
        const firstEntry = data[0];
        const phonetic = firstEntry.phonetics?.find(p => p.text) || {};
        const audioUrl = firstEntry.phonetics?.find(p => p.audio)?.audio || '';

        wordHeader.innerHTML = `
            <div class="word-title">
                <h2>${firstEntry.word}</h2>
                ${audioUrl ? `<button class="audio-btn" onclick="dictionaryApp.playAudio('${audioUrl}')" aria-label="Play pronunciation">
                    <i class="fas fa-volume-up"></i>
                </button>` : ''}
            </div>
            ${phonetic.text ? `<div class="phonetic">${phonetic.text}</div>` : ''}
        `;

        // Display word details
        wordDetails.innerHTML = '';
        
        data.forEach((entry, entryIndex) => {
            entry.meanings?.forEach((meaning, meaningIndex) => {
                const meaningCard = document.createElement('div');
                meaningCard.className = 'meaning-card';
                
                const definitionsList = meaning.definitions.map((def, defIndex) => `
                    <li class="definition-item">
                        <div class="definition-text">${def.definition}</div>
                        ${def.example ? `<div class="example">"${def.example}"</div>` : ''}
                    </li>
                `).join('');

                const synonyms = meaning.synonyms?.length > 0 ? `
                    <div class="synonyms">
                        <h4><i class="fas fa-plus-circle"></i> Synonyms</h4>
                        <div class="word-tags">
                            ${meaning.synonyms.map(syn => `
                                <span class="word-tag" onclick="dictionaryApp.searchWord('${syn}')">${syn}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : '';

                const antonyms = meaning.antonyms?.length > 0 ? `
                    <div class="antonyms">
                        <h4><i class="fas fa-minus-circle"></i> Antonyms</h4>
                        <div class="word-tags">
                            ${meaning.antonyms.map(ant => `
                                <span class="word-tag" onclick="dictionaryApp.searchWord('${ant}')">${ant}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : '';

                meaningCard.innerHTML = `
                    <div class="part-of-speech">${meaning.partOfSpeech}</div>
                    <ol class="definitions-list">
                        ${definitionsList}
                    </ol>
                    ${synonyms}
                    ${antonyms}
                `;

                wordDetails.appendChild(meaningCard);
            });
        });

        this.showResults();
        
        // Scroll to results
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    playAudio(audioUrl) {
        try {
            // Stop current audio if playing
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            if (audioUrl) {
                this.currentAudio = new Audio(audioUrl);
                this.currentAudio.play().catch(error => {
                    console.warn('Audio playback failed:', error);
                    this.showTemporaryMessage('Audio playback is not available');
                });
            }
        } catch (error) {
            console.error('Audio error:', error);
            this.showTemporaryMessage('Audio playback failed');
        }
    }

    showSearchSuggestions(query) {
        // For demo purposes, showing common word suggestions
        const suggestions = ['hello', 'world', 'example', 'search', 'dictionary']
            .filter(word => word.startsWith(query.toLowerCase()))
            .slice(0, 3);

        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(word => 
                `<div class="suggestion-item" onclick="dictionaryApp.searchWord('${word}')">${word}</div>`
            ).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            this.hideSearchSuggestions();
        }
    }

    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        suggestionsContainer.style.display = 'none';
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('dictionary-theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#themeToggle i');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    showLoading() {
        document.getElementById('loading').classList.add('show');
    }

    hideLoading() {
        document.getElementById('loading').classList.remove('show');
    }

    showResults() {
        document.getElementById('results').classList.add('show');
    }

    hideResults() {
        document.getElementById('results').classList.remove('show');
    }

    showError(message) {
        const errorElement = document.getElementById('error');
        if (message) {
            errorElement.querySelector('p').textContent = message;
        }
        errorElement.classList.add('show');
    }

    hideError() {
        document.getElementById('error').classList.remove('show');
    }

    clearSearch() {
        document.getElementById('searchInput').value = '';
        this.hideResults();
        this.hideError();
        this.hideLoading();
        this.hideSearchSuggestions();
        document.getElementById('searchInput').focus();
    }

    showTemporaryMessage(message) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            font-size: 0.9rem;
            box-shadow: var(--shadow-lg);
            animation: slideInRight 0.3s ease;
        `;
        messageEl.textContent = message;
        document.body.appendChild(messageEl);

        // Add CSS animation
        if (!document.getElementById('temp-message-style')) {
            const style = document.createElement('style');
            style.id = 'temp-message-style';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dictionaryApp = new DictionaryApp();
    
    // Focus on search input
    document.getElementById('searchInput').focus();
    
    // Add some demo functionality
    console.log('Dictionary Pro loaded successfully!');
    console.log('Try searching for words like: hello, example, nature, technology');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}