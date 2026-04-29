import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, Cell, PieChart, Pie
} from 'recharts';

interface ChartContainerProps {
  title: string;
  height?: number;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, height = 300, children }) => (
  <div className="bg-white border border-gray-200 p-4 shadow-sm rounded-sm">
    <h3 className="text-xs font-semibold text-gray-700 mb-4 uppercase tracking-tight">{title}</h3>
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  </div>
);

export const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];
