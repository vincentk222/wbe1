async function requestAccessToken(code) {
    const clientIdInput = localStorage.getItem('clientId');
    const tenantIdInput = localStorage.getItem('tenantId');
    const redirectUri = 'https://test.vko.ovh/auth.html';
  
    const codeVerifier = sessionStorage.getItem('code_verifier');
  
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantIdInput}/oauth2/v2.0/token`;
  
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('client_id', clientIdInput);
    body.append('scope', 'openid');
    body.append('code', code);
    body.append('redirect_uri', redirectUri);
    body.append('code_verifier', codeVerifier);
  
    try {
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
  
      const data = await response.json();
      console.log('Access token:', data.access_token);
      console.log('ID token:', data.id_token);
  
      // Extract user information from the ID token
      const userInfo = extractUserInfo(data.id_token);
      console.log('User info:', userInfo);
      displayUserInfo(userInfo);
    } catch (error) {
      console.error(error);
    }
  }
  