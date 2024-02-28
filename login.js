// Simulated encryption and decryption using Base64 (Note: This is NOT secure encryption)
function encrypt(text, password) {
    // Simple hash of password to simulate key derivation
    const key = btoa(password).slice(0, 16);
    // Simulating encryption using Base64 encoding for demonstration
    return btoa(text + key); // Append the key to simulate encryption
}

function decrypt(encryptedText, password) {
    const key = btoa(password).slice(0, 16);
    const decodedText = atob(encryptedText);
    if (decodedText.endsWith(key)) {
        return decodedText.slice(0, -key.length); // Remove the key to simulate decryption
    } else {
        alert('Incorrect password or data corrupted.');
        return null;
    }
}

// Session management
let sessionPassword = null;
let passwordTimer = null;

function setPasswordSession(password) {
    sessionPassword = password;
    clearTimeout(passwordTimer);
    passwordTimer = setTimeout(() => {
        sessionPassword = null;
        alert('Session expired. Please enter password again.');
    }, 60000); // 1 minute session timeout
}

function clearFields() {
    document.getElementById('clientID').value = '';
    document.getElementById('tenantID').value = '';
}

function readData() {
    if (!sessionPassword) {
        sessionPassword = prompt('Enter your password:');
        setPasswordSession(sessionPassword);
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
    let clientID = document.getElementById('clientID').value;
    let tenantID = document.getElementById('tenantID').value;

    if (!clientID || !tenantID) {
        alert('Both fields must be filled.');
        return;
    }

    if (!sessionPassword) {
        sessionPassword = prompt('Enter your password:');
        setPasswordSession(sessionPassword);
    }

    const encryptedClientID = encrypt(clientID, sessionPassword);
    const encryptedTenantID = encrypt(tenantID, sessionPassword);

    localStorage.setItem('clientID', encryptedClientID);
    localStorage.setItem('tenantID', encryptedTenantID);

    alert('Data saved successfully.');
}

