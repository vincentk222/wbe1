function checkAuthentication() {
    // Récupère le token d'authentification depuis localStorage
    const authToken = localStorage.getItem('authToken');
    
    // Vérifie si le token existe
    if (!authToken) {
        alert("Vous n'êtes pas authentifié. Vous allez être redirigé vers la page de connexion.");
        window.location.href = 'login.html';
    } else {
        // Si authentifié, affiche un message ou exécute une logique spécifique
        console.log("Authentification réussie. Token:", authToken);
        // Ici, vous pouvez ajouter d'autres vérifications ou logiques spécifiques à la page
    }
}

// La fonction checkAuthentication est appelée à travers l'attribut onload dans le body de viewer.html
