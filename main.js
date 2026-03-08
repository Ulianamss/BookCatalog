const searchButton = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const favoritesContainer = document.getElementById("favorites");
const loading = document.getElementById("loading");



// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const prefersDark = localStorage.getItem("theme") === "dark";

// Load saved theme
if (prefersDark) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Light Mode";
}

// Handle theme toggle
themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Dark Mode";
    }
});

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

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

input.addEventListener("input", debounce(searchBooks, 300));


renderFavorites();

async function searchBooks() {
    const query = input.value.trim();
    console.log(query);

    if (!query) {
        loading.classList.remove("hidden");
        await showPopularBooks();
        return;
    }
    loading.classList.remove("hidden");

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        loading.classList.add("hidden");
        
        if (!data.docs || data.docs.length === 0) {
            console.log('nothig found');
            return;
        }
        console.log(url);
        console.log(data);
        showBooks(data.docs);
        
    } catch (error) {
        loading.classList.add("hidden");
        showToast("Network error");
        console.error("Network error", error);
    }
    
}


// Store books for filtering
let currentBooks = [];

function showBooks(books){
    results.innerHTML = "";
    currentBooks = books;  // Store books for filtering
    
    const query = input.value.trim().toLowerCase();

    const matchingBooks = books.filter(book => 
        book.title.toLowerCase().includes(query)
    );
    
    const booksToShow = matchingBooks.length > 0 ? matchingBooks : books;
    
    // Show filter if there are results
    if (booksToShow.length > 0) {
        document.getElementById("filterContainer").style.display = "block";
        populateAuthorFilter(booksToShow);
    } else {
        document.getElementById("filterContainer").style.display = "none";
    }
    
    displayBooks(booksToShow);
}

// Populate author dropdown
function populateAuthorFilter(books) {
    const authorFilter = document.getElementById("authorFilter");
    const authors = new Set();
    
    // Get unique authors
    books.forEach(book => {
        if (book.author_name && book.author_name[0]) {
            authors.add(book.author_name[0]);
        }
    });
    
    // Reset dropdown
    authorFilter.innerHTML = '<option value="">All Authors</option>';
    
    // Add each author (sorted)
    Array.from(authors).sort().forEach(author => {
        const option = document.createElement("option");
        option.value = author;
        option.textContent = author;
        authorFilter.appendChild(option);
    });
    
    // Reset to "All Authors"
    authorFilter.value = "";
}

// Handle author filter change
document.getElementById("authorFilter").addEventListener("change", function() {
    const selectedAuthor = this.value;
    
    let booksToShow = currentBooks;
    
    // Filter by author if selected
    if (selectedAuthor) {
        booksToShow = currentBooks.filter(book => 
            book.author_name && book.author_name[0] === selectedAuthor
        );
    }
    
    displayBooks(booksToShow);
});

function displayBooks(books) {
    results.innerHTML = "";
    
    books.forEach(book => {
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
                <img class="cover" src="${cover}" alt="Book cover">
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

async function showPopularBooks() {
    try {
        const url = `https://openlibrary.org/search.json?q=book&limit=10`;
        const response = await fetch(url);
        const data = await response.json();
        
        loading.classList.add("hidden");
        
        if (data.docs && data.docs.length > 0) {
            showBooks(data.docs.slice(0, 10));
        }
    } catch (error) {
        loading.classList.add("hidden");
        showToast("Network error");
        console.error("Network error", error);
    }
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
                <img class="cover" src="${cover}" alt="Book cover">
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

// Show popular books on page load
window.addEventListener("load", function() {
    showPopularBooks();
});