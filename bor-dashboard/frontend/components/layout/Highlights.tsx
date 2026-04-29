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
                <span className="text-2xl font-bold">{studio.avg_score.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500 uppercase">{studio.student_count} Students</span>
             </div>
          </div>
        ))}
      </div>

      <Card title={type === 'top' ? "Performance Success Factors" : "Critical Risk Indicators"}>
         <div className="grid md:grid-cols-2 gap-8">
            <div>
               <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Automated Insight</h4>
               <p className="text-xs text-gray-600 leading-relaxed">
                  {type === 'top'
                    ? `The top studios show high scoring consistency with an average of ${displayStudios[0]?.avg_score.toFixed(2)}. These studios typically exhibit strong alignment between panel members.`
                    : `Studios on the watch list require immediate pedagogical review. The lowest average score is ${displayStudios[displayStudios.length-1]?.avg_score.toFixed(2)}, indicating systemic gaps.`
                  }
               </p>
            </div>
            <div>
               <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Key Metrics</h4>
               <ul className="text-xs space-y-2 list-disc list-inside text-gray-600">
                  <li>Avg Consensus: {((1 - data.high_divergence.length / Math.max(1, data.divergence.length)) * 100).toFixed(1)}%</li>
                  <li>Target Score: {type === 'top' ? '> 8.0' : '< 5.0'}</li>
               </ul>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default Highlights;
