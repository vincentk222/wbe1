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

    let tenantId = getCookie("tenantId");
    let clientId = getCookie("clientId");

    if (tenantId && clientId) {
        // Redirige l'utilisateur vers l'URL de connexion de Microsoft
        const microsoftLoginUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/auth.html')}&response_mode=query&scope=openid%20profile%20email&state=12345`;

        window.location.href = microsoftLoginUrl;
    } else {
        alert("Tenant ID and Client ID are required.");
    }
}


// Exécute la fonction principale lorsque le bouton de connexion est cliqué
function init() {
    document.getElementById('loginButton').addEventListener('click', handleLogin);
}

// Assure que le script s'exécute après le chargement complet de la page
window.onload = init;
