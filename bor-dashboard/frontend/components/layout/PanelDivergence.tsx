import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardData } from '../../types';

const PanelDivergence: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <ChartContainer title="Average Panel Divergence by Programme">
        <BarChart data={data.programme_stats}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="programme" fontSize={10} />
          <YAxis fontSize={10} domain={[0, 1]} />
          <Tooltip contentStyle={{ fontSize: '10px' }} />
          <Bar dataKey="avg_divergence" fill="#f59e0b" name="Avg Score Diff" />
        </BarChart>
      </ChartContainer>

      <div className="grid md:grid-cols-3 gap-4">
         <div className="p-4 bg-orange-50 border border-orange-100 rounded-sm">
            <h4 className="text-[10px] font-bold text-orange-700 uppercase">Total Divergence Cases</h4>
            <p className="text-2xl font-bold">{data.high_divergence.length}</p>
         </div>
         <div className="p-4 bg-red-50 border border-red-100 rounded-sm">
            <h4 className="text-[10px] font-bold text-red-700 uppercase">Max Observed Diff</h4>
            <p className="text-2xl font-bold">
              {(data.divergence.length > 0 ? Math.max(...data.divergence.map(d => d.divergence || 0)) : 0).toFixed(2)}
            </p>
         </div>
         <div className="p-4 bg-blue-50 border border-blue-100 rounded-sm">
            <h4 className="text-[10px] font-bold text-blue-700 uppercase">Consensus Rate</h4>
            <p className="text-2xl font-bold">
              {data.divergence.length > 0
                ? ((1 - data.high_divergence.length / data.divergence.length) * 100).toFixed(1)
                : '100'}%
            </p>
         </div>
      </div>
    </div>
  );
};

export default PanelDivergence;
