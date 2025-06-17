'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Layout/Sidebar';
import StatsCards from '@/components/Dashboard/StatsCards';
import Charts from '@/components/Dashboard/Charts';
import ProspectsList from '@/components/Prospects/ProspectsList';
import MarketingAutomation from '@/components/Marketing/MarketingAutomation';
import ComparateurFrame from '@/components/Comparateur/ComparateurFrame';
import CommercialReport from '@/components/Reports/CommercialReport';
import DataUpload from '@/components/Upload/DataUpload';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              Premunia CRM
            </h1>
            <p className="text-gray-600 mt-2">Connectez-vous à votre espace</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Comptes de démonstration :</p>
            <p>admin@premunia.com (Admin)</p>
            <p>gestionnaire@premunia.com (Gestionnaire)</p>
            <p>commercial@premunia.com (Commercial)</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Bonjour {user.prenom} 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Voici un aperçu de vos performances aujourd&apos;hui
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <StatsCards userRole={user.role} />
            <Charts userRole={user.role} />
          </motion.div>
        );
      
      case 'prospects':
        return <ProspectsList />;
      
      case 'pipeline':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Pipeline Commercial</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Module Pipeline en cours de développement...</p>
            </div>
          </div>
        );
      
      case 'activites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Activités</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Module Activités en cours de développement...</p>
            </div>
          </div>
        );
      
      case 'comparateur':
        return <ComparateurFrame />;
      
      case 'rapports':
        return <CommercialReport commercialId={user.id} isAdmin={user.role === 'admin'} />;
      
      case 'marketing':
        return user.role === 'admin' ? <MarketingAutomation /> : null;
      
      case 'upload':
        return user.role === 'admin' ? <DataUpload /> : null;
      
      case 'utilisateurs':
        return user.role === 'admin' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Module Utilisateurs en cours de développement...</p>
            </div>
          </div>
        ) : null;
      
      case 'objectifs':
        return (user.role === 'admin' || user.role === 'gestionnaire') ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Objectifs</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Module Objectifs en cours de développement...</p>
            </div>
          </div>
        ) : null;
      
      case 'settings':
        return user.role === 'admin' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Module Paramètres en cours de développement...</p>
            </div>
          </div>
        ) : null;
      
      default:
        return (
          <div className="space-y-6">
            <StatsCards userRole={user.role} />
            <Charts userRole={user.role} />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}