// Import the required libraries
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

// Generate a code verifier and a code challenge for PKCE
function generateCodeVerifierAndChallenge() {
  const codeVerifier = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const codeChallenge = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64URL);

  return { codeVerifier, codeChallenge };
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

  const authEndpoint = `https://login.microsoftonline.com/${tenantIdInput}/oauth2/v2.0/authorize`;
  const redirectUri = 'https://test.vko.ovh/auth.html';

  const loginUrl = `${authEndpoint}?client_id=${clientIdInput}&response_type=code&redirect_uri=${redirectUri}&scope=${scopeInput}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&nonce=${nonce}`;

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
}

// Clear the input fields
function deleteValues() {
  document.getElementById('clientIdInput').value = '';
  document.getElementById('tenantIdInput').value = '';
  document.getElementById('scopeInput').value = '';
}
