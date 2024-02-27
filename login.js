document.getElementById('loginButton').addEventListener('click', function() {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin + '/callback');
    const scope = encodeURIComponent('openid profile');
    const responseType = 'id_token token';
    const nonce = Math.random().toString(36).substring(2, 15); // Génère un nonce simple. Pour une production, utilisez une méthode plus sécurisée.
    const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&nonce=${nonce}&response_mode=fragment`;

    window.location.href = url;
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Exemple d'utilisation après avoir reçu le token
setCookie('openid_token', 'VOTRE_TOKEN_ICI', 1);
