const loginForm = document.getElementById("loginForm");
const clientIDInput = document.getElementById("clientID");
const tenantIDInput = document.getElementById("tenantID");
const loginButton = document.getElementById("loginButton");

const encryptData = (clientID, tenantID, password) => {
  // Use the CryptoJS library to encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify({ clientID, tenantID }),
    password
  ).toString();

  // Store the encrypted data in session storage
  sessionStorage.setItem("encryptedData", encryptedData);
};

const decryptData = password => {
  // Get the encrypted data from session storage
  const encryptedData = sessionStorage.getItem("encryptedData");

  if (!encryptedData) {
    return null;
  }

  // Use the CryptoJS library to decrypt the data
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, password);

  // Parse the decrypted data as JSON
  const { clientID, tenantID } = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

  return { clientID, tenantID };
};

const checkEncryptedData = () => {
  // Check if encrypted data exists in session storage
  const encryptedData = sessionStorage.getItem("encryptedData");

  if (encryptedData) {
    // If encrypted data exists, try to decrypt it
    const decryptedData = decryptData(password);

    if (decryptedData) {
      // If decryption was successful, populate the input fields
      clientIDInput.value = decryptedData.clientID;
      tenantIDInput.value = decryptedData.tenantID;

      // Enable the login button
      loginButton.disabled = false;
    } else {
      // If decryption failed, clear the encrypted data
      sessionStorage.removeItem("encryptedData");
    }
  }
};

let password;

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Get the password from the input field
  password = document.getElementById("password").value;

  if (password) {
    // Encrypt the data with the password
    encryptData(clientIDInput.value, tenantIDInput.value, password);

    // Redirect to the index page
    window.location.href = "index.html";
  }
});

// Check for encrypted data when the page loads
checkEncryptedData();

// Clear the encrypted data when the session expires (1 minute)
setTimeout(() => {
  sessionStorage.removeItem("encryptedData");
}, 60 * 1000);