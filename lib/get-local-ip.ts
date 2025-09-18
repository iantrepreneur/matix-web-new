// Utilitaire pour obtenir l'IP locale
export function getLocalIP(): string {
  // En développement, vous devez remplacer par votre vraie IP locale
  // Trouvez votre IP avec : ipconfig (Windows) ou ifconfig (Mac/Linux)
  
  // Exemples d'IP locales courantes :
  // return '192.168.1.100:3000';  // Réseau domestique
  // return '192.168.0.100:3000';  // Autre réseau domestique
  // return '10.0.0.100:3000';     // Réseau d'entreprise
  
  // Pour l'instant, retourner localhost par défaut
  return 'localhost:3000';
}

export function getBaseURL(): string {
  // En production, utiliser l'URL de production
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com';
  }
  
  // En développement, utiliser l'IP locale si disponible
  const localIP = getLocalIP();
  return `http://${localIP}`;
}

// Instructions pour trouver votre IP locale :
// 
// Windows : 
// 1. Ouvrez cmd
// 2. Tapez : ipconfig
// 3. Cherchez "Adresse IPv4" dans la section WiFi/Ethernet
//
// Mac/Linux :
// 1. Ouvrez Terminal  
// 2. Tapez : ifconfig | grep inet
// 3. Cherchez l'IP qui commence par 192.168 ou 10.0
//
// Exemple : Si votre IP est 192.168.1.105, modifiez getLocalIP() :
// return '192.168.1.105:3000';