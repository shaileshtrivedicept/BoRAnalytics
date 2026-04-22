import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
const Tabs = ({ tabs, activeTab, setActiveTab }: { tabs: { id: string, label: string }[], activeTab: string, setActiveTab: (id: string) => void }) => (
    <nav className="sticky top-0 z-50 bg-bor-bg3 border-b border-bor-bd px-6 flex items-center gap-1 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-4 py-3 text-[12px] font-medium transition-colors whitespace-nowrap border-b-2", activeTab === tab.id ? "border-bor-p1c text-bor-p1c bg-white" : "border-transparent text-bor-tx2 hover:bg-bor-bd/20")}>{tab.label}</button>
      ))}
    </nav>
);
export default Tabs;
