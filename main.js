const searchButton = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const favoritesContainer = document.getElementById("favorites");
const loading = document.getElementById("loading");


searchButton.addEventListener("click", searchBooks);
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

function showToast(message){
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
}


renderFavorites();

async function searchBooks() {
    const query = input.value.trim();
    console.log(query);

    if (!query) {
        showToast("Enter search query");
        console.log('empty query');
        return;
    }
    loading.classList.remove("hidden");

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        loading.classList.add("hidden");
        
        console.log(url);
        console.log(data);
        showBooks(data.docs);
        if (!data.docs || data.docs.length === 0) {
            console.log('nothig found');
            showToast("Nothing found");
            return;
        }
    } catch (error) {
        showToast("Network error");
        console.error("Network error", error);
    }
    
}



function showBooks(books){
    results.innerHTML = "";
    const query = input.value.trim().toLowerCase();

    //only the ones that have exact querry (SQL %LIKE%)
    const matchingBooks = books.filter(book => 
        book.title.toLowerCase().includes(query)
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
                    <button class="favoritesButton"></button>
                </div>  
            </div>  
        `;

        const favoritesButton = div.querySelector(".favoritesButton");
        updateFavoriteButton(favoritesButton, book);
        favoritesButton.addEventListener("click", () => {
            toggleFavorite(book);
            updateFavoriteButton(favoritesButton, book);
        });

        results.appendChild(div);
    });
}


function isFavorite(book){
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some(fav => fav.key === book.key);
}

function toggleFavorite(book){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(fav => fav.key === book.key);
    if(index === -1){
    favorites.push(book);
        showToast("Added to favorites");
    }else{
        favorites.splice(index, 1);
        showToast("Removed from favorites");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

function updateFavoriteButton(favoritesButton, book){
    if(isFavorite(book)){
        favoritesButton.textContent = "Remove from Favorites";
    }else{
        favoritesButton.textContent = "Add to Favorites";
    }
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
                    <button class="favoritesButton"></button>
                </div>  
            </div>  
        `;

        const favoritesButton = div.querySelector(".favoritesButton");
        updateFavoriteButton(favoritesButton, book);
        favoritesButton.addEventListener("click", () => {
            toggleFavorite(book);
        });

        favoritesContainer.appendChild(div);
    });
}