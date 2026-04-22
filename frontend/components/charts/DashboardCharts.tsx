import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
export const SimpleBarChart = ({ data, xKey, yKey, colors }: any) => (!data ? null : (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EE" />
          <XAxis dataKey={xKey} angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#536080' }} stroke="#C4CBDA" />
          <YAxis tick={{ fontSize: 10, fill: '#536080' }} stroke="#C4CBDA" />
          <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '4px', border: '1px solid #E4E7EE' }} />
          <Bar dataKey={yKey}>{data.map((entry: any, index: number) => (<Cell key={`cell-${index}`} fill={colors ? colors[index % colors.length] : "#3A6DB5"} />))}</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
));
export const TrendLineChart = ({ data, xKey, yKey }: any) => (!data ? null : (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EE" />
          <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: '#536080' }} stroke="#C4CBDA" />
          <YAxis tick={{ fontSize: 10, fill: '#536080' }} stroke="#C4CBDA" />
          <Tooltip /><Line type="monotone" dataKey={yKey} stroke="#3A6DB5" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
));
