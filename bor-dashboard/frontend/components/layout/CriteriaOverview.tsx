import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const CriteriaOverview: React.FC<{ data: DashboardData }> = ({ data }) => {
  // In a real dataset, we'd group data by criterion.
  // For the sample, let's assume we have a way to get criteria stats.
  return (
    <Card title="Criteria Performance Matrix">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Criterion</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Avg Score</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Strength</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {/* Mocking for now based on typical criteria */}
             {["Design Concept", "Technical Resolution", "Presentation", "Contextual Analysis"].map(c => (
               <tr key={c}>
                 <td className="px-4 py-2 text-xs text-gray-700">{c}</td>
                 <td className="px-4 py-2 text-xs text-gray-700 font-mono">{(Math.random() * 3 + 6).toFixed(2)}</td>
                 <td className="px-4 py-2">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.random() * 30 + 60}%` }}></div>
                    </div>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CriteriaOverview;
