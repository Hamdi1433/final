import { useState, useEffect } from 'react';
import type { Database } from '@/lib/supabase';

type Prospect = Database['public']['Tables']['prospects']['Row'];

// Données de démonstration
const mockProspects: Prospect[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@email.com',
    telephone: '0123456789',
    age: 35,
    situation_familiale: 'Mariée, 2 enfants',
    profession: 'Cadre commercial',
    revenus_mensuels: 4500,
    statut: 'interesse',
    source: 'Site web',
    commercial_id: '1',
    notes: 'Très intéressée par une mutuelle famille complète',
    derniere_interaction: 'Appel téléphonique du 15/01/2024',
    prochaine_action: 'Envoyer devis personnalisé',
    date_prochaine_action: '2024-01-20',
    score_qualite: 85,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Pierre',
    email: 'pierre.dubois@email.com',
    telephone: '0987654321',
    age: 42,
    situation_familiale: 'Célibataire',
    profession: 'Ingénieur',
    revenus_mensuels: 5200,
    statut: 'negocie',
    source: 'Recommandation',
    commercial_id: '1',
    notes: 'Recherche une couverture premium',
    derniere_interaction: 'RDV en agence le 18/01/2024',
    prochaine_action: 'Finaliser le contrat',
    date_prochaine_action: '2024-01-22',
    score_qualite: 92,
    created_at: '2024-01-08T09:15:00Z',
    updated_at: '2024-01-18T16:45:00Z',
  },
  {
    id: '3',
    nom: 'Leroy',
    prenom: 'Marie',
    email: 'marie.leroy@email.com',
    telephone: '0147258369',
    age: 28,
    situation_familiale: 'En couple',
    profession: 'Professeure',
    revenus_mensuels: 3200,
    statut: 'nouveau',
    source: 'Campagne email',
    commercial_id: '1',
    notes: 'Premier contact établi',
    derniere_interaction: 'Email de bienvenue envoyé',
    prochaine_action: 'Appel de qualification',
    date_prochaine_action: '2024-01-21',
    score_qualite: 65,
    created_at: '2024-01-19T11:20:00Z',
    updated_at: '2024-01-19T11:20:00Z',
  },
];

export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setProspects(mockProspects);
      setLoading(false);
    }, 1000);
  }, []);

  const addProspect = async (prospectData: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>) => {
    const newProspect: Prospect = {
      ...prospectData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setProspects(prev => [...prev, newProspect]);
    return { data: newProspect, error: null };
  };

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    setProspects(prev => 
      prev.map(prospect => 
        prospect.id === id 
          ? { ...prospect, ...updates, updated_at: new Date().toISOString() }
          : prospect
      )
    );
    return { error: null };
  };

  const deleteProspect = async (id: string) => {
    setProspects(prev => prev.filter(prospect => prospect.id !== id));
    return { error: null };
  };

  const getProspectsByCommercial = (commercialId: string) => {
    return prospects.filter(prospect => prospect.commercial_id === commercialId);
  };

  const getProspectsByStatus = (status: Prospect['statut']) => {
    return prospects.filter(prospect => prospect.statut === status);
  };

  return {
    prospects,
    loading,
    addProspect,
    updateProspect,
    deleteProspect,
    getProspectsByCommercial,
    getProspectsByStatus,
  };
}