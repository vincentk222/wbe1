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

function encrypt(text, password) {
    // Simple encryption simulation
    return btoa(text);
}

function decrypt(encryptedText, password) {
    // Simple decryption simulation
    try {
        return atob(encryptedText);
    } catch (e) {
        alert('Decryption failed.');
        return null;
    }
}

let sessionPassword = null;
let passwordTimer = null;

function setPasswordSession(password) {
    sessionPassword = password;
    clearTimeout(passwordTimer);
    passwordTimer = setTimeout(() => {
        sessionPassword = null;
        alert('Session expired. Please enter password again.');
        document.getElementById('sessionExpiry').innerText = 'Session has expired.';
    }, 60000); // 1 minute session timeout
    const expiryTime = new Date(new Date().getTime() + 60000);
    document.getElementById('sessionExpiry').innerText = 'Session expires at: ' + expiryTime.toLocaleTimeString();
}

function clearFields() {
    document.getElementById('clientID').value = '';
    document.getElementById('tenantID').value = '';
}

function readData() {
    if (!sessionPassword) {
        let password = prompt('Enter your password:');
        setPasswordSession(password);
    }

    const encryptedClientID = localStorage.getItem('clientID');
    const encryptedTenantID = localStorage.getItem('tenantID');

    if (encryptedClientID && encryptedTenantID) {
        const clientID = decrypt(encryptedClientID, sessionPassword);
        const tenantID = decrypt(encryptedTenantID, sessionPassword);
        
        if (clientID !== null && tenantID !== null) {
            document.getElementById('clientID').value = clientID;
            document.getElementById('tenantID').value = tenantID;
        }
    } else {
        alert('No data found.');
    }
}

function saveData() {
    if (!sessionPassword) {
        let password = prompt('Enter your password:');
        setPasswordSession(password);
    }

    const clientID = document.getElementById('clientID').value;
    const tenantID = document.getElementById('tenantID').value;

    if (!clientID || !tenantID) {
        alert('Both fields must be filled.');
        return;
    }

    const encryptedClientID = encrypt(clientID, sessionPassword);
    const encryptedTenantID = encrypt(tenantID, sessionPassword);

    localStorage.setItem('clientID', encryptedClientID);
    localStorage.setItem('tenantID', encryptedTenantID);

    alert('Data saved successfully.');
}

function resetSession() {
    sessionPassword = null;
    clearTimeout(passwordTimer);
    alert('Session has been reset.');
    document.getElementById('sessionExpiry').innerText = 'Session has been reset.';
}

function login() {
    alert('Logging in...');
    // Implement your login logic here
}
