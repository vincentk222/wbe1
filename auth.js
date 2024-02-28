async function requestAccessToken() {
    // Retrieve configuration from storage
    const clientIdInput = localStorage.getItem('clientId');
    const tenantIdInput = localStorage.getItem('tenantId');
    const redirectUri = 'https://test.vko.ovh/auth.html';
    const codeVerifier = sessionStorage.getItem('code_verifier');
  
    // Construct the token request endpoint
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantIdInput}/oauth2/v2.0/token`;
    console.log('tokenEndpoint:', tokenEndpoint);

    // Extract the code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    // Check for errors in the URL parameters
    if (error) {
        console.error('Error returned from authorization server:', error);
        // Handle the error appropriately
        return;
    }

    if (!code) {
        console.error('Authorization code not found in the URL.');
        // Handle the absence of the code appropriately
        return;
    }
    console.log('Authorization code:', code);
  
    // Prepare the request body
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('client_id', clientIdInput);
    body.append('scope', 'openid');
    body.append('code', code);
    body.append('redirect_uri', redirectUri);
    body.append('code_verifier', codeVerifier);
  
    try {
        // Make the token request
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });
  
        if (!response.ok) {
            throw new Error('Failed to request access token.');
        }
  
        // Process the response
        const data = await response.json();
        console.log('Access token:', data.access_token);
        console.log('ID token:', data.id_token);
  
        // Extract and display user information
        const userInfo = extractUserInfo(data.id_token);
        console.log('User info:', userInfo);
        displayUserInfo(userInfo);
    } catch (error) {
        console.error(error);
    }
}
  
function extractUserInfo(idToken) {
    const parts = idToken.split('.');
    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));
  
    return {
        name: decodedPayload.name,
        email: decodedPayload.email,
        // Add other user information you want to display
    };
}
  
function displayUserInfo(userInfo) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = `Hello, ${userInfo.name}! Your email is ${userInfo.email}.`;
    } else {
        console.error('Message element not found.');
    }
}
