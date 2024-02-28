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
    // Implement data decryption and display logic here
    alert('Read data functionality not implemented.');
}

function saveData() {
    const clientID = document.getElementById('clientID').value;
    const tenantID = document.getElementById('tenantID').value;
    const clientSecret = document.getElementById('clientSecret').value;

    if (!clientID || !tenantID || !clientSecret) {
        alert('All fields must be filled.');
        return;
    }

    // Simulate encryption and saving data logic using clientSecret
    alert('Save data functionality not implemented.');
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
