import { createBookCard } from '../components/bookCard.js';
import { populateAuthorFilter } from './filter.js';  // ← ADD THIS IMPORT

// Display books in the results grid
export function displayBooks(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!books || books.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No books found</p>';
        return;
    }

    populateAuthorFilter(books);


    books.forEach(book => {
        const card = createBookCard(book, () => {
            // Refresh display when favorite status changes
            displayFavoritesCount();
        });
        resultsContainer.appendChild(card);
    });
}

// Display favorite books
export function displayFavorites(favorites) {
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = '';

    if (!favorites || favorites.length === 0) {
        favoritesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No favorites yet</p>';
        return;
    }

    favorites.forEach(book => {
        const card = createBookCard(book, () => {
            // Refresh when favorite status changes
        });
        favoritesContainer.appendChild(card);
    });

    displayFavoritesCount();
}

// Display count of favorites
function displayFavoritesCount() {
    // This is handled by the favorites module
}