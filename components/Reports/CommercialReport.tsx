'use client';

import { useState } from 'react';
import { Calendar, Download, TrendingUp, Target, Users, DollarSign, Phone, Mail } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

interface CommercialReportProps {
  commercialId?: string;
  isAdmin?: boolean;
}

export default function CommercialReport({ commercialId, isAdmin = false }: CommercialReportProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const [selectedCommercial, setSelectedCommercial] = useState(commercialId || '1');

  // Données de démonstration pour le rapport commercial
  const reportData = {
    commercial: {
      nom: 'Jean Dupont',
      email: 'jean.dupont@premunia.com',
      telephone: '01 23 45 67 89',
      objectif_mensuel: 50000,
      date_embauche: '2023-06-01',
    },
    kpis: {
      ca_realise: 42500,
      objectif_atteint: 85,
      nb_prospects: 47,
      nb_conversions: 12,
      taux_conversion: 25.5,
      nb_appels: 156,
      nb_emails: 89,
      nb_rdv: 23,
      ca_moyen_par_vente: 3541,
      temps_cycle_moyen: 18, // jours
    },
    evolution_mensuelle: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      ca: [35000, 38000, 41000, 39000, 45000, 42500],
      prospects: [42, 45, 48, 44, 52, 47],
      conversions: [8, 9, 11, 10, 13, 12],
    },
    repartition_statuts: {
      nouveau: 15,
      contacte: 12,
      interesse: 8,
      negocie: 5,
      gagne: 12,
      perdu: 8,
    },
    activites_semaine: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      appels: [12, 15, 18, 14, 20],
      emails: [8, 12, 10, 16, 14],
      rdv: [2, 3, 4, 2, 5],
    },
    top_sources: [
      { source: 'Site web', nb_prospects: 18, ca_genere: 15200 },
      { source: 'Recommandation', nb_prospects: 12, ca_genere: 12800 },
      { source: 'Campagne email', nb_prospects: 8, ca_genere: 7200 },
      { source: 'Téléprospection', nb_prospects: 6, ca_genere: 4800 },
      { source: 'Réseaux sociaux', nb_prospects: 3, ca_genere: 2500 },
    ],
  };

  const commerciaux = [
    { id: '1', nom: 'Jean Dupont' },
    { id: '2', nom: 'Marie Martin' },
    { id: '3', nom: 'Pierre Durand' },
    { id: '4', nom: 'Sophie Leroy' },
  ];

  // Configuration des graphiques
  const evolutionCAData = {
    labels: reportData.evolution_mensuelle.labels,
    datasets: [
      {
        label: 'CA Réalisé (€)',
        data: reportData.evolution_mensuelle.ca,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Objectif (€)',
        data: Array(6).fill(reportData.commercial.objectif_mensuel),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const repartitionStatusData = {
    labels: ['Nouveau', 'Contacté', 'Intéressé', 'Négocié', 'Gagné', 'Perdu'],
    datasets: [
      {
        data: Object.values(reportData.repartition_statuts),
        backgroundColor: [
          '#3B82F6',
          '#F59E0B',
          '#10B981',
          '#8B5CF6',
          '#06D6A0',
          '#EF4444',
        ],
        borderWidth: 0,
      },
    ],
  };

  const activitesData = {
    labels: reportData.activites_semaine.labels,
    datasets: [
      {
        label: 'Appels',
        data: reportData.activites_semaine.appels,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Emails',
        data: reportData.activites_semaine.emails,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'RDV',
        data: reportData.activites_semaine.rdv,
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Rapport Commercial Détaillé' : 'Mon Rapport de Performance'}
          </h2>
          <p className="text-gray-600 mt-1">
            Analyse complète des performances commerciales
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <select
              value={selectedCommercial}
              onChange={(e) => setSelectedCommercial(e.target.value)}
              className="input-field w-auto"
            >
              {commerciaux.map(commercial => (
                <option key={commercial.id} value={commercial.id}>
                  {commercial.nom}
                </option>
              ))}
            </select>
          )}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field w-auto"
          >
            <option value="semaine">Cette semaine</option>
            <option value="mois">Ce mois</option>
            <option value="trimestre">Ce trimestre</option>
            <option value="annee">Cette année</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Exporter PDF</span>
          </button>
        </div>
      </div>

      {/* Informations Commercial */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Commercial</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
              {reportData.commercial.nom.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{reportData.commercial.nom}</p>
              <p className="text-sm text-gray-600">Commercial Senior</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{reportData.commercial.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Téléphone</p>
            <p className="font-medium text-gray-900">{reportData.commercial.telephone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Objectif Mensuel</p>
            <p className="font-medium text-gray-900">
              {reportData.commercial.objectif_mensuel.toLocaleString()}€
            </p>
          </div>
        </div>
      </div>

      {/* KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA Réalisé</p>
              <p className="text-2xl font-bold text-gray-900">
                {reportData.kpis.ca_realise.toLocaleString()}€
              </p>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${reportData.kpis.objectif_atteint}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {reportData.kpis.objectif_atteint}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prospects Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.kpis.nb_prospects}</p>
              <p className="text-sm text-green-600 mt-2">+5 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.kpis.taux_conversion}%</p>
              <p className="text-sm text-green-600 mt-2">+2.3% vs mois dernier</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA Moyen/Vente</p>
              <p className="text-2xl font-bold text-gray-900">
                {reportData.kpis.ca_moyen_par_vente.toLocaleString()}€
              </p>
              <p className="text-sm text-green-600 mt-2">+8% vs mois dernier</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution du CA */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Évolution du Chiffre d&apos;Affaires
          </h3>
          <div className="chart-container">
            <Line data={evolutionCAData} options={chartOptions} />
          </div>
        </div>

        {/* Répartition des Prospects */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des Prospects par Statut
          </h3>
          <div className="chart-container">
            <Doughnut data={repartitionStatusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Activités et Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités Hebdomadaires */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activités de la Semaine
          </h3>
          <div className="chart-container">
            <Bar data={activitesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Sources de Prospects
          </h3>
          <div className="space-y-4">
            {reportData.top_sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{source.source}</p>
                  <p className="text-sm text-gray-600">{source.nb_prospects} prospects</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {source.ca_genere.toLocaleString()}€
                  </p>
                  <p className="text-sm text-gray-600">CA généré</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métriques Détaillées */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Métriques Détaillées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Phone className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-900">{reportData.kpis.nb_appels}</p>
            <p className="text-sm text-blue-700">Appels effectués</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Mail className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-green-900">{reportData.kpis.nb_emails}</p>
            <p className="text-sm text-green-700">Emails envoyés</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Calendar className="mx-auto text-purple-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-purple-900">{reportData.kpis.nb_rdv}</p>
            <p className="text-sm text-purple-700">RDV planifiés</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingUp className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-orange-900">{reportData.kpis.temps_cycle_moyen}</p>
            <p className="text-sm text-orange-700">Jours cycle moyen</p>
          </div>
        </div>
      </div>
    </div>
  );
}