import './styles/style.css';
import { initializeTheme } from './modules/theme.js';
import { initializeSearch, loadPopularBooks } from './modules/search.js';
import { initializeFavorites, renderFavorites } from './modules/favorites.js';
import { initializeFilter, populateAuthorFilter } from './modules/filter.js';

// Initialize application
function initializeApp() {    
    // Initialize all modules
    initializeTheme();
    initializeSearch();
    initializeFavorites();
    initializeFilter();
    
    // Load popular books on page load
    loadPopularBooks();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
