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
                <img src="../assets/heart.svg" alt="Favorite" class="heart-icon">
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