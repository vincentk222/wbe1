function clearFields() {
    document.getElementById('clientID').value = '';
    document.getElementById('tenantID').value = '';
}

function readData() {
    let password = prompt('Enter your password:');
    if (!password) {
        alert('No password provided.');
        return;
    }

    // Here you would decrypt and read the data from a secure location
    console.log('Reading data...');
}

function saveData() {
    let clientID = document.getElementById('clientID').value;
    let tenantID = document.getElementById('tenantID').value;

    if (!clientID || !tenantID) {
        alert('Both fields must be filled.');
        return;
    }

    let password = prompt('Enter your password:');
    if (!password) {
        alert('No password provided.');
        return;
    }

    // Here you would encrypt and save the data securely
    console.log('Saving data...');
}

// Implement session timeout (1 minute) for the password
// Note: This is a simplistic approach. For real-world applications, consider more secure session management.
let sessionPassword;
setTimeout(() => {
    sessionPassword = null;
}, 60000); // 60000 milliseconds = 1 minute
