document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#clientID, #tenantID, #clientSecret');
    const loginButton = document.getElementById('loginButton');

    function updateLoginButtonState() {
        const clientID = document.getElementById('clientID').value;
        const tenantID = document.getElementById('tenantID').value;
        const clientSecret = document.getElementById('clientSecret').value;
        loginButton.disabled = !clientID || !tenantID || !clientSecret;
    }

    inputs.forEach(input => {
        input.addEventListener('keyup', updateLoginButtonState);
    });

    updateLoginButtonState(); // Initial check on page load
});

function clearFields() {
    document.getElementById('clientID').value = '';
    document.getElementById('tenantID').value = '';
    document.getElementById('clientSecret').value = '';
}

function readData() {
    if (!sessionPassword) {
        let password = prompt('Enter your password:');
        setPasswordSession(password);
    }

    // Retrieve and decrypt the data from localStorage
    const encryptedClientID = localStorage.getItem('clientID');
    const encryptedTenantID = localStorage.getItem('tenantID');
    const encryptedClientSecret = localStorage.getItem('clientSecret'); // Retrieve encrypted clientSecret

    if (encryptedClientID && encryptedTenantID && encryptedClientSecret) {
        const clientID = decrypt(encryptedClientID, sessionPassword);
        const tenantID = decrypt(encryptedTenantID, sessionPassword);
        const clientSecret = decrypt(encryptedClientSecret, sessionPassword); // Decrypt clientSecret

        if (clientID !== null && tenantID !== null && clientSecret !== null) {
            document.getElementById('clientID').value = clientID;
            document.getElementById('tenantID').value = tenantID;
            document.getElementById('clientSecret').value = clientSecret; // Display decrypted clientSecret
        } else {
            alert('Decryption failed. Check the password and try again.');
        }
    } else {
        alert('No data found. Please save your credentials first.');
    }
}


function saveData() {
    const clientID = document.getElementById('clientID').value;
    const tenantID = document.getElementById('tenantID').value;
    const clientSecret = document.getElementById('clientSecret').value;

    if (!clientID || !tenantID || !clientSecret) {
        alert('All fields must be filled.');
        return;
    }

    // Encrypting the values before storing them
    const encryptedClientID = encrypt(clientID, sessionPassword);
    const encryptedTenantID = encrypt(tenantID, sessionPassword);
    const encryptedClientSecret = encrypt(clientSecret, sessionPassword); // Encrypt clientSecret similarly

    localStorage.setItem('clientID', encryptedClientID);
    localStorage.setItem('tenantID', encryptedTenantID);
    localStorage.setItem('clientSecret', encryptedClientSecret); // Store encrypted clientSecret

    alert('Data saved successfully.');
}

function resetSession() {
    // Reset session and display logic here
    alert('Reset session functionality not implemented.');
}

function login() {
    const clientID = document.getElementById('clientID').value;
    const tenantID = document.getElementById('tenantID').value;
    const clientSecret = document.getElementById('clientSecret').value;

    if (!clientID || !tenantID || !clientSecret) {
        alert('Please enter Client ID, Tenant ID, and Client Secret.');
        return;
    }

    // Since clientSecret should not be used in client-side for real applications,
    // this part is illustrative only.
    const redirectURI = encodeURIComponent('https://test.vko.ovh/auth.html');
    const scope = encodeURIComponent('openid profile User.Read');
    const responseType = 'code';
    const authURL = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/authorize?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${scope}&client_secret=${clientSecret}`; // This is NOT recommended for actual use

    window.location.href = authURL;
}
