import React from 'react';
import Card from '../cards/Card';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardData } from '../../types';

const PanelBehaviour: React.FC<{ data: DashboardData }> = ({ data }) => {
  // Mocking panel bias data for visualization
  const biasData = [
    { name: 'Consistent', value: 65 },
    { name: 'P1 Higher', value: 20 },
    { name: 'P2 Higher', value: 15 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Inter-Panel Agreement">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={biasData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {biasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Panel Scoring Tendencies">
         <p className="text-xs text-gray-600 mb-4">Comparison of mean scores across panels to identify systemic bias.</p>
         <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-xs font-semibold">Panel 1 Average</span>
               <span className="text-sm font-bold text-blue-600">{(Math.random() * 1 + 6.5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-xs font-semibold">Panel 2 Average</span>
               <span className="text-sm font-bold text-green-600">{(Math.random() * 1 + 6.5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-xs font-semibold">Net Bias</span>
               <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">0.12 (P1+)</span>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default PanelBehaviour;
