document.addEventListener('DOMContentLoaded', function() {
    displayJwt();
});

function displayJwt() {
    const idToken = localStorage.getItem('idToken'); // Assuming the token is stored here
    const jwtElement = document.getElementById('jwt');
    
    if (idToken) {
        jwtElement.textContent = idToken;
    } else {
        jwtElement.textContent = 'JWT not found.';
    }
}
