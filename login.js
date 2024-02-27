// Fonction pour définir un cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Fonction pour obtenir un cookie
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

// Fonction pour demander les identifiants à l'utilisateur et les stocker dans des cookies
function requestCredentialsAndStore() {
    let tenantId = getCookie("tenantId");
    let clientId = getCookie("clientId");

    // Demande les identifiants à l'utilisateur si non présents
    if (!tenantId) {
        tenantId = prompt("Please enter your tenant ID:");
        if (tenantId) { // Vérifie si l'utilisateur a bien saisi une valeur
            setCookie("tenantId", tenantId, 7); // Stocke dans les cookies pour 7 jours
        }
    }

    if (!clientId) {
        clientId = prompt("Please enter your client ID:");
        if (clientId) { // Vérifie si l'utilisateur a bien saisi une valeur
            setCookie("clientId", clientId, 7); // Stocke dans les cookies pour 7 jours
        }
    }
}

// Fonction principale pour gérer la connexion
function handleLogin() {
    requestCredentialsAndStore();
    // Après avoir obtenu et stocké les identifiants, vous pouvez ici initier le processus de connexion.
    // Ce processus dépend de l'API spécifique que vous utilisez et de la manière dont elle gère l'authentification.
}

// Exécute la fonction principale lorsque le bouton de connexion est cliqué
function init() {
    document.getElementById('loginButton').addEventListener('click', handleLogin);
}

// Assure que le script s'exécute après le chargement complet de la page
window.onload = init;
