document.addEventListener('DOMContentLoaded', function() {
    displaySessionInfo();
    displayUserInfo();
});

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error parsing JWT", e);
        return {};
    }
}

function displaySessionInfo() {
    // Example: Retrieve and display session info (e.g., token expiry)
    const idToken = localStorage.getItem('idToken'); // Assuming the token is stored here
    if (idToken) {
        const parsedToken = parseJwt(idToken);
        document.getElementById('sessionInfo').innerHTML = 'Token Expires: ' + new Date(parsedToken.exp * 1000).toLocaleString();
    } else {
        document.getElementById('sessionInfo').innerHTML = 'No session information found.';
    }
}

function displayUserInfo() {
    // Example: Retrieve and display user info from ID token
    const idToken = localStorage.getItem('idToken'); // Assuming the token is stored here
    if (idToken) {
        const parsedToken = parseJwt(idToken);
        document.getElementById('userInfo').innerHTML = 'User: ' + parsedToken.name + ' (Email: ' + parsedToken.email + ')';
    } else {
        document.getElementById('userInfo').innerHTML = 'No user information found.';
    }
}
