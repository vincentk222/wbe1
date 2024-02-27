window.onload = function() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert('You are not authenticated. Redirecting to login page...');
        window.location.href = 'login.html';
    }
};
