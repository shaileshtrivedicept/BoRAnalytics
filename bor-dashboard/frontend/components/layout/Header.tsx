import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-[#1a1a1a] text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400 uppercase tracking-widest">{subtitle}</p>}
      </div>
      <div className="flex gap-4 items-center">
        {/* Placeholder for Dataset name or Semester indicator */}
        <div className="bg-[#333] px-3 py-1 rounded text-xs font-mono">
          SAMPLE_DATA_V1
        </div>
        <button
          onClick={() => window.print()}
          className="bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-200 transition-colors no-print"
        >
          PRINT REPORT
        </button>
      </div>
    </header>
  );
};

export default Header;
