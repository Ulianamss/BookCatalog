const STORAGE_KEY = 'book-catalog-favorites';

// Get all favorite books from localStorage
export function getFavorites() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading favorites:', error);
        return [];
    }
}


// Save favorites to localStorage
export function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}


// Check if a book is in favorites
export function isFavorite(book) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.key === book.key);
}


// Add book to favorites
export function addFavorite(book) {
    const favorites = getFavorites();
    if (!isFavorite(book)) {
        favorites.push(book);
        saveFavorites(favorites);
    }
}


// Remove book from favorites
export function removeFavorite(book) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.key !== book.key);
    saveFavorites(favorites);
}

// Toggle favorite status
export function toggleFavorite(book) {
    if (isFavorite(book)) {
        removeFavorite(book);
        return false;
    } else {
        addFavorite(book);
        return true;
    }
}