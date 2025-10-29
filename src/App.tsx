import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DataTable from './components/DataTable';
import ElbowChart from './components/ElbowChart';
import ClusterVisualization from './components/ClusterVisualization';
import ClusterResults from './components/ClusterResults';
import LoadingSpinner from './components/LoadingSpinner';
import { sampleStudents } from './data/sampleData';
import { findOptimalK, performKMeans, determineOptimalK } from './utils/kmeans';
import { ClusterResult } from './types';
import { Play, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [elbowData, setElbowData] = useState<{ k: number; inertia: number }[]>([]);
  const [optimalK, setOptimalK] = useState<number>(0);
  const [clusterResult, setClusterResult] = useState<ClusterResult | null>(null);

  const runClustering = () => {
    setIsAnalyzing(true);
    setElbowData([]);
    setOptimalK(0);
    setClusterResult(null);

    setTimeout(() => {
      const elbowResults = findOptimalK(sampleStudents, 6);
      const optimal = determineOptimalK(elbowResults);
      const finalClusters = performKMeans(sampleStudents, optimal);

      setElbowData(elbowResults);
      setOptimalK(optimal);
      setClusterResult(finalClusters);
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    runClustering();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Analisis K-Means Clustering</h2>
              <p className="text-gray-600 mt-1">
                Sistem pengelompokan mahasiswa berdasarkan IPK, kehadiran, nilai proyek, dan nilai ujian
              </p>
            </div>
            <button
              onClick={runClustering}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Jalankan Analisis</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        <DataTable students={sampleStudents} />

        {isAnalyzing && <LoadingSpinner />}

        {!isAnalyzing && elbowData.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ElbowChart data={elbowData} optimalK={optimalK} />
              {clusterResult && <ClusterVisualization clusters={clusterResult.clusters} />}
            </div>

            {clusterResult && <ClusterResults clusters={clusterResult.clusters} />}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 K-Means Clustering Application - Sistem Informasi Akademik
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
