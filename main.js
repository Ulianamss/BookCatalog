const button = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const favoritesContainer = document.getElementById("favorites");

button.addEventListener("click", searchBooks);

async function searchBooks() {

    const query = input.value.trim();
    // const query = input.value;
    console.log(query);

    if (!query) {
        console.log("Enter search query");
        return;
    }

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    try {

        const response = await fetch(url);
        const data = await response.json();
        console.log(url);
        console.log(data);
        showBooks(data.docs);
    } catch (error) {
        console.error("Network error", error);
    }
}

function showBooks(books){
    results.innerHTML = "";

    const query = input.value.trim().toLowerCase();
    
    //only the ones that have exact querry )SQL %LIKE%)
    const matchingBooks = books.filter(book => 
        book.title.toLowerCase().includes(query)  // ← Изменил на includes()
    );
    
    const booksToShow = matchingBooks.length > 0 ? matchingBooks : books;

    booksToShow.forEach(book => {
        //books.slice(0, 10).forEach(book => {
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
            <div class="bookCard">
                <img src="${cover}" alt="Book cover">
                <div class="infoDiv">
                    <h3 class="bookName">${title}</h3>
                    <p class="author">${author}</p>
                    <p class="year">${year}</p>
                    <button class="favoriteButton">Add to Favorites</button>
                </div>  
            </div>  
        `;

        const favButton = div.querySelector(".favBtn");
        favButton.addEventListener("click", () => {
            addToFavorites(book);
        });

        results.appendChild(div);
    });
}

function addToFavorites(book){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites(){
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesContainer.innerHTML = "";
    favorites.forEach(book => {
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
            <div class="bookCard">
                <img src="${cover}" alt="Book cover">
                <div class="infoDiv">
                    <h3 class="bookName">${title}</h3>
                    <p class="author">${author}</p>
                    <p class="year">${year}</p>
                    <button class="favoriteButton">Add to Favorites</button>
                </div>  
            </div>  
        `;
        favoritesContainer.appendChild(div);
    });
}


renderFavorites();