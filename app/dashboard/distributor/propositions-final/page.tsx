export default function DistributorPropositionsFinalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header identique à l'original */}
      <div className="bg-gray-100 text-gray-700 text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">📞</span>
            <span>Nous sommes disponibles 24h/7j, Besoin d'aide ?</span>
            <span className="text-green-600 font-semibold">+221 77 123 45 67</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-green-600">À Propos</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Nous Contacter</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Mon Compte</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600 flex items-center gap-1">🔒 Déconnexion</a>
          </div>
        </div>
      </div>

      {/* Logo Header */}
      <div className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a className="flex items-center" href="/">
              <div className="bg-white text-green-800 p-2 rounded-lg mr-3">
                <div className="w-6 h-6 bg-green-800"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">MATIX</h1>
                <p className="text-xs text-yellow-400 opacity-90">M A R T</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8">
            <a className="text-gray-700 hover:text-green-600 font-medium" href="/">Accueil</a>
            <a className="text-gray-700 hover:text-green-600 font-medium" href="/categories">Catégories</a>
            <a className="text-gray-700 hover:text-green-600 font-medium" href="#">À Propos</a>
            <a className="text-gray-700 hover:text-green-600 font-medium" href="#">Contact</a>
            <a className="text-yellow-400 font-medium" href="/offres">Offres</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-white shadow-sm p-6">
              {/* Profil utilisateur */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 bg-gray-200">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Djoloff_Distribution</h3>
                <p className="text-sm text-gray-500">user@test.com</p>
                <p className="text-xs text-green-600 capitalize">Distributeur</p>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                <a href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Dashboard</span>
                </a>
                
                <a href="/dashboard/products" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Mes Produits</span>
                </a>
                
                <a href="/dashboard/notifications" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Notifications</span>
                </a>
                
                <a href="/dashboard/profile" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Mon Profil</span>
                </a>
                
                <a href="/dashboard/distributor/propositions" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors bg-green-100 text-green-800 font-medium">
                  <div className="w-4 h-4 bg-green-600"></div>
                  <span className="text-sm">Mes Propositions</span>
                </a>
                
                <a href="/dashboard/distributor/search" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Rechercher Producteurs</span>
                </a>
                
                <a href="/dashboard/distributor/quotes" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Mes Devis</span>
                </a>
                
                <a href="/dashboard/distributor/brand" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Ma Marque</span>
                </a>
                
                <a href="/dashboard/distributor/clients" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Mes Clients</span>
                </a>
                
                <a href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 hover:text-green-600">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Déconnexion</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mes Propositions</h1>
                  <p className="text-gray-600 mt-1">
                    Gérez vos propositions envoyées aux producteurs
                  </p>
                </div>
              </div>

              {/* Filtres */}
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                  Toutes (0)
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  En attente (0)
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  Acceptées (0)
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  Refusées (0)
                </button>
              </div>

              {/* Contenu principal */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-400"></div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune proposition trouvée
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Vous n'avez pas encore envoyé de propositions aux producteurs.
                    </p>
                    <a
                      href="/dashboard/distributor/search"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Rechercher des producteurs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


