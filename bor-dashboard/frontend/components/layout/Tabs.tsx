import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-[#1a1a1a] border-t border-[#333] sticky top-[60px] z-40 no-print overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "px-4 py-3 text-xs font-medium transition-colors border-b-2",
              activeTab === tab
                ? "text-white border-white"
                : "text-gray-400 border-transparent hover:text-gray-200"
            )}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
