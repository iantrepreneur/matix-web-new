'use client';

export default function TestDirectPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Test Direct - Page Distributeur
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">✅ Page accessible sans DashboardLayout</h2>
          <p className="text-gray-600 mb-4">
            Cette page confirme que le problème vient du DashboardLayout.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">
              🔍 Diagnostic
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• La page se charge correctement</li>
              <li>• Le problème vient du DashboardLayout</li>
              <li>• Il faut corriger la détection du type d'utilisateur</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


