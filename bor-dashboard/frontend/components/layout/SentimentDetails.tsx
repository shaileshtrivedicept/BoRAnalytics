import React from 'react';
import Card from '../cards/Card';
import { SentimentData } from '../../types';

const SentimentDetails: React.FC<{ data: SentimentData }> = ({ data }) => {
  return (
    <Card title="Representative Quotes & Detailed Remarks">
      <div className="space-y-4">
        {data.remarks.slice(0, 20).map((remark, idx) => (
          <div key={idx} className="border-l-4 p-3 bg-gray-50 rounded-r-sm border-l-blue-500">
             <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{remark.studio_title}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  remark.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  remark.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {remark.sentiment}
                </span>
             </div>
             <p className="text-xs text-gray-700 leading-relaxed italic">"{remark.remarks}"</p>
             <p className="text-[9px] text-gray-400 mt-2">— {remark.criterion}</p>
          </div>
        ))}
        {data.remarks.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm italic">
            No remarks found in this dataset.
          </div>
        )}
      </div>
    </Card>
  );
};

export default SentimentDetails;
