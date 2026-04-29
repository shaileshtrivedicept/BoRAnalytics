import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { DashboardData } from '../../types';

const StudioBarChart: React.FC<{ data: DashboardData }> = ({ data }) => {
  const stats = [...data.studio_stats].sort((a, b) => b.avg_score - a.avg_score).slice(0, 15);

  return (
    <ChartContainer title="Top 15 Studios by Average Score" height={500}>
      <BarChart data={stats} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" fontSize={10} domain={[0, 10]} />
        <YAxis dataKey="studio_title" type="category" fontSize={9} width={150} />
        <Tooltip contentStyle={{ fontSize: '10px' }} />
        <Bar dataKey="avg_score" fill="#2563eb">
          {stats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default StudioBarChart;
