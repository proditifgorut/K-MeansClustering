import React from 'react';
import { GraduationCap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold">K-Means Clustering</h1>
              <p className="text-sm md:text-base text-blue-100">Optimasi Konsentrasi Mahasiswa</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Analisis Data</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
