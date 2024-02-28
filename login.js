document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#clientID, #tenantID');
    const loginButton = document.getElementById('loginButton');

    function updateLoginButtonState() {
        const clientID = document.getElementById('clientID').value;
        const tenantID = document.getElementById('tenantID').value;
        loginButton.disabled = !clientID || !tenantID;
    }

    inputs.forEach(input => {
        input.addEventListener('keyup', updateLoginButtonState);
    });

    updateLoginButtonState(); // Initial check on page load
});

function clearFields() {
    document.getElementById('clientID').value = '';
    document.getElementById('tenantID').value = '';
}

function readData() {
    // Implementation remains the same as provided earlier
}

function saveData() {
    // Implementation remains the same as provided earlier
}

function resetSession() {
    // Implementation remains the same as provided earlier
}

function login() {
    alert('Logging in...');
    // Implement your login logic here
}
