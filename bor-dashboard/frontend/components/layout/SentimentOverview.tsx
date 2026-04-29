import React from 'react';
import Card from '../cards/Card';
import { ChartContainer, COLORS } from '../charts/BaseCharts';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SentimentData } from '../../types';

const SentimentOverview: React.FC<{ data: SentimentData }> = ({ data }) => {
  const sentimentCounts = {
    positive: data.remarks.filter(r => r.sentiment === 'positive').length,
    neutral: data.remarks.filter(r => r.sentiment === 'neutral').length,
    negative: data.remarks.filter(r => r.sentiment === 'negative').length,
  };

  const pieData = [
    { name: 'Positive', value: sentimentCounts.positive, color: '#10b981' },
    { name: 'Neutral', value: sentimentCounts.neutral, color: '#6b7280' },
    { name: 'Negative', value: sentimentCounts.negative, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Sentiment Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Theme Performance">
          <ChartContainer title="Avg Score by Theme" height={200}>
            <BarChart data={data.themes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" fontSize={10} domain={[0, 10]} />
              <YAxis dataKey="theme" type="category" fontSize={9} width={100} />
              <Bar dataKey="avg_score" fill="#2563eb" />
            </BarChart>
          </ChartContainer>
        </Card>

        <Card title="Key Mentions">
           <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-sm text-[10px] font-mono border border-gray-200">
                  {kw.text.toUpperCase()} ({kw.value})
                </span>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

export default SentimentOverview;
