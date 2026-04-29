import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, Cell } from 'recharts';
import { DashboardData } from '../../types';

const StudioScoreChart: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <ChartContainer title="Studio Student Count vs Average Score" height={400}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="student_count" name="Students" fontSize={10} />
        <YAxis type="number" dataKey="avg_score" name="Avg Score" fontSize={10} domain={[0, 10]} />
        <ZAxis range={[60, 400]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: '10px' }} />
        <Scatter name="Studios" data={data.studio_stats} fill="#2563eb">
          {data.studio_stats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ChartContainer>
  );
};

export default StudioScoreChart;
