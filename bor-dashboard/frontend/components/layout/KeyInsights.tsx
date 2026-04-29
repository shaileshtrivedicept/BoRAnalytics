import React from 'react';
import Card from '../cards/Card';
import { InsightsData } from '../../types';
import { AlertCircle, CheckCircle, Info, HelpCircle } from 'lucide-react';

const KeyInsights: React.FC<{ data: InsightsData }> = ({ data }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle className="text-green-500 w-5 h-5" />;
      case 'warning': return <AlertCircle className="text-red-500 w-5 h-5" />;
      case 'info': return <Info className="text-blue-500 w-5 h-5" />;
      default: return <HelpCircle className="text-gray-500 w-5 h-5" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-50 border-green-100';
      case 'warning': return 'bg-red-50 border-red-100';
      case 'info': return 'bg-blue-50 border-blue-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data.insights.map((insight, idx) => (
        <div key={idx} className={`p-4 rounded-sm border flex gap-3 items-start ${getBg(insight.type)}`}>
          <div className="mt-0.5">{getIcon(insight.type)}</div>
          <p className="text-sm text-gray-800">{insight.text}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyInsights;
