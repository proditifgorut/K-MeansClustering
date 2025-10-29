import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

interface ElbowChartProps {
  data: { k: number; inertia: number }[];
  optimalK: number;
}

const ElbowChart: React.FC<ElbowChartProps> = ({ data, optimalK }) => {
  const option = {
    title: {
      text: 'Elbow Method - Optimasi Jumlah Kluster',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const point = params[0];
        return `K = ${point.data[0]}<br/>Inertia: ${point.data[1].toFixed(2)}`;
      }
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
      name: 'Jumlah Kluster (K)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 500
      },
      minInterval: 1,
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Inertia',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 500
      },
      axisLabel: {
        formatter: (value: number) => value.toFixed(0)
      }
    },
    series: [
      {
        name: 'Inertia',
        type: 'line',
        data: data.map(d => [d.k, d.inertia]),
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        itemStyle: {
          color: '#3b82f6',
          borderWidth: 2,
          borderColor: '#fff'
        },
        symbolSize: 8,
        markPoint: {
          data: [
            {
              coord: [optimalK, data.find(d => d.k === optimalK)?.inertia || 0],
              symbol: 'pin',
              symbolSize: 50,
              itemStyle: {
                color: '#10b981'
              },
              label: {
                formatter: 'Optimal K',
                fontSize: 12,
                fontWeight: 600,
                color: '#fff'
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <ReactECharts option={option} style={{ height: '400px' }} />
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <span className="font-semibold">Jumlah Kluster Optimal:</span> K = {optimalK}
        </p>
        <p className="text-xs text-green-700 mt-1">
          Ditentukan menggunakan metode Elbow untuk meminimalkan inertia
        </p>
      </div>
    </motion.div>
  );
};

export default ElbowChart;
