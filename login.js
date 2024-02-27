function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorageItem(key) {
    return localStorage.getItem(key);
}

function requestCredentialsAndLogin() {
    // Demande les identifiants à l'utilisateur
    let tenantId = prompt("Please enter your tenant ID:");
    let clientId = prompt("Please enter your client ID:");
    
    // Stocke les identifiants dans le localStorage
    setLocalStorageItem("tenantId", tenantId);
    setLocalStorageItem("clientId", clientId);
    
    // Vous pouvez ici initier le processus de connexion
    // ou appeler une autre fonction qui le fait, en utilisant les identifiants stockés.
}

function login() {
    const tenantId = getLocalStorageItem("tenantId");
    const clientId = getLocalStorageItem("clientId");
    
    if (!tenantId || !clientId) {
        alert("Tenant ID and Client ID are required.");
        return;
    }
    
    // Construisez ici votre URL d'authentification avec tenantId et clientId
    // et redirigez l'utilisateur pour la connexion.
}
