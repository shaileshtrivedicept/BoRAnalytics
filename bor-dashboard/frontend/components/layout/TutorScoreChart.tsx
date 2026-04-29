import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ErrorBar } from 'recharts';
import { DashboardData } from '../../types';

const TutorScoreChart: React.FC<{ data: DashboardData }> = ({ data }) => {
  const tutorData = [...data.tutor_performance].sort((a, b) => b.avg_score - a.avg_score);

  return (
    <ChartContainer title="Tutor Performance Distribution" height={500}>
      <BarChart data={tutorData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" fontSize={10} domain={[0, 10]} />
        <YAxis dataKey="tutor" type="category" fontSize={9} width={150} />
        <Tooltip contentStyle={{ fontSize: '10px' }} />
        <Bar dataKey="avg_score" fill="#2563eb">
          {tutorData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default TutorScoreChart;
