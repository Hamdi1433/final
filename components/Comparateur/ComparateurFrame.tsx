'use client';

import { useEffect } from 'react';

export default function ComparateurFrame() {
  useEffect(() => {
    // Charger le script du comparateur Oggo
    const script = document.createElement('script');
    script.src = 'https://cks.oggo-data.net/icomparator/health.js';
    script.type = 'text/javascript';
    script.async = true;
    
    document.head.appendChild(script);

    return () => {
      // Nettoyer le script lors du démontage
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Comparateur de Mutuelles Santé
        </h2>
        <p className="text-gray-600 mb-6">
          Utilisez notre comparateur intégré pour proposer les meilleures offres à vos prospects.
          Cet outil vous permet de comparer en temps réel les différentes mutuelles santé disponibles.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Fonctionnalités du comparateur :</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Comparaison en temps réel des offres</li>
            <li>• Filtres par besoins et budget</li>
            <li>• Calcul automatique des remboursements</li>
            <li>• Devis instantanés</li>
            <li>• Interface responsive</li>
          </ul>
        </div>
      </div>

      {/* Frame du comparateur Oggo */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div 
          id="oggodata-icomparator-health" 
          style={{ width: '100%', height: '1500px', minHeight: '1500px' }}
          className="border-0"
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement du comparateur...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Comment utiliser le comparateur :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">1. Saisie des informations</h4>
            <p>Renseignez les informations du prospect : âge, situation familiale, besoins spécifiques.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Filtrage des offres</h4>
            <p>Utilisez les filtres pour affiner les résultats selon le budget et les priorités.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">3. Comparaison détaillée</h4>
            <p>Analysez les garanties, franchises et remboursements de chaque offre.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">4. Génération du devis</h4>
            <p>Créez un devis personnalisé à envoyer directement au prospect.</p>
          </div>
        </div>
      </div>
    </div>
  );
}