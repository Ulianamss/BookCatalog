const BASE_URL = 'https://openlibrary.org/search.json';


//Search books from Open Library API
export async function searchBooks(query, limit = 20) {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}


//Search for popular books
export async function searchPopularBooks(limit = 8) {
    try {
        return await searchBooks('book', limit);
    } catch (error) {
        console.error('Popular books error:', error);
        throw error;
    }
}