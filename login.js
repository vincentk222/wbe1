document.getElementById('login').addEventListener('click', function() {
    let clientId = getCookie('clientId');
    let tenantId = getCookie('tenantId');

    // Pré-remplir les valeurs dans les prompts si elles existent déjà
    clientId = prompt("Please enter your clientId", clientId || "");
    tenantId = prompt("Please enter your tenantId", tenantId || "");

    if (clientId && tenantId) {
        setCookie('clientId', clientId, 7); // Stocker pour 7 jours
        setCookie('tenantId', tenantId, 7); // Stocker pour 7 jours

        const redirectUri = encodeURIComponent(window.location.origin + '/viewer.html');
        const scope = encodeURIComponent('openid profile User.Read');
        const responseType = 'id_token token';
        const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&response_mode=fragment&nonce=${Math.random().toString(36).substr(2, 9)}`;

        window.location.href = authUrl;
    } else {
        alert('ClientId and TenantId are required');
    }
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
