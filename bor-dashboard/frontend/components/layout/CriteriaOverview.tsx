import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const CriteriaOverview: React.FC<{ data: DashboardData }> = ({ data }) => {
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
             {data.criteria_stats.map(c => (
               <tr key={c.criterion}>
                 <td className="px-4 py-2 text-xs text-gray-700 font-bold">{c.criterion}</td>
                 <td className="px-4 py-2 text-xs text-gray-700 font-mono">{c.score.toFixed(2)}</td>
                 <td className="px-4 py-2">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${c.strength > 75 ? 'bg-green-500' : c.strength < 40 ? 'bg-red-500' : 'bg-blue-600'}`}
                        style={{ width: `${Math.min(100, c.strength)}%` }}
                      ></div>
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
