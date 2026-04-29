import React from 'react';
import Card from '../cards/Card';
import { DashboardData } from '../../types';

const PanelBehaviour: React.FC<{ data: DashboardData }> = ({ data }) => {
  const { agreement, bias } = data.panel_behaviour;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Inter-Panel Agreement">
        <div className="h-64 flex items-center justify-center">
          {agreement && agreement.length > 0 ? (
            <div className="w-full h-full">
              {/* Actual charting logic is handled in the Rendered tab,
                  but we'll keep the list view for robustness */}
              <ul className="space-y-2">
                {agreement.map(a => (
                  <li key={a.name} className="flex justify-between items-center text-xs">
                    <span>{a.name}</span>
                    <span className="font-bold">{a.value.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="text-gray-400 text-xs italic">Insufficient panel data</span>
          )}
        </div>
      </Card>

      <Card title="Panel Scoring Tendencies">
         <p className="text-xs text-gray-600 mb-4">Comparison of mean scores across panels to identify systemic bias.</p>
         <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-xs font-semibold">Panel 1 Average</span>
               <span className="text-sm font-bold text-blue-600">{bias.p1_avg.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-xs font-semibold">Panel 2 Average</span>
               <span className="text-sm font-bold text-green-600">{bias.p2_avg.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-xs font-semibold">Net Bias</span>
               <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
                 {bias.net_bias.toFixed(2)} ({bias.net_bias > 0 ? 'P1+' : bias.net_bias < 0 ? 'P2+' : 'Neutral'})
               </span>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default PanelBehaviour;
