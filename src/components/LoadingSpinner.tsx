import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">Memproses clustering data...</p>
      <p className="text-sm text-gray-500 mt-2">Mohon tunggu sebentar</p>
    </motion.div>
  );
};

export default LoadingSpinner;
