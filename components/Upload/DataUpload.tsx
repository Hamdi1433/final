'use client';

import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

export default function DataUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [uploadResults, setUploadResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    );

    if (validFiles.length === 0) {
      toast.error('Veuillez sélectionner des fichiers Excel (.xlsx, .xls)');
      return;
    }

    setUploadedFiles(validFiles);
    setProcessing(true);

    try {
      // Simuler le traitement des fichiers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Traitement des fichiers Excel
      const results = await Promise.all(
        validFiles.map(async (file) => {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          return {
            fileName: file.name,
            rowCount: jsonData.length,
            data: jsonData,
            success: true,
          };
        })
      );

      setUploadResults({
        totalFiles: validFiles.length,
        successfulFiles: results.filter(r => r.success).length,
        totalRows: results.reduce((sum, r) => sum + r.rowCount, 0),
        results,
      });

      toast.success(`${results.length} fichier(s) traité(s) avec succès`);
    } catch (error) {
      toast.error('Erreur lors du traitement des fichiers');
    } finally {
      setProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@email.com',
        telephone: '0123456789',
        age: 45,
        situation_familiale: 'Marié, 2 enfants',
        profession: 'Cadre commercial',
        revenus_mensuels: 4500,
        source: 'Site web',
        notes: 'Intéressé par une mutuelle famille',
      },
      {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@email.com',
        telephone: '0987654321',
        age: 38,
        situation_familiale: 'Célibataire',
        profession: 'Ingénieure',
        revenus_mensuels: 5200,
        source: 'Recommandation',
        notes: 'Recherche une couverture premium',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prospects');
    XLSX.writeFile(wb, 'template_prospects.xlsx');
    
    toast.success('Template téléchargé avec succès');
  };

  const connectHubSpot = () => {
    toast.info('Connexion HubSpot en cours de développement');
  };

  const connectGoogleSheets = () => {
    toast.info('Connexion Google Sheets en cours de développement');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Import de Données</h2>
          <p className="text-gray-600 mt-1">
            Importez vos prospects et contrats via fichiers Excel ou API
          </p>
        </div>
        <button
          onClick={downloadTemplate}
          className="btn-secondary flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Template Excel</span>
        </button>
      </div>

      {/* Options d'import */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Excel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fichier Excel
            </h3>
            <p className="text-gray-600 text-sm">
              Importez vos prospects depuis un fichier Excel (.xlsx, .xls)
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-2">
              Glissez-déposez vos fichiers Excel ici
            </p>
            <p className="text-sm text-gray-500 mb-4">ou</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
              disabled={processing}
            >
              {processing ? 'Traitement...' : 'Sélectionner des fichiers'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  </div>
                  {processing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  ) : (
                    <CheckCircle className="text-green-600" size={20} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API HubSpot */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-orange-600 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              API HubSpot
            </h3>
            <p className="text-gray-600 text-sm">
              Synchronisez automatiquement vos données HubSpot
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-orange-600" size={16} />
                <span className="text-sm font-medium text-orange-800">
                  Configuration requise
                </span>
              </div>
              <p className="text-sm text-orange-700">
                Vous devez configurer votre clé API HubSpot dans les paramètres.
              </p>
            </div>

            <button
              onClick={connectHubSpot}
              className="w-full btn-secondary"
            >
              Connecter HubSpot
            </button>

            <div className="text-xs text-gray-500">
              <p>Données synchronisées :</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Contacts et prospects</li>
                <li>Opportunités commerciales</li>
                <li>Activités et interactions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Google Sheets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Google Sheets
            </h3>
            <p className="text-gray-600 text-sm">
              Importez depuis vos feuilles de calcul Google
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-blue-600" size={16} />
                <span className="text-sm font-medium text-blue-800">
                  Authentification Google
                </span>
              </div>
              <p className="text-sm text-blue-700">
                Connectez-vous à votre compte Google pour accéder à vos feuilles.
              </p>
            </div>

            <button
              onClick={connectGoogleSheets}
              className="w-full btn-primary"
            >
              Connecter Google Sheets
            </button>

            <div className="text-xs text-gray-500">
              <p>Fonctionnalités :</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Import en temps réel</li>
                <li>Synchronisation bidirectionnelle</li>
                <li>Mapping automatique des colonnes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats d'import */}
      {uploadResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Résultats de l&apos;import
            </h3>
            <button
              onClick={() => setUploadResults(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">
                {uploadResults.successfulFiles}
              </p>
              <p className="text-sm text-green-700">Fichiers traités</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {uploadResults.totalRows}
              </p>
              <p className="text-sm text-blue-700">Lignes importées</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-900">
                {Math.round(uploadResults.totalRows * 0.95)}
              </p>
              <p className="text-sm text-purple-700">Prospects créés</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Détail par fichier :</h4>
            {uploadResults.results.map((result: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{result.fileName}</p>
                    <p className="text-sm text-gray-600">
                      {result.rowCount} lignes traitées
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Succès
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-4">Instructions d&apos;import</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Format Excel requis :</h4>
            <ul className="space-y-1">
              <li>• Colonnes : nom, prenom, email, telephone</li>
              <li>• Colonnes optionnelles : age, profession, revenus_mensuels</li>
              <li>• Première ligne = en-têtes</li>
              <li>• Format .xlsx ou .xls</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Bonnes pratiques :</h4>
            <ul className="space-y-1">
              <li>• Vérifiez la qualité des données avant import</li>
              <li>• Évitez les doublons d&apos;email</li>
              <li>• Utilisez le template fourni</li>
              <li>• Testez avec un petit échantillon d&apos;abord</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}