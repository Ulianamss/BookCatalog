const button = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

button.addEventListener("click", searchBooks);

async function searchBooks() {

    const query = input.value.trim();
    if (!query) {
        console.log("Enter search query");
        return;
    }

    const url = `https://openlibrary.org/search.json?q=${query}`;
    try {

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Network error", error);
    }
}