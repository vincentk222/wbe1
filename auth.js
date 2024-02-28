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
    const idToken = localStorage.getItem('idToken'); // Assuming the token is stored here
    if (idToken) {
        const parsedToken = parseJwt(idToken);
        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = ''; // Clear previous content
        Object.entries(parsedToken).forEach(([key, value]) => {
            // Create a new div for each key-value pair and append to userInfoElement
            const div = document.createElement('div');
            div.textContent = `${key}: ${value}`;
            userInfoElement.appendChild(div);
        });
    } else {
        document.getElementById('userInfo').innerHTML = 'No user information found.';
    }
}
