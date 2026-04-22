import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
export const CriteriaRadarChart = ({ data }: any) => (!data ? null : (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E4E7EE" /><PolarAngleAxis dataKey="Criteria" tick={{ fontSize: 10, fill: '#536080' }} />
          <PolarRadiusAxis angle={30} domain={[-11, 11]} tick={{ fontSize: 8 }} />
          <Radar name="Score" dataKey="Avg_Score" stroke="#3A6DB5" fill="#3A6DB5" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
));
export const ScoreScatterChart = ({ data }: any) => (!data ? null : (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" /><XAxis type="category" dataKey="Semester" name="Semester" tick={{ fontSize: 10 }} />
          <YAxis type="number" dataKey="Score" name="Score" domain={[-11, 11]} tick={{ fontSize: 10 }} /><Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Scores" data={data} fill="#3A6DB5">{data.map((entry: any, index: number) => (<Cell key={`cell-${index}`} fill={entry.Score >= 5 ? '#2E7D52' : entry.Score <= -5 ? '#B03A2E' : '#A07820'} />))}</Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
));
