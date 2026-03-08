import { displayBooks } from './display.js';
import { getCurrentBooks } from './search.js';

// Initialize filter
export function initializeFilter() {
    const authorFilter = document.getElementById('authorFilter');
    
    if (!authorFilter) return;

    authorFilter.addEventListener('change', handleFilterChange);
}

// Handle filter change
function handleFilterChange() {
    const authorFilter = document.getElementById('authorFilter');
    const selectedAuthor = authorFilter.value;
    let booksToShow = getCurrentBooks();

    // Filter by selected author
    if (selectedAuthor) {
        booksToShow = booksToShow.filter(book =>
            book.author_name && book.author_name[0] === selectedAuthor
        );
    }

    displayBooks(booksToShow);
    authorFilter.value = selectedAuthor;
    populateAuthorFilter(getCurrentBooks());
}

// Populate author filter dropdown
export function populateAuthorFilter(books) {
    const authorFilter = document.getElementById('authorFilter');
    const filterContainer = document.getElementById('filterContainer');
    
    if (!authorFilter || !books || books.length === 0) {
        if (filterContainer) {
            filterContainer.style.display = 'none';
        }
        return;
    }

    const selectedValue = authorFilter.value;

    // Get unique authors
    const authorsSet = new Set();
    books.forEach(book => {
        if (book.author_name && book.author_name[0]) {
            authorsSet.add(book.author_name[0]);
        }
    });

    // Reset dropdown
    authorFilter.innerHTML = '<option value="">All Authors</option>';

    // Add each author (sorted)
    Array.from(authorsSet)
        .sort()
        .forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorFilter.appendChild(option);
        });

    // Show filter container
    if (filterContainer) {
        filterContainer.style.display = 'block';
    }

    authorFilter.value = selectedValue;
}