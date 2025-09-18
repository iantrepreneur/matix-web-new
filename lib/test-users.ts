// Utilisateurs de test correspondant à vos comptes Supabase Auth
// IMPORTANT: Utilisez ces identifiants EXACTS pour vous connecter

export const testUsers = [
  {
    email: 'producteur2@gmail.com',
    password: 'votre_mot_de_passe', // Remplacez par le vrai mot de passe
    type: 'producer',
    name: 'Producteur Test',
    description: 'Producteur de volailles premium'
  },
  {
    email: 'producteur1@gmail.com', 
    password: 'votre_mot_de_passe', // Remplacez par le vrai mot de passe
    type: 'producer',
    name: 'Producteur Test 2',
    description: 'Élevage traditionnel'
  },
  {
    email: 'client@gmail.com',
    password: 'votre_mot_de_passe', // Remplacez par le vrai mot de passe
    type: 'client', 
    name: 'Client Test',
    description: 'Client particulier'
  },
  {
    email: 'iantrepreneur221@gmail.com',
    password: 'votre_mot_de_passe', // Remplacez par le vrai mot de passe
    type: 'distributor',
    name: 'Distributeur Test',
    description: 'Distributeur spécialisé'
  },
  {
    email: 'diahatematlick@gmail.com',
    password: 'votre_mot_de_passe', // Remplacez par le vrai mot de passe
    type: 'producer',
    name: 'Ferme Avicole',
    description: 'Ferme avicole de Dakar'
  }
];

// 🚨 INSTRUCTIONS POUR ÉVITER LE RATE LIMIT :
//
// 1. ⏰ ATTENDEZ 15-20 MINUTES avant de réessayer
// 2. 🔄 Utilisez F5 pour recharger complètement la page
// 3. 🧹 Videz le cache du navigateur (Ctrl+Shift+R)
// 4. 🌐 Essayez depuis un autre navigateur (Chrome → Firefox)
// 5. 📱 Ou essayez depuis votre téléphone en 4G
//
// 🎯 POUR LES TESTS FUTURS :
// - Attendez 2-3 secondes entre chaque tentative
// - Ne pas spammer les boutons de connexion
// - Utilisez des emails différents pour chaque test
// - Fermez/rouvrez l'onglet entre les tests

// 🔍 VÉRIFIER LE RATE LIMIT :
// Allez dans Supabase Dashboard → Authentication → Rate Limits
// pour voir le statut actuel et quand il sera réinitialisé