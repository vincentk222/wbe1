const loginForm = document.getElementById("loginForm");
const clientIDInput = document.getElementById("clientID");
const tenantIDInput = document.getElementById("tenantID");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const saveButton = document.getElementById("saveButton");
const readButton = document.getElementById("readButton");
const clearButton = document.getElementById("clearButton");

const encryptData = (clientID, tenantID, password) => {
  // Use the CryptoJS library to encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify({ clientID, tenantID }),
    password
  ).toString();

  // Store the encrypted data in local storage
  localStorage.setItem("encryptedData", encryptedData);
};

const decryptData = password => {
  // Get the encrypted data from local storage
  const encryptedData = localStorage.getItem("encryptedData");

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
  // Check if encrypted data exists in local storage
  const encryptedData = localStorage.getItem("encryptedData");

  if (encryptedData) {
    // If encrypted data exists, try to decrypt it
    const decryptedData = decryptData(passwordInput.value);

    if (decryptedData) {
      // If decryption was successful, populate the input fields
      clientIDInput.value = decryptedData.clientID;
      tenantIDInput.value = decryptedData.tenantID;

      // Enable the login button
      loginButton.disabled = false;
    } else {
      // If decryption failed, clear the encrypted data
      localStorage.removeItem("encryptedData");
    }
  }
};

const saveData = () => {
  // Encrypt the data with the password
  encryptData(clientIDInput.value, tenantIDInput.value, passwordInput.value);

  // Clear the input fields
  clientIDInput.value = "";
  tenantIDInput.value = "";
  passwordInput.value = "";

  // Disable the login button
  loginButton.disabled = true;
};

const readData = () => {
  // Get the decrypted data from local storage
  const decryptedData = decryptData(passwordInput.value);

  if (decryptedData) {
    // Populate the input fields with the decrypted data
    clientIDInput.value = decryptedData.clientID;
    tenantIDInput.value = decryptedData.tenantID;

    // Enable the login button
    loginButton.disabled = false;
  }
};

const clearData = () => {
  // Clear the input fields
  clientIDInput.value = "";
  tenantIDInput.value = "";
  passwordInput.value = "";

  // Disable the login button
  loginButton.disabled = true;

  // Remove the encrypted data from local storage
  localStorage.removeItem("encryptedData");
};

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Encrypt the data with the password
  encryptData(clientIDInput.value, tenantIDInput.value, passwordInput.value);

  // Redirect to the index page
  window.location.href = "index.html";
});

// Check for encrypted data when the page loads
checkEncryptedData();

// Add event listeners for the new buttons
saveButton.addEventListener("click", saveData);
readButton.addEventListener("click", readData);
clearButton.addEventListener("click", clearData);