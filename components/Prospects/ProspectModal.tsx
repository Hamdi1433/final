'use client';

import { useState, useEffect } from 'react';
import { useProspects } from '@/hooks/useProspects';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect?: any;
}

export default function ProspectModal({ isOpen, onClose, prospect }: ProspectModalProps) {
  const { addProspect, updateProspect } = useProspects();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    age: '',
    situation_familiale: '',
    profession: '',
    revenus_mensuels: '',
    statut: 'nouveau',
    source: '',
    notes: '',
    prochaine_action: '',
    date_prochaine_action: '',
    score_qualite: 50,
  });

  useEffect(() => {
    if (prospect) {
      setFormData({
        nom: prospect.nom || '',
        prenom: prospect.prenom || '',
        email: prospect.email || '',
        telephone: prospect.telephone || '',
        age: prospect.age?.toString() || '',
        situation_familiale: prospect.situation_familiale || '',
        profession: prospect.profession || '',
        revenus_mensuels: prospect.revenus_mensuels?.toString() || '',
        statut: prospect.statut || 'nouveau',
        source: prospect.source || '',
        notes: prospect.notes || '',
        prochaine_action: prospect.prochaine_action || '',
        date_prochaine_action: prospect.date_prochaine_action || '',
        score_qualite: prospect.score_qualite || 50,
      });
    } else {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        age: '',
        situation_familiale: '',
        profession: '',
        revenus_mensuels: '',
        statut: 'nouveau',
        source: '',
        notes: '',
        prochaine_action: '',
        date_prochaine_action: '',
        score_qualite: 50,
      });
    }
  }, [prospect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const prospectData = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : undefined,
      revenus_mensuels: formData.revenus_mensuels ? parseFloat(formData.revenus_mensuels) : undefined,
      commercial_id: '1', // ID du commercial connecté
    };

    try {
      if (prospect) {
        await updateProspect(prospect.id, prospectData);
        toast.success('Prospect mis à jour avec succès');
      } else {
        await addProspect(prospectData);
        toast.success('Prospect ajouté avec succès');
      }
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {prospect ? 'Modifier le prospect' : 'Nouveau prospect'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Âge
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Situation familiale
                </label>
                <select
                  value={formData.situation_familiale}
                  onChange={(e) => setFormData({ ...formData, situation_familiale: e.target.value })}
                  className="input-field"
                >
                  <option value="">Sélectionner</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="En couple">En couple</option>
                  <option value="Marié(e)">Marié(e)</option>
                  <option value="Marié(e), 1 enfant">Marié(e), 1 enfant</option>
                  <option value="Marié(e), 2 enfants">Marié(e), 2 enfants</option>
                  <option value="Marié(e), 3+ enfants">Marié(e), 3+ enfants</option>
                </select>
              </div>
            </div>
          </div>

          {/* Informations professionnelles */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations professionnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenus mensuels (€)
                </label>
                <input
                  type="number"
                  value={formData.revenus_mensuels}
                  onChange={(e) => setFormData({ ...formData, revenus_mensuels: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Informations CRM */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations CRM</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                  className="input-field"
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="contacte">Contacté</option>
                  <option value="interesse">Intéressé</option>
                  <option value="negocie">Négocié</option>
                  <option value="gagne">Gagné</option>
                  <option value="perdu">Perdu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="input-field"
                >
                  <option value="">Sélectionner</option>
                  <option value="Site web">Site web</option>
                  <option value="Recommandation">Recommandation</option>
                  <option value="Campagne email">Campagne email</option>
                  <option value="Réseaux sociaux">Réseaux sociaux</option>
                  <option value="Téléprospection">Téléprospection</option>
                  <option value="Salon/Événement">Salon/Événement</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score qualité: {formData.score_qualite}/100
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.score_qualite}
                  onChange={(e) => setFormData({ ...formData, score_qualite: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date prochaine action
                </label>
                <input
                  type="date"
                  value={formData.date_prochaine_action}
                  onChange={(e) => setFormData({ ...formData, date_prochaine_action: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Actions et notes */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prochaine action
              </label>
              <input
                type="text"
                value={formData.prochaine_action}
                onChange={(e) => setFormData({ ...formData, prochaine_action: e.target.value })}
                className="input-field"
                placeholder="Ex: Appel de suivi, Envoi devis..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input-field"
                placeholder="Notes sur le prospect..."
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {prospect ? 'Mettre à jour' : 'Créer le prospect'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}