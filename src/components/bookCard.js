import { isFavorite, toggleFavorite } from '../storage/favorites.js';
import { showToast } from '../utils/helpers.js';
import { renderFavorites } from '../modules/favorites.js';

// Create a book card element
export function createBookCard(book, onFavoriteChange) {
    const card = document.createElement('div');
    card.className = 'bookCard';

    // Get book information
    const title = book.title || 'Unknown Title';
    const author = book.author_name ? book.author_name[0] : 'Unknown author';
    const year = book.first_publish_year || 'Unknown year';
    
    // Get cover image or placeholder
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
        : 'https://via.placeholder.com/180x280?text=No+Cover';

    // Create card HTML
    card.innerHTML = `
        <img class="cover" src="${coverUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/180x280?text=No+Cover'">
        <div class="infoDiv">
            <h3 class="bookName" title="${title}">${title}</h3>
            <p class="author" title="${author}">${author}</p>
            <p class="year">${year}</p>
            <button class="favoritesButton">
                <svg class="heart-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>    
            </button>        
        </div>
    `;

    // Setup favorite button
    const button = card.querySelector('.favoritesButton');
    updateButtonState(button, book);

    button.addEventListener('click', () => {
        const isFav = toggleFavorite(book);
        updateButtonState(button, book);
        
        if (isFav) {
            showToast('Added to favorites');
        } else {
            showToast('Removed from favorites');
        }

        renderFavorites();
        
        // Notify parent component
        if (onFavoriteChange) {
            onFavoriteChange(book);
        }
    });

    return card;
}

// Update button text and styling based on favorite status
function updateButtonState(button, book) {
    if (isFavorite(book)) {
        // button.textContent = '❤️ Remove from Favorites';
        
        button.classList.add('active');
    } else {
        // button.innerHTML = '<object data="../assets/heart.svg" type="image/svg+xml" class="heart-icon"></object>';
        button.classList.remove('active');
    }
}
