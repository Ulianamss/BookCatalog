const THEME_KEY = 'book-catalog-theme';

// Initialize theme
export function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;

    // Load saved theme
    loadSavedTheme();

    // Setup toggle button
    themeToggle.addEventListener('click', toggleTheme);
}

// Load saved theme from localStorage
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const themeToggle = document.getElementById('themeToggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = 'Light Mode';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = 'Dark Mode';
        }
    }
}

// Toggle between dark and light theme
function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem(THEME_KEY, 'dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        localStorage.setItem(THEME_KEY, 'light');
        themeToggle.textContent = 'Dark Mode';
    }
}