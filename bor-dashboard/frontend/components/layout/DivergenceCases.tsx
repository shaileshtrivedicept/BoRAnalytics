import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const DivergenceCases: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <Card title="High Divergence Case Details">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Studio</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Criterion</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">P1 Score</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">P2 Score</th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Divergence</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {data.high_divergence.map((case_item, idx) => (
               <tr key={idx}>
                 <td className="px-4 py-2 text-xs text-gray-700 truncate max-w-[150px]">{case_item.Email}</td>
                 <td className="px-4 py-2 text-xs text-gray-700 truncate max-w-[150px]">{case_item.studio_title}</td>
                 <td className="px-4 py-2 text-xs text-gray-700">{case_item.criterion}</td>
                 <td className="px-4 py-2 text-xs text-gray-700 font-mono">{case_item[1]?.toFixed(1)}</td>
                 <td className="px-4 py-2 text-xs text-gray-700 font-mono">{case_item[2]?.toFixed(1)}</td>
                 <td className="px-4 py-2 text-xs font-bold text-red-600 font-mono">{case_item.divergence.toFixed(1)}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DivergenceCases;
