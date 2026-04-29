import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const Highlights: React.FC<{ data: DashboardData; type: 'top' | 'watch' }> = ({ data, type }) => {
  const sorted = [...data.studio_stats].sort((a, b) => b.avg_score - a.avg_score);
  const displayStudios = type === 'top' ? sorted.slice(0, 5) : sorted.slice(-5).reverse();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-bold ${type === 'top' ? 'text-green-700' : 'text-red-700'} uppercase tracking-tight`}>
        {type === 'top' ? '🌟 Top Performers' : '⚠️ Watch List'}
      </h3>
      <div className="grid md:grid-cols-5 gap-4">
        {displayStudios.map((studio) => (
          <div key={studio.studio_id} className="bg-white border p-4 shadow-sm rounded-sm border-t-4 border-t-gray-800">
             <p className="text-[10px] text-gray-400 font-bold uppercase">{studio.programme}</p>
             <h4 className="text-xs font-bold mt-1 h-8 line-clamp-2">{studio.studio_title}</h4>
             <div className="flex justify-between items-end mt-4">
                <span className="text-2xl font-bold">{studio.avg_score.toFixed(1)}</span>
                <span className="text-[10px] text-gray-500 uppercase">{studio.student_count} Students</span>
             </div>
          </div>
        ))}
      </div>

      <Card title={type === 'top' ? "Success Factors" : "Identified Risks"}>
         <ul className="text-xs space-y-2 list-disc list-inside text-gray-600">
            {type === 'top'
              ? ["High consistency across panels", "Strong conceptual clarity", "Excellent presentation standards"]
              : ["High divergence in scores", "Weak technical resolution in some cases", "Unbalanced workload indicators"]
            }
         </ul>
      </Card>
    </div>
  );
};

export default Highlights;
