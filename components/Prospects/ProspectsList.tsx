'use client';

import { useState } from 'react';
import { useProspects } from '@/hooks/useProspects';
import { Search, Filter, Plus, Phone, Mail, Calendar, Edit, Trash2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ProspectModal from './ProspectModal';

export default function ProspectsList() {
  const { prospects, loading, updateProspect, deleteProspect } = useProspects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = 
      prospect.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || prospect.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      nouveau: 'status-nouveau',
      contacte: 'status-contact',
      interesse: 'status-interesse',
      negocie: 'status-negocie',
      gagne: 'status-gagne',
      perdu: 'status-perdu',
    };
    return colors[status as keyof typeof colors] || 'status-nouveau';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      nouveau: 'Nouveau',
      contacte: 'Contacté',
      interesse: 'Intéressé',
      negocie: 'Négocié',
      gagne: 'Gagné',
      perdu: 'Perdu',
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Prospects</h2>
          <p className="text-gray-600 mt-1">{prospects.length} prospects au total</p>
        </div>
        <button
          onClick={() => {
            setSelectedProspect(null);
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouveau Prospect</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un prospect..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-auto"
            >
              <option value="tous">Tous les statuts</option>
              <option value="nouveau">Nouveau</option>
              <option value="contacte">Contacté</option>
              <option value="interesse">Intéressé</option>
              <option value="negocie">Négocié</option>
              <option value="gagne">Gagné</option>
              <option value="perdu">Perdu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des prospects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProspects.map((prospect, index) => (
          <motion.div
            key={prospect.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="prospect-card"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {prospect.prenom} {prospect.nom}
                </h3>
                <p className="text-sm text-gray-600">{prospect.profession}</p>
              </div>
              <span className={`status-badge ${getStatusColor(prospect.statut)}`}>
                {getStatusLabel(prospect.statut)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-2" />
                {prospect.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-2" />
                {prospect.telephone}
              </div>
              {prospect.age && (
                <div className="text-sm text-gray-600">
                  {prospect.age} ans • {prospect.situation_familiale}
                </div>
              )}
              {prospect.revenus_mensuels && (
                <div className="text-sm text-gray-600">
                  Revenus: {prospect.revenus_mensuels.toLocaleString()}€/mois
                </div>
              )}
            </div>

            {prospect.score_qualite && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Score qualité</span>
                  <span className="font-semibold">{prospect.score_qualite}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${prospect.score_qualite}%` }}
                  ></div>
                </div>
              </div>
            )}

            {prospect.prochaine_action && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex items-center text-sm text-blue-800">
                  <Calendar size={16} className="mr-2" />
                  <span className="font-medium">Prochaine action:</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">{prospect.prochaine_action}</p>
                {prospect.date_prochaine_action && (
                  <p className="text-xs text-blue-600 mt-1">
                    Prévu le {new Date(prospect.date_prochaine_action).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Phone size={16} />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Mail size={16} />
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedProspect(prospect);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteProspect(prospect.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProspects.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun prospect trouvé
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'tous' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre premier prospect'
            }
          </p>
        </div>
      )}

      {/* Modal */}
      <ProspectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prospect={selectedProspect}
      />
    </div>
  );
}