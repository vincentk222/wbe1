const form = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const clientIDInput = document.getElementById('clientID');
const tenantIDInput = document.getElementById('tenantID');
const loginButton = document.querySelector('button[type="submit"]');

// Check if clientID and tenantID are already stored in session storage
const clientID = sessionStorage.getItem('clientID');
const tenantID = sessionStorage.getItem('tenantID');

if (clientID && tenantID) {
  // Set the input values
  clientIDInput.value = clientID;
  tenantIDInput.value = tenantID;

  // Enable the login button
  loginButton.disabled = false;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  // Get the password and encrypt the clientID and tenantID
  const password = passwordInput.value;
  const encryptedClientID = encrypt(clientIDInput.value, password);
  const encryptedTenantID = encrypt(tenantIDInput.value, password);

  // Store the encrypted values in session storage
  sessionStorage.setItem('clientID', encryptedClientID);
  sessionStorage.setItem('tenantID', encryptedTenantID);

  // Set a timeout to clear the session storage after 1 minute
  setTimeout(() => {
    sessionStorage.removeItem('clientID');
    sessionStorage.removeItem('tenantID');
  }, 60000);

  // Redirect to index.html
  window.location.href = 'index.html';
});

function encrypt(data, password) {
  // Implement your encryption algorithm here
  // For example, you could use the CryptoJS library to encrypt the data with AES
}
