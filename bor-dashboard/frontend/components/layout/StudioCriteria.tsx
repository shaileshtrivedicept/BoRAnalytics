import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const StudioCriteria: React.FC<{ data: DashboardData }> = ({ data }) => {
  const [selectedStudio, setSelectedStudio] = React.useState(data.studio_stats[0]?.studio_id || '');

  const studioData = data.studio_criteria.find(s => s.studio_id === selectedStudio);
  const studioInfo = data.studio_stats.find(s => s.studio_id === selectedStudio);

  const criteriaList = studioData ? Object.entries(studioData)
    .filter(([key]) => key !== 'studio_id')
    .map(([key, value]) => ({ criterion: key, score: value as number })) : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm no-print">
         <span className="text-xs font-semibold px-2">Drill-down: Select Studio</span>
         <select
            value={selectedStudio}
            onChange={(e) => setSelectedStudio(e.target.value)}
            className="text-xs border border-gray-300 rounded p-1"
          >
            {data.studio_stats.map(s => <option key={s.studio_id} value={s.studio_id}>{s.studio_title}</option>)}
         </select>
      </div>
      <Card title={`${studioInfo?.studio_title || 'Studio'} Performance Breakdown`}>
        <div className="space-y-4">
           {criteriaList.length > 0 ? (
             criteriaList.map(c => (
               <div key={c.criterion} className="flex justify-between items-center">
                 <div className="w-1/2">
                   <p className="text-[10px] font-bold text-gray-500 uppercase">{c.criterion}</p>
                 </div>
                 <div className="w-1/2 flex items-center gap-4">
                    <div className="flex-grow bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-blue-600 h-full" style={{ width: `${Math.min(100, c.score * 100)}%` }}></div>
                    </div>
                    <span className="text-xs font-mono font-bold w-8 text-right">{c.score.toFixed(2)}</span>
                 </div>
               </div>
             ))
           ) : (
             <div className="text-center py-8 text-gray-400 text-xs italic">No criteria data available for this studio.</div>
           )}
        </div>
      </Card>
    </div>
  );
};

export default StudioCriteria;
