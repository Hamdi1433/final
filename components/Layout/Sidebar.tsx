'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Mail, 
  BarChart3, 
  Calendar, 
  Settings,
  Upload,
  TrendingUp,
  UserCheck,
  MessageSquare,
  FileText,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'prospects', label: 'Prospects', icon: Users },
      { id: 'pipeline', label: 'Pipeline', icon: Target },
      { id: 'activites', label: 'Activités', icon: Calendar },
      { id: 'comparateur', label: 'Comparateur', icon: TrendingUp },
      { id: 'rapports', label: 'Rapports', icon: BarChart3 },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'marketing', label: 'Marketing Auto', icon: Mail },
        { id: 'upload', label: 'Import Données', icon: Upload },
        { id: 'utilisateurs', label: 'Utilisateurs', icon: UserCheck },
        { id: 'objectifs', label: 'Objectifs', icon: Target },
        { id: 'settings', label: 'Paramètres', icon: Settings },
      ];
    }

    if (user?.role === 'gestionnaire') {
      return [
        ...baseItems,
        { id: 'equipe', label: 'Mon Équipe', icon: Users },
        { id: 'objectifs', label: 'Objectifs', icon: Target },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white shadow-xl transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Premunia CRM
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {user?.role === 'admin' ? 'Administrateur' : 
                 user?.role === 'gestionnaire' ? 'Gestionnaire' : 'Commercial'}
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`sidebar-item w-full ${activeSection === item.id ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="sidebar-item w-full text-red-600 hover:bg-red-50 hover:text-red-700"
          title={collapsed ? 'Déconnexion' : ''}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}