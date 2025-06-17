'use client';

import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  userRole: string;
}

export default function Charts({ userRole }: ChartsProps) {
  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Prospects Convertis',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Nouveaux Prospects',
        data: [45, 52, 48, 61, 58, 67],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Activités Réalisées',
        data: [12, 15, 18, 14, 20, 8, 5],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Nouveau', 'Contacté', 'Intéressé', 'Négocié', 'Gagné', 'Perdu'],
    datasets: [
      {
        data: [25, 20, 15, 12, 18, 10],
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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {/* Évolution des Prospects */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Évolution des Prospects
        </h3>
        <div className="chart-container">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      {/* Répartition par Statut */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Répartition par Statut
        </h3>
        <div className="chart-container">
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </div>

      {/* Activités Hebdomadaires */}
      <div className="lg:col-span-2 xl:col-span-1 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activités Hebdomadaires
        </h3>
        <div className="chart-container">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Performance Commerciaux (Admin/Gestionnaire) */}
      {(userRole === 'admin' || userRole === 'gestionnaire') && (
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance des Commerciaux
          </h3>
          <div className="space-y-4">
            {[
              { nom: 'Jean Dupont', objectif: 50000, realise: 42000, taux: 84 },
              { nom: 'Marie Martin', objectif: 45000, realise: 38500, taux: 86 },
              { nom: 'Pierre Durand', objectif: 40000, realise: 35200, taux: 88 },
              { nom: 'Sophie Leroy', objectif: 48000, realise: 36000, taux: 75 },
            ].map((commercial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{commercial.nom}</p>
                  <p className="text-sm text-gray-600">
                    {commercial.realise.toLocaleString()}€ / {commercial.objectif.toLocaleString()}€
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${commercial.taux}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12">
                    {commercial.taux}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}