import React from 'react';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardData } from '../../types';

const ProgrammeComparison: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ChartContainer title="Average Score by Programme">
        <BarChart data={data.programme_stats}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="programme" fontSize={10} />
          <YAxis fontSize={10} domain={[0, 10]} />
          <Tooltip contentStyle={{ fontSize: '10px' }} />
          <Bar dataKey="avg_score" fill="#2563eb" />
        </BarChart>
      </ChartContainer>

      <ChartContainer title="Student Distribution by Programme">
        <BarChart data={data.programme_stats}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="programme" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip contentStyle={{ fontSize: '10px' }} />
          <Bar dataKey="student_count" fill="#10b981" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ProgrammeComparison;
