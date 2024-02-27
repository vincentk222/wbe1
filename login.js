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
// Fonction pour demander les identifiants à l'utilisateur et les stocker dans des cookies
function requestCredentialsAndStore() {
    let tenantId = getCookie("tenantId");
    let clientId = getCookie("clientId");

    // Demande les identifiants à l'utilisateur avec des valeurs pré-remplies si disponibles
    tenantId = prompt("Please enter your tenant ID:", tenantId || "");
    clientId = prompt("Please enter your client ID:", clientId || "");
    
    // Vérifie si les valeurs ont été fournies avant de les stocker
    if (tenantId && clientId) {
        setCookie("tenantId", tenantId, 7);
        setCookie("clientId", clientId, 7);
    } else {
        alert("Tenant ID and Client ID are required.");
        return false;
    }
    return true;
}


// Fonction principale pour gérer la connexion
function handleLogin() {
    if (requestCredentialsAndStore()) {
        let tenantId = getCookie("tenantId");
        let clientId = getCookie("clientId");

        // Construit l'URL pour la redirection vers l'authentification Microsoft
        const microsoftLoginUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/auth.html')}&response_mode=query&scope=openid%20profile%20email&state=12345`;

        // Redirige vers l'URL de connexion Microsoft
        window.location.href = microsoftLoginUrl;
    }
}

// Associe l'événement de clic au bouton de connexion
function init() {
    document.getElementById('loginButton').addEventListener('click', handleLogin);
}

// S'assure que la fonction init est appelée lorsque la page est complètement chargée
window.onload = init;




// Fonction pour simuler une connexion et stocker les informations dans localStorage
function simulateLogin() {
    // Exemple de stockage du token d'authentification
    localStorage.setItem('authToken', 'token_simulé');
    // Redirection vers la page viewer.html
	console.log(localStorage.getItem('authToken'));
    window.location.href = 'viewer.html';
}

// Attache la fonction simulateLogin au clic du bouton
document.getElementById('loginButton').addEventListener('click', simulateLogin);
