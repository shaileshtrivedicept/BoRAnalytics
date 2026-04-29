import React from 'react';
import { KPICard } from '../cards/Card';
import { ChartContainer } from '../charts/BaseCharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardData } from '../../types';

const SemesterOverview: React.FC<{ data: DashboardData }> = ({ data }) => {
  const { kpis, trends } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Total Students" value={kpis.total_students} />
        <KPICard label="Total Studios" value={kpis.total_studios} />
        <KPICard label="Programmes" value={kpis.total_programmes} />
        <KPICard label="Avg Score" value={kpis.average_score.toFixed(2)} />
        <KPICard label="Median Score" value={kpis.median_score.toFixed(1)} />
        <KPICard label="Pass Rate" value={`${kpis.pass_rate.toFixed(1)}%`} />
      </div>

      <ChartContainer title="Score Trends Across Semesters">
        <LineChart data={trends}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="semester" fontSize={10} />
          <YAxis fontSize={10} domain={[0, 10]} />
          <Tooltip contentStyle={{ fontSize: '10px' }} />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default SemesterOverview;
