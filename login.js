function generateCodeVerifierAndChallenge() {
    const codeVerifier = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const codeChallenge = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64URL);
  
    return { codeVerifier, codeChallenge };
  }
  
  function generateStateAndNonce() {
    const state = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const nonce = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
    return { state, nonce };
  }
  
  async function initiateLogin() {
    const { codeVerifier, codeChallenge } = generateCodeVerifierAndChallenge();
    sessionStorage.setItem('code_verifier', codeVerifier);
  
    const { state, nonce } = generateStateAndNonce();
    sessionStorage.setItem('nonce', nonce);
    Cookies.set('oauth_state', state, { secure: true, sameSite: 'strict' });
  
    const authEndpoint = 'https://login.microsoftonline.com/{tenantID}/oauth2/v2.0/authorize';
    const clientID = 'your_client_id';
    const redirectUri = 'https://test.vko.ovh/auth.html';
    const scope = 'your_scope';
  
    const loginUrl = `${authEndpoint}?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&nonce=${nonce}`;
  
    window.location.href = loginUrl;
  }
  
  // This function should be called in auth.html after exchanging the authorization code for an ID token.
  function verifyStateAndNonceAndProceed(idToken) {
    const urlParams = new URLSearchParams(window.location.search);
    const receivedState = urlParams.get('state');
    const storedState = Cookies.get('oauth_state');
  
    if (receivedState !== storedState) {
      // State values do not match. Reject the request and terminate the authentication process.
      console.error('Invalid state. Possible CSRF attack.');
      return;
    }
  
    const storedNonce = sessionStorage.getItem('nonce');
    const decodedIdToken = jwt_decode(idToken);
    const receivedNonce = decodedIdToken.nonce;
  
    if (receivedNonce !== storedNonce) {
      // Nonce values do not match. Reject the ID token and terminate the authentication process.
      console.error('Invalid nonce. Possible token replay attack.');
      return;
    }
  
    // State and nonce values match. Proceed with the authentication process.
    // ...
  
    // Remove the state cookie and nonce from session storage after use.
    Cookies.remove('oauth_state');
    sessionStorage.removeItem('nonce');
  }
  