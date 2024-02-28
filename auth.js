document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
        exchangeCodeForToken(code);
    } else {
        document.getElementById('error').textContent = 'Authorization code not found.';
    }
});

function exchangeCodeForToken(code) {
    const clientId = 'YOUR_CLIENT_ID'; // Your Azure AD client ID
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Your Azure AD client secret
    const redirectUri = 'https://test.vko.ovh/auth.html'; // Your redirect URI
    const tokenEndpoint = 'https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/token'; // Azure AD token endpoint

    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('scope', 'openid profile User.Read'); // Adjust scopes as needed
    data.append('code', code);
    data.append('redirect_uri', redirectUri);
    data.append('grant_type', 'authorization_code');
    data.append('client_secret', clientSecret);

    fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('error').textContent = `Error: ${data.error_description}`;
        } else {
            document.getElementById('token').textContent = `Access Token: ${data.access_token}`;
        }
    })
    .catch(error => {
        document.getElementById('error').textContent = 'Failed to exchange code for token.';
    });
}
