async function generateCodeVerifierAndChallenge() {
  const codeVerifier = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(CryptoJS.lib.WordArray.random(32).toString()));
  const codeVerifierBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(codeVerifier)));
  const codeVerifierBase64URL = codeVerifierBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const codeChallenge = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifierBase64URL));
  const codeChallengeBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(codeChallenge)));
  const codeChallengeBase64URL = codeChallengeBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return { codeVerifier: codeVerifierBase64URL, codeChallenge: codeChallengeBase64URL };
}
  
  

// Generate a state and a nonce for security purposes
function generateStateAndNonce() {
  const state = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const nonce = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return { state, nonce };
}

// Initiate the login process
async function initiateLogin() {
  const { codeVerifier, codeChallenge } = generateCodeVerifierAndChallenge();
  sessionStorage.setItem('code_verifier', codeVerifier);

  const { state, nonce } = generateStateAndNonce();
  sessionStorage.setItem('nonce', nonce);
  Cookies.set('oauth_state', state, { secure: true, sameSite: 'strict' });

  const clientIdInput = document.getElementById('clientIdInput').value;
  const tenantIdInput = document.getElementById('tenantIdInput').value;
  const scopeInput = document.getElementById('scopeInput').value;

  alert(`Tenant ID: ${tenantIdInput}\nClient ID: ${clientIdInput}`);

  const authEndpoint = `https://login.microsoftonline.com/${tenantIdInput}/oauth2/v2.0/authorize`;
  const redirectUri = 'https://test.vko.ovh/auth.html';

  const loginUrl = `${authEndpoint}?client_id=${clientIdInput}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopeInput)}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&nonce=${nonce}`;
  window.location.href = loginUrl;
}

// Save the input values to localStorage
function saveValues() {
  const clientId = document.getElementById('clientIdInput').value;
  const tenantId = document.getElementById('tenantIdInput').value;
  const scope = document.getElementById('scopeInput').value;

  localStorage.setItem('clientId', clientId);
  localStorage.setItem('tenantId', tenantId);
  localStorage.setItem('scope', scope);
}

// Read the input values from localStorage
function readValues() {
    const clientId = localStorage.getItem('clientId');
    const tenantId = localStorage.getItem('tenantId');
    const scope = localStorage.getItem('scope');
  
    console.log('ClientID:', clientId);
    console.log('TenantID:', tenantId);
    console.log('Scope:', scope);
  
    if (clientId) document.getElementById('clientIdInput').value = clientId;
    if (tenantId) document.getElementById('tenantIdInput').value = tenantId;
    if (scope) document.getElementById('scopeInput').value = scope;
  }

// Clear the input fields
function deleteValues() {
  document.getElementById('clientIdInput').value = '';
  document.getElementById('tenantIdInput').value = '';
  document.getElementById('scopeInput').value = '';
}
