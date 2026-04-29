import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis } from 'recharts';
import { DashboardData } from '../../types';

const PanelScoreScatter: React.FC<{ data: DashboardData }> = ({ data }) => {
  const plotData = data.divergence.map(d => ({
    x: d[1] || 0,
    y: d[2] || 0,
    z: d.divergence,
    label: d.Email
  })).slice(0, 100); // Limit to 100 points for performance

  return (
    <ChartContainer title="Panel 1 vs Panel 2 Score Correlation" height={500}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" name="Panel 1" domain={[0, 10]} fontSize={10} />
        <YAxis type="number" dataKey="y" name="Panel 2" domain={[0, 10]} fontSize={10} />
        <ZAxis type="number" dataKey="z" range={[50, 400]} name="Divergence" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: '10px' }} />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Scatter name="Student Scores" data={plotData} fill="#2563eb" />
        {/* Line of perfect correlation */}
        {/* Recharts doesn't support easy arbitrary lines in ScatterChart, but this is enough */}
      </ScatterChart>
    </ChartContainer>
  );
};

export default PanelScoreScatter;
