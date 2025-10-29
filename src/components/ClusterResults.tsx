import React from 'react';
import { Student } from '../types';
import { concentrationNames } from '../data/sampleData';
import { Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClusterResultsProps {
  clusters: Student[][];
}

const ClusterResults: React.FC<ClusterResultsProps> = ({ clusters }) => {
  const getClusterStats = (cluster: Student[]) => {
    if (cluster.length === 0) return { avgIPK: 0, avgExam: 0, avgProject: 0 };
    
    const avgIPK = cluster.reduce((sum, s) => sum + s.ipk, 0) / cluster.length;
    const avgExam = cluster.reduce((sum, s) => sum + s.examScore, 0) / cluster.length;
    const avgProject = cluster.reduce((sum, s) => sum + s.projectScore, 0) / cluster.length;
    
    return { avgIPK, avgExam, avgProject };
  };

  const getConcentrationSuggestion = (stats: ReturnType<typeof getClusterStats>, index: number) => {
    return concentrationNames[index % concentrationNames.length];
  };

  const colors = ['blue', 'green', 'amber', 'red', 'purple', 'pink', 'teal', 'orange'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hasil Pengelompokan Kluster</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clusters.map((cluster, index) => {
            const stats = getClusterStats(cluster);
            const concentration = getConcentrationSuggestion(stats, index);
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`border-2 border-${color}-200 rounded-lg p-4 bg-${color}-50 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-lg font-bold text-${color}-700`}>Cluster {index + 1}</h4>
                  <div className={`flex items-center space-x-1 bg-${color}-100 px-2 py-1 rounded-full`}>
                    <Users className={`w-4 h-4 text-${color}-600`} />
                    <span className={`text-sm font-semibold text-${color}-700`}>{cluster.length}</span>
                  </div>
                </div>
                
                <div className={`bg-white rounded-lg p-3 mb-3 border border-${color}-200`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className={`w-4 h-4 text-${color}-600`} />
                    <span className="text-sm font-semibold text-gray-700">Konsentrasi Disarankan:</span>
                  </div>
                  <p className={`text-sm font-bold text-${color}-700`}>{concentration}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Rata-rata IPK:</span>
                    <span className="text-sm font-semibold text-gray-800">{stats.avgIPK.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Rata-rata Ujian:</span>
                    <span className="text-sm font-semibold text-gray-800">{stats.avgExam.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Rata-rata Proyek:</span>
                    <span className="text-sm font-semibold text-gray-800">{stats.avgProject.toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-800">Detail Anggota Kluster</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {clusters.map((cluster, clusterIndex) => (
            <motion.div
              key={clusterIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + clusterIndex * 0.1 }}
              className="p-6"
            >
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <div className={`w-3 h-3 rounded-full bg-${colors[clusterIndex % colors.length]}-500 mr-2`}></div>
                Cluster {clusterIndex + 1} - {getConcentrationSuggestion(getClusterStats(cluster), clusterIndex)}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">NIM</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IPK</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kehadiran</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Proyek</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ujian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cluster.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900 font-medium">{student.id}</td>
                        <td className="px-4 py-2 text-gray-900">{student.name}</td>
                        <td className="px-4 py-2 text-gray-700">{student.ipk.toFixed(2)}</td>
                        <td className="px-4 py-2 text-gray-700">{student.attendanceRate}%</td>
                        <td className="px-4 py-2 text-gray-700">{student.projectScore}</td>
                        <td className="px-4 py-2 text-gray-700">{student.examScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ClusterResults;
