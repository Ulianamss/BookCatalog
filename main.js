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
        showBooks(data.docs);
    } catch (error) {
        console.error("Network error", error);
    }
}

function showBooks(books){
    console.log("showBooks called", books);
    results.innerHTML = "";

    books.slice(0, 10).forEach(book => {
        const div = document.createElement("div");

        const title = book.title;
        const author = book.author_name ? book.author_name[0] : "Unknown author";
        const year = book.first_publish_year ? book.first_publish_year : "Unknown year";
        let cover;

        if (book.cover_i) {
            cover = `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`;
        } else {
            cover = "https://via.placeholder.com/150x220?text=No+Cover";
        }

        div.innerHTML = `
            <img src="${cover}" alt="Book cover">
            <h3>${title}</h3>
            <p>Author: ${author}</p>
            <p>Year: ${year}</p>
        `;

        results.appendChild(div);
    });
}