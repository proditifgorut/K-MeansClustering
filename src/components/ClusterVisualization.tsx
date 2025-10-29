import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Student } from '../types';
import { motion } from 'framer-motion';

interface ClusterVisualizationProps {
  clusters: Student[][];
}

const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({ clusters }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  
  const seriesData = clusters.map((cluster, index) => ({
    name: `Cluster ${index + 1}`,
    type: 'scatter',
    data: cluster.map(student => [student.ipk, student.examScore, student.name]),
    symbolSize: 12,
    itemStyle: {
      color: colors[index % colors.length]
    }
  }));

  const option = {
    title: {
      text: 'Visualisasi Clustering - IPK vs Nilai Ujian',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.data[2]}<br/>IPK: ${params.data[0].toFixed(2)}<br/>Nilai Ujian: ${params.data[1]}`;
      }
    },
    legend: {
      data: seriesData.map(s => s.name),
      bottom: 10,
      type: 'scroll'
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'IPK',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 500
      },
      min: 2.5,
      max: 4.0,
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Nilai Ujian',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 500
      },
      min: 60,
      max: 100,
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: seriesData
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <ReactECharts option={option} style={{ height: '500px' }} />
    </motion.div>
  );
};

export default ClusterVisualization;
