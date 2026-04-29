"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Tabs from '../components/layout/Tabs';
import { useDashboardData } from '../hooks/useDashboardData';
import SemesterOverview from '../components/layout/SemesterOverview';
import StudioBarChart from '../components/layout/StudioBarChart';
import StudioScoreChart from '../components/layout/StudioScoreChart';
import ProgrammeComparison from '../components/layout/ProgrammeComparison';
import CriteriaOverview from '../components/layout/CriteriaOverview';
import StudioCriteria from '../components/layout/StudioCriteria';
import KeyInsights from '../components/layout/KeyInsights';
import Highlights from '../components/layout/Highlights';
import PanelDivergence from '../components/layout/PanelDivergence';
import DivergenceCases from '../components/layout/DivergenceCases';
import PanelScoreScatter from '../components/layout/PanelScoreScatter';
import TutorScoreChart from '../components/layout/TutorScoreChart';
import PanelBehaviour from '../components/layout/PanelBehaviour';
import SentimentOverview from '../components/layout/SentimentOverview';
import SentimentDetails from '../components/layout/SentimentDetails';
import { dashboardService } from '../services/api';

const tabs = [
  "Semester Overview", "Studio Bar Chart", "Studio Score Chart", "Programme Comparison",
  "Criteria Overview", "Studio Criteria", "Key Insights", "Highlights - Top",
  "Highlights - Watch", "Panel Divergence", "Divergence Cases", "Panel Score Scatter",
  "Tutor Score Chart", "Panel Behaviour", "Sentiment Overview", "Sentiment Details"
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const { analytics, sentiment, insights, loading, error } = useDashboardData(datasetId);

  useEffect(() => {
    // Auto-load sample data for demo
    dashboardService.loadSample().then(data => setDatasetId(data.dataset_id));
  }, []);

  if (loading && !analytics) return <div className="flex h-screen items-center justify-center text-xs font-mono">LOADING DATA PIPELINE...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500 text-xs font-mono uppercase">Error: {error}</div>;
  if (!analytics || !sentiment || !insights) return <div className="flex h-screen items-center justify-center text-xs font-mono">INITIALIZING ENGINE...</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Semester Overview": return <SemesterOverview data={analytics} />;
      case "Studio Bar Chart": return <StudioBarChart data={analytics} />;
      case "Studio Score Chart": return <StudioScoreChart data={analytics} />;
      case "Programme Comparison": return <ProgrammeComparison data={analytics} />;
      case "Criteria Overview": return <CriteriaOverview data={analytics} />;
      case "Studio Criteria": return <StudioCriteria data={analytics} />;
      case "Key Insights": return <KeyInsights data={insights} />;
      case "Highlights - Top": return <Highlights data={analytics} type="top" />;
      case "Highlights - Watch": return <Highlights data={analytics} type="watch" />;
      case "Panel Divergence": return <PanelDivergence data={analytics} />;
      case "Divergence Cases": return <DivergenceCases data={analytics} />;
      case "Panel Score Scatter": return <PanelScoreScatter data={analytics} />;
      case "Tutor Score Chart": return <TutorScoreChart data={analytics} />;
      case "Panel Behaviour": return <PanelBehaviour data={analytics} />;
      case "Sentiment Overview": return <SentimentOverview data={sentiment} />;
      case "Sentiment Details": return <SentimentDetails data={sentiment} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header title="BOR ANALYTICS" subtitle="Academic Performance Dashboard" />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Active Tab Indicator (for print) */}
          <div className="hidden print:block mb-4 border-b-2 border-black pb-1">
             <h2 className="text-xl font-bold uppercase">{activeTab}</h2>
          </div>

          {renderTabContent()}
        </div>
      </main>

      <footer className="p-4 text-center border-t border-gray-200 no-print">
         <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            BOR Analytics Engine © 2026 • Data-Driven Academic Intelligence
         </p>
      </footer>
    </div>
  );
}
