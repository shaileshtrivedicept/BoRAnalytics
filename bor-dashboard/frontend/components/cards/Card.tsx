import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white border border-gray-200 shadow-sm rounded-sm p-4 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2 uppercase tracking-tight">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export const KPICard: React.FC<{ label: string; value: string | number; sublabel?: string }> = ({ label, value, sublabel }) => (
  <div className="bg-white border border-gray-200 p-4 shadow-sm rounded-sm">
    <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
    <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
    {sublabel && <p className="text-[10px] text-gray-400 mt-1">{sublabel}</p>}
  </div>
);

export default Card;
