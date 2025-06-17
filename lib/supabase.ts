import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'gestionnaire' | 'commercial';
          nom: string;
          prenom: string;
          telephone?: string;
          objectif_mensuel?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: 'admin' | 'gestionnaire' | 'commercial';
          nom: string;
          prenom: string;
          telephone?: string;
          objectif_mensuel?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'gestionnaire' | 'commercial';
          nom?: string;
          prenom?: string;
          telephone?: string;
          objectif_mensuel?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      prospects: {
        Row: {
          id: string;
          nom: string;
          prenom: string;
          email: string;
          telephone: string;
          age?: number;
          situation_familiale?: string;
          profession?: string;
          revenus_mensuels?: number;
          statut: 'nouveau' | 'contacte' | 'interesse' | 'negocie' | 'gagne' | 'perdu';
          source: string;
          commercial_id: string;
          notes?: string;
          derniere_interaction?: string;
          prochaine_action?: string;
          date_prochaine_action?: string;
          score_qualite?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          prenom: string;
          email: string;
          telephone: string;
          age?: number;
          situation_familiale?: string;
          profession?: string;
          revenus_mensuels?: number;
          statut?: 'nouveau' | 'contacte' | 'interesse' | 'negocie' | 'gagne' | 'perdu';
          source: string;
          commercial_id: string;
          notes?: string;
          derniere_interaction?: string;
          prochaine_action?: string;
          date_prochaine_action?: string;
          score_qualite?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          prenom?: string;
          email?: string;
          telephone?: string;
          age?: number;
          situation_familiale?: string;
          profession?: string;
          revenus_mensuels?: number;
          statut?: 'nouveau' | 'contacte' | 'interesse' | 'negocie' | 'gagne' | 'perdu';
          source?: string;
          commercial_id?: string;
          notes?: string;
          derniere_interaction?: string;
          prochaine_action?: string;
          date_prochaine_action?: string;
          score_qualite?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      campagnes_email: {
        Row: {
          id: string;
          nom: string;
          sujet: string;
          contenu: string;
          type: 'relance' | 'nurturing' | 'promotion';
          statut: 'brouillon' | 'active' | 'terminee';
          date_envoi?: string;
          nb_envoyes?: number;
          nb_ouverts?: number;
          nb_clics?: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          sujet: string;
          contenu: string;
          type: 'relance' | 'nurturing' | 'promotion';
          statut?: 'brouillon' | 'active' | 'terminee';
          date_envoi?: string;
          nb_envoyes?: number;
          nb_ouverts?: number;
          nb_clics?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          sujet?: string;
          contenu?: string;
          type?: 'relance' | 'nurturing' | 'promotion';
          statut?: 'brouillon' | 'active' | 'terminee';
          date_envoi?: string;
          nb_envoyes?: number;
          nb_ouverts?: number;
          nb_clics?: number;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      activites: {
        Row: {
          id: string;
          type: 'appel' | 'email' | 'rdv' | 'relance';
          titre: string;
          description?: string;
          prospect_id: string;
          commercial_id: string;
          date_prevue: string;
          date_realisee?: string;
          statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
          resultat?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'appel' | 'email' | 'rdv' | 'relance';
          titre: string;
          description?: string;
          prospect_id: string;
          commercial_id: string;
          date_prevue: string;
          date_realisee?: string;
          statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
          resultat?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'appel' | 'email' | 'rdv' | 'relance';
          titre?: string;
          description?: string;
          prospect_id?: string;
          commercial_id?: string;
          date_prevue?: string;
          date_realisee?: string;
          statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
          resultat?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};