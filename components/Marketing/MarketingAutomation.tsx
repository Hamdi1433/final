'use client';

import { useState } from 'react';
import { Mail, Send, Users, TrendingUp, Calendar, Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function MarketingAutomation() {
  const [activeTab, setActiveTab] = useState('campagnes');
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      nom: 'Relance Prospects Seniors',
      type: 'relance',
      statut: 'active',
      sujet: 'Votre mutuelle santé senior - Offre spéciale',
      nb_envoyes: 245,
      nb_ouverts: 98,
      nb_clics: 23,
      taux_ouverture: 40,
      taux_clic: 9.4,
      date_creation: '2024-01-15',
      prochaine_execution: '2024-01-25',
    },
    {
      id: '2',
      nom: 'Nurturing Nouveaux Prospects',
      type: 'nurturing',
      statut: 'brouillon',
      sujet: 'Découvrez nos solutions mutuelle adaptées',
      nb_envoyes: 0,
      nb_ouverts: 0,
      nb_clics: 0,
      taux_ouverture: 0,
      taux_clic: 0,
      date_creation: '2024-01-20',
      prochaine_execution: null,
    },
  ]);

  const [templates] = useState([
    {
      id: '1',
      nom: 'Relance Senior - Première approche',
      type: 'relance',
      sujet: 'Votre protection santé après 55 ans',
      contenu: `Bonjour {{prenom}},

À partir de 55 ans, vos besoins en matière de santé évoluent. Nos mutuelles seniors sont spécialement conçues pour vous offrir une protection optimale.

🏥 Remboursements renforcés
👓 Optique et dentaire prioritaires  
💊 Médecines douces incluses
🚑 Assistance 24h/7j

Découvrez notre offre personnalisée en quelques clics.

Cordialement,
L'équipe Premunia`,
    },
    {
      id: '2',
      nom: 'Nurturing - Éducation produit',
      type: 'nurturing',
      sujet: 'Comment bien choisir sa mutuelle santé ?',
      contenu: `Bonjour {{prenom}},

Choisir sa mutuelle santé peut sembler complexe. Voici nos conseils d'experts :

✅ Analysez vos besoins réels
✅ Comparez les garanties essentielles
✅ Vérifiez les réseaux de soins
✅ Étudiez les délais de carence

Notre comparateur gratuit vous aide à y voir plus clair.

À bientôt,
Votre conseiller Premunia`,
    },
  ]);

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      brouillon: 'bg-yellow-100 text-yellow-800',
      terminee: 'bg-gray-100 text-gray-800',
      pause: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      relance: 'bg-blue-100 text-blue-800',
      nurturing: 'bg-purple-100 text-purple-800',
      promotion: 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              statut: campaign.statut === 'active' ? 'pause' : 'active' 
            }
          : campaign
      )
    );
    toast.success('Statut de la campagne mis à jour');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing Automation</h2>
          <p className="text-gray-600 mt-1">Gestion des campagnes email automatisées</p>
        </div>
        <button
          onClick={() => {
            setSelectedCampaign(null);
            setShowCampaignModal(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvelle Campagne</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emails Envoyés</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux d&apos;Ouverture</p>
              <p className="text-2xl font-bold text-gray-900">42.3%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'campagnes', label: 'Campagnes', icon: Mail },
              { id: 'templates', label: 'Templates', icon: Edit },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'campagnes' && (
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {campaign.nom}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.statut)}`}>
                          {campaign.statut}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
                          {campaign.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{campaign.sujet}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Créée le {new Date(campaign.date_creation).toLocaleDateString('fr-FR')}</span>
                        {campaign.prochaine_execution && (
                          <span>Prochaine exécution: {new Date(campaign.prochaine_execution).toLocaleDateString('fr-FR')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleCampaignStatus(campaign.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          campaign.statut === 'active' 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {campaign.statut === 'active' ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowCampaignModal(true);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {campaign.nb_envoyes > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{campaign.nb_envoyes}</p>
                        <p className="text-sm text-gray-600">Envoyés</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{campaign.nb_ouverts}</p>
                        <p className="text-sm text-gray-600">Ouverts ({campaign.taux_ouverture}%)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{campaign.nb_clics}</p>
                        <p className="text-sm text-gray-600">Clics ({campaign.taux_clic}%)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {Math.round(campaign.nb_clics * 0.3)}
                        </p>
                        <p className="text-sm text-gray-600">Conversions</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {template.nom}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Sujet:</p>
                    <p className="text-gray-600">{template.sujet}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Aperçu:</p>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 max-h-32 overflow-y-auto">
                      {template.contenu.substring(0, 200)}...
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Performance Globale</h3>
                  <p className="text-3xl font-bold">42.3%</p>
                  <p className="text-blue-100">Taux d&apos;ouverture moyen</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Engagement</h3>
                  <p className="text-3xl font-bold">9.4%</p>
                  <p className="text-green-100">Taux de clic moyen</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">ROI</h3>
                  <p className="text-3xl font-bold">+284%</p>
                  <p className="text-purple-100">Retour sur investissement</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Évolution des Performances
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Graphique des performances (à implémenter avec Chart.js)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}