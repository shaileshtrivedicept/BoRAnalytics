import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const StudioCriteria: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm no-print">
         <span className="text-xs font-semibold px-2">Drill-down: Select Studio</span>
         <select className="text-xs border border-gray-300 rounded p-1">
            {data.studio_stats.slice(0, 10).map(s => <option key={s.studio_id}>{s.studio_title}</option>)}
         </select>
      </div>
      <Card title="Studio Criterion Breakdown">
        <p className="text-xs text-gray-500 italic">Showing criteria performance for the selected studio.</p>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 mt-4">
           <span className="text-gray-400 text-xs">Criterion Radar Chart Placeholder</span>
        </div>
      </Card>
    </div>
  );
};

export default StudioCriteria;
