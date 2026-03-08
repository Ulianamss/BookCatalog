import { getFavorites } from '../storage/favorites.js';
import { displayFavorites } from './display.js';

// Initialize favorites
export function initializeFavorites() {
    // Load favorites on page load
    renderFavorites();
}

// Render favorites
export function renderFavorites() {
    const favorites = getFavorites();
    displayFavorites(favorites);
}