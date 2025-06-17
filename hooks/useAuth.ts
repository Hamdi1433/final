import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type User = Database['public']['Tables']['users']['Row'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un utilisateur connecté pour la démo
    const mockUser: User = {
      id: '1',
      email: 'admin@premunia.com',
      role: 'admin',
      nom: 'Dupont',
      prenom: 'Jean',
      telephone: '0123456789',
      objectif_mensuel: 50000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulation de connexion
    const mockUser: User = {
      id: '1',
      email,
      role: email.includes('admin') ? 'admin' : email.includes('gestionnaire') ? 'gestionnaire' : 'commercial',
      nom: 'Dupont',
      prenom: 'Jean',
      telephone: '0123456789',
      objectif_mensuel: 50000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    return { user: mockUser, error: null };
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
}