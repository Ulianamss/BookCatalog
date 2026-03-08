import { searchBooks, searchPopularBooks } from '../api/openLibrary.js';
import { createBookCard } from '../components/bookCard.js';
import { debounce, showToast, setLoading } from '../utils/helpers.js';
import { displayBooks } from './display.js';

// Store current books for filtering
let currentBooks = [];

// Initialize search functionality
export function initializeSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    // Search on button click
    searchButton.addEventListener('click', handleSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Live search with debounce
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

// Handle search request
async function handleSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim();

    // If empty, show popular books
    if (!query) {
        await loadPopularBooks();
        return;
    }

    await performSearch(query);
}

// Perform the actual search
async function performSearch(query) {
    setLoading(true);

    try {
        const results = await searchBooks(query);

        if (!results || results.length === 0) {
            showToast('Nothing found');
            currentBooks = [];
            displayBooks([]);
            setLoading(false);
            return;
        }

        currentBooks = results;
        displayBooks(results);
        setLoading(false);
    } catch (error) {
        //showToast('Search error');
        //console.error('Search error:', error);
        setLoading(false);
    }
}

// Load and display popular books
export async function loadPopularBooks() {
    setLoading(true);

    try {
        const results = await searchPopularBooks(8);

        if (results && results.length > 0) {
            currentBooks = results;
            displayBooks(results);
        }

        setLoading(false);
    } catch (error) {
        //showToast('Network error');
        console.error('Popular books error:', error);
        setLoading(false);
    }
}

// Get current books (used by filter)
export function getCurrentBooks() {
    return currentBooks;
}

// Set current books (used by filter)
export function setCurrentBooks(books) {
    currentBooks = books;
}