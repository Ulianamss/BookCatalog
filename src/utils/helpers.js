// Debounce function - delays execution until after specified delay
export function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Show toast notification
export function showToast(message, duration = 5000) {
    const toast = document.getElementById('toast');
    
    if (!toast) {
        console.error('Toast element not found');
        return;
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Escape HTML to prevent XSS
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show/hide loading indicator
export function setLoading(isLoading) {
    const loading = document.getElementById('loading');
    
    if (!loading) return;
    
    if (isLoading) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}