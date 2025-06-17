'use client';

import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardsProps {
  userRole: string;
}

export default function StatsCards({ userRole }: StatsCardsProps) {
  const getStats = () => {
    if (userRole === 'admin') {
      return [
        {
          title: 'Total Prospects',
          value: '1,247',
          change: '+12%',
          trend: 'up',
          icon: Users,
          gradient: 'gradient-primary',
        },
        {
          title: 'Taux de Conversion',
          value: '23.5%',
          change: '+5.2%',
          trend: 'up',
          icon: Target,
          gradient: 'gradient-success',
        },
        {
          title: 'CA Mensuel',
          value: '€127,450',
          change: '+18%',
          trend: 'up',
          icon: DollarSign,
          gradient: 'gradient-secondary',
        },
        {
          title: 'Croissance',
          value: '+24%',
          change: '+3.1%',
          trend: 'up',
          icon: TrendingUp,
          gradient: 'gradient-warning',
        },
      ];
    }

    if (userRole === 'gestionnaire') {
      return [
        {
          title: 'Équipe Active',
          value: '8',
          change: '+2',
          trend: 'up',
          icon: Users,
          gradient: 'gradient-primary',
        },
        {
          title: 'Objectif Équipe',
          value: '85%',
          change: '+12%',
          trend: 'up',
          icon: Target,
          gradient: 'gradient-success',
        },
        {
          title: 'CA Équipe',
          value: '€45,200',
          change: '+8%',
          trend: 'up',
          icon: DollarSign,
          gradient: 'gradient-secondary',
        },
        {
          title: 'Performance',
          value: '+15%',
          change: '+2.3%',
          trend: 'up',
          icon: TrendingUp,
          gradient: 'gradient-warning',
        },
      ];
    }

    // Commercial
    return [
      {
        title: 'Mes Prospects',
        value: '47',
        change: '+5',
        trend: 'up',
        icon: Users,
        gradient: 'gradient-primary',
      },
      {
        title: 'Objectif Mensuel',
        value: '78%',
        change: '+15%',
        trend: 'up',
        icon: Target,
        gradient: 'gradient-success',
      },
      {
        title: 'CA Personnel',
        value: '€12,450',
        change: '+22%',
        trend: 'up',
        icon: DollarSign,
        gradient: 'gradient-secondary',
      },
      {
        title: 'Taux Conversion',
        value: '28%',
        change: '+4%',
        trend: 'up',
        icon: TrendingUp,
        gradient: 'gradient-warning',
      },
    ];
  };

  const stats = getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.gradient} flex items-center justify-center`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}