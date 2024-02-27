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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function requestCredentialsAndLogin() {
    // Vérifie si les cookies existent déjà
    let tenantId = getCookie("tenantId");
    let clientId = getCookie("clientId");

    // Si non présents, demande à l'utilisateur et met à jour les cookies
    if (!tenantId) {
        tenantId = prompt("Please enter your tenant ID:", tenantId);
        setCookie("tenantId", tenantId, 7); // Stocke dans les cookies pour 7 jours
    }

    if (!clientId) {
        clientId = prompt("Please enter your client ID:", clientId);
        setCookie("clientId", clientId, 7); // Stocke dans les cookies pour 7 jours
    }
    
    // Ici, vous pouvez initier le processus de connexion en utilisant les valeurs récupérées
}
