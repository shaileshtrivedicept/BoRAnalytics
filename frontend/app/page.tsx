"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Tabs from '../components/layout/Tabs';
import { SimpleBarChart, TrendLineChart } from '../components/charts/DashboardCharts';
import { CriteriaRadarChart, ScoreScatterChart } from '../components/charts/SpecializedCharts';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TABS = [
  { id: 'overview', label: 'Semester Overview' },
  { id: 'barchart', label: 'Studio Bar Chart' },
  { id: 'scorechart', label: 'Studio Score Chart' },
  { id: 'progcomp', label: 'Programme Comparison' },
  { id: 'criteria', label: 'Criteria Overview' },
  { id: 'studcrit', label: 'Studio Criteria' },
  { id: 'insights', label: 'Key Insights' },
  { id: 'tophigh', label: 'Highlights — Top' },
  { id: 'watchlist', label: 'Highlights — Watch' },
  { id: 'divoverview', label: 'Panel Divergence' },
  { id: 'divdetail', label: 'Divergence Cases' },
  { id: 'panelscatter', label: 'Panel Score Scatter' },
  { id: 'tutorchart', label: 'Tutor Score Chart' },
  { id: 'panelbehaviour', label: 'Panel Behaviour' },
  { id: 'sentoverview', label: 'Sentiment Overview' },
  { id: 'sentdetail', label: 'Sentiment Details' },
];

const BOR_COLORS = ["#3A6DB5", "#C25B3F", "#2E7D52", "#A07820", "#6B4C9A", "#8F9BB8"];

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ semester: '', program: '' });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/upload`, formData);
      setDatasetId(res.data.dataset_id);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (datasetId) {
      fetchData();
    }
  }, [datasetId, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.semester) params.append('semester', filters.semester);
      if (filters.program) params.append('program', filters.program);

      const [resData, resSent, resInsights] = await Promise.all([
        axios.get(`${API_BASE}/analytics/${datasetId}?${params.toString()}`),
        axios.get(`${API_BASE}/sentiment/${datasetId}?${params.toString()}`),
        axios.get(`${API_BASE}/insights/${datasetId}?${params.toString()}`)
      ]);

      setData(resData.data);
      setSentiment(resSent.data.sentiment);
      setInsights(resInsights.data.insights);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!datasetId) {
    return (
      <div className="min-h-screen bg-bor-bg flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-bor-bd text-center max-w-md">
          <h2 className="text-xl font-bold text-bor-tx mb-4">BOR Analytics Engine</h2>
          <p className="text-bor-tx2 mb-6">Please upload the BOR Excel data file to generate the dashboard.</p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bor-p1c file:text-white hover:file:bg-bor-p1c/90 cursor-pointer"
          />
          {loading && <p className="mt-4 text-bor-p1c animate-pulse">Processing dataset...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bor-bg text-bor-tx flex flex-col">
      <Header stats={data ? `${data.kpis.total_reviews} panel reviews` : undefined} />
      <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6 flex-1">
        {/* Filter Bar */}
        <div className="bg-white p-4 mb-6 rounded border border-bor-bd flex gap-4 items-center filter-bar">
           <div>
             <label className="block text-[10px] uppercase font-bold text-bor-tx3 mb-1">Semester</label>
             <select
               value={filters.semester}
               onChange={(e) => setFilters({...filters, semester: e.target.value})}
               className="bg-bor-bg p-1 px-2 text-xs rounded border border-bor-bd"
             >
               <option value="">All Semesters</option>
               {data?.filters.semesters.map((s: string) => <option key={s} value={s}>{s}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-[10px] uppercase font-bold text-bor-tx3 mb-1">Programme</label>
             <select
                value={filters.program}
                onChange={(e) => setFilters({...filters, program: e.target.value})}
                className="bg-bor-bg p-1 px-2 text-xs rounded border border-bor-bd"
             >
               <option value="">All Programmes</option>
               {data?.filters.programs.map((p: string) => <option key={p} value={p}>{p}</option>)}
             </select>
           </div>
           <div className="ml-auto flex gap-2">
              <button onClick={() => window.print()} className="bg-bor-tx text-white px-3 py-1 text-xs rounded hover:bg-bor-tx/90">Print Tab</button>
           </div>
        </div>

        {/* Dynamic Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64 text-bor-p1c animate-pulse">Loading analytics...</div>
        ) : (
          <div className="grid gap-6">
             {activeTab === 'overview' && (
               <>
                 <div className="grid grid-cols-4 gap-4">
                    <KPICard title="Average Score" value={data?.kpis.avg_score} sub="out of -11 to +11" />
                    <KPICard title="Total Studios" value={data?.kpis.total_studios} sub="Unique codes" />
                    <KPICard title="Total Reviews" value={data?.kpis.total_reviews} sub="Panel submissions" />
                    <KPICard title="Programmes" value={data?.kpis.total_programmes} sub="Active departments" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <ChartCard title="Performance Trend (Avg Score)">
                       <TrendLineChart data={data?.trends} xKey="Semester" yKey="avg_score" />
                    </ChartCard>
                    <ChartCard title="Review Volume Trend">
                       <SimpleBarChart data={data?.trends} xKey="Semester" yKey="review_count" />
                    </ChartCard>
                 </div>
               </>
             )}

             {activeTab === 'barchart' && (
               <ChartCard title="Studio Performance Comparison (Avg Normalized Score)">
                 <SimpleBarChart data={data?.studio_performance} xKey="Studio_Code" yKey="Avg_Normalized_Score" colors={[BOR_COLORS[0]]} />
               </ChartCard>
             )}

             {activeTab === 'scorechart' && (
               <ChartCard title="Studio Panel Scores">
                 <SimpleBarChart data={data?.studio_performance} xKey="Studio_Code" yKey="Avg_Panel_Score" colors={[BOR_COLORS[2]]} />
               </ChartCard>
             )}

             {activeTab === 'progcomp' && (
                <div className="grid grid-cols-2 gap-6">
                  <ChartCard title="Average Score by Programme">
                    <SimpleBarChart data={data?.programme_performance} xKey="Programme" yKey="Avg_Score" colors={BOR_COLORS} />
                  </ChartCard>
                  <div className="bg-white p-4 rounded border border-bor-bd">
                    <h3 className="text-xs font-bold mb-4 uppercase text-bor-tx3">Programme Summary</h3>
                    <table className="w-full text-left text-xs">
                       <thead className="bg-bor-bg">
                         <tr>
                           <th className="p-2">Programme</th>
                           <th className="p-2">Avg Score</th>
                           <th className="p-2">Reviews</th>
                         </tr>
                       </thead>
                       <tbody>
                         {data?.programme_performance.map((p: any) => (
                           <tr key={p.Programme} className="border-b border-bor-bd">
                             <td className="p-2 font-medium">{p.Programme}</td>
                             <td className="p-2">{p.Avg_Score.toFixed(2)}</td>
                             <td className="p-2">{p.Review_Count}</td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                </div>
             )}

             {activeTab === 'criteria' && (
               <div className="grid grid-cols-2 gap-6">
                 <ChartCard title="Criteria Performance Radar">
                    <CriteriaRadarChart data={data?.criteria_performance} />
                 </ChartCard>
                 <ChartCard title="Criteria Average Scores">
                    <SimpleBarChart data={data?.criteria_performance} xKey="Criteria" yKey="Avg_Score" colors={[BOR_COLORS[4]]} />
                 </ChartCard>
               </div>
             )}

             {activeTab === 'studcrit' && (
               <ChartCard title="Studio Criteria Drill-down">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px]">
                       <thead className="bg-bor-bg sticky top-0">
                          <tr>
                             <th className="p-2">Studio</th>
                             {data?.criteria_performance.map((c: any) => (
                               <th key={c.Criteria} className="p-2 whitespace-nowrap">{c.Criteria}</th>
                             ))}
                          </tr>
                       </thead>
                       <tbody>
                          {data?.studio_performance.map((s: any) => (
                            <tr key={s.Studio_Code} className="border-b border-bor-bd hover:bg-bor-bg3">
                               <td className="p-2 font-bold whitespace-nowrap">{s.Studio_Code}</td>
                               {data?.criteria_performance.map((c: any) => {
                                 const val = data?.studio_criteria.find((sc: any) => sc.Studio_Code === s.Studio_Code && sc.Criteria === c.Criteria)?.Normalized_Score;
                                 return (
                                   <td key={c.Criteria} className={cn("p-2 text-center", val >= 5 ? "text-bor-pos" : val <= -5 ? "text-bor-neg" : "")}>
                                      {val !== undefined ? val.toFixed(1) : '-'}
                                   </td>
                                 );
                               })}
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               </ChartCard>
             )}

             {activeTab === 'insights' && (
                <div className="grid gap-4">
                  {insights?.map((insight: string, idx: number) => (
                    <div key={idx} className="bg-white p-4 border-l-4 border-bor-p1c rounded shadow-sm">
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
             )}

             {activeTab === 'tophigh' && (
               <div className="grid grid-cols-2 gap-6">
                  <ChartCard title="Top Performing Studios">
                    <SimpleBarChart data={data?.studio_performance.slice(0, 10)} xKey="Studio_Code" yKey="Avg_Normalized_Score" colors={["#2E7D52"]} />
                  </ChartCard>
                  <div className="bg-white p-4 rounded border border-bor-bd">
                    <h3 className="text-xs font-bold mb-4 uppercase text-bor-tx3">Top Studios List</h3>
                    <div className="space-y-2">
                       {data?.studio_performance.slice(0, 10).map((s: any, idx: number) => (
                         <div key={s.Studio_Code} className="flex justify-between items-center p-2 bg-bor-bg3 rounded">
                            <span className="text-xs font-medium">{idx+1}. {s.Studio_Title}</span>
                            <span className="text-xs font-bold text-bor-pos">+{s.Avg_Normalized_Score.toFixed(2)}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
             )}

             {activeTab === 'watchlist' && (
               <div className="grid grid-cols-2 gap-6">
                  <ChartCard title="Watch List Studios (Lowest Scores)">
                    <SimpleBarChart data={[...data?.studio_performance].sort((a,b) => a.Avg_Normalized_Score - b.Avg_Normalized_Score).slice(0, 10)} xKey="Studio_Code" yKey="Avg_Normalized_Score" colors={["#B03A2E"]} />
                  </ChartCard>
                  <div className="bg-white p-4 rounded border border-bor-bd">
                    <h3 className="text-xs font-bold mb-4 uppercase text-bor-tx3">Watch List</h3>
                    <div className="space-y-2">
                       {[...data?.studio_performance].sort((a,b) => a.Avg_Normalized_Score - b.Avg_Normalized_Score).slice(0, 10).map((s: any, idx: number) => (
                         <div key={s.Studio_Code} className="flex justify-between items-center p-2 bg-bor-bg3 rounded">
                            <span className="text-xs font-medium">{idx+1}. {s.Studio_Title}</span>
                            <span className="text-xs font-bold text-bor-neg">{s.Avg_Normalized_Score.toFixed(2)}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
             )}

             {activeTab === 'tutorchart' && (
               <ChartCard title="Tutor Performance Rankings">
                 <SimpleBarChart data={data?.tutor_performance.slice(0, 20)} xKey="Tutor_Name" yKey="Avg_Score" colors={[BOR_COLORS[5]]} />
               </ChartCard>
             )}

             {activeTab === 'divoverview' && (
                <ChartCard title="Highest Panel Divergence by Studio">
                  <SimpleBarChart data={data?.divergence.slice(0, 15)} xKey="Studio_Code" yKey="Max_Diff" colors={["#A07820"]} />
                </ChartCard>
             )}

             {activeTab === 'divdetail' && (
               <div className="bg-white rounded border border-bor-bd overflow-hidden">
                 <table className="w-full text-left text-xs">
                    <thead className="bg-bor-bg">
                       <tr>
                          <th className="p-3">Semester</th>
                          <th className="p-3">Studio</th>
                          <th className="p-3">Panelists</th>
                          <th className="p-3">Scores</th>
                          <th className="p-3">Max Diff</th>
                       </tr>
                    </thead>
                    <tbody>
                       {data?.divergence.map((d: any, idx: number) => (
                         <tr key={idx} className="border-b border-bor-bd hover:bg-bor-bg3">
                            <td className="p-3">{d.Semester}</td>
                            <td className="p-3 font-medium">{d.Studio_Title}</td>
                            <td className="p-3">{d.Panelists.join(' vs ')}</td>
                            <td className="p-3">{d.Scores.join(' / ')}</td>
                            <td className="p-3 font-bold text-bor-neu">{d.Max_Diff}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
             )}

             {activeTab === 'panelscatter' && (
               <ChartCard title="Panel Score Distribution">
                 <ScoreScatterChart data={data?.scatter_data} />
               </ChartCard>
             )}

             {activeTab === 'sentoverview' && (
                <div className="grid grid-cols-3 gap-6">
                  <KPICard title="Sentiment Score" value={sentiment?.score} sub={sentiment?.overall_sentiment} />
                  <ChartCard title="Top Keywords">
                    <div className="flex flex-wrap gap-2">
                       {sentiment?.keywords.map((k: any) => (
                         <span key={k.text} className="px-2 py-1 bg-bor-p1c/10 text-bor-p1c rounded text-xs" style={{ fontSize: `${Math.min(24, 10 + k.value/50)}px` }}>
                            {k.text}
                         </span>
                       ))}
                    </div>
                  </ChartCard>
                  <ChartCard title="Theme Distribution (Placeholder)">
                     <div className="text-xs text-bor-tx3 text-center py-12">Clustering data...</div>
                  </ChartCard>
                </div>
             )}

             {activeTab === 'sentdetail' && (
                <div className="grid gap-4">
                  <h3 className="text-xs font-bold uppercase text-bor-tx3">Representative Quotes from Remarks</h3>
                  {sentiment?.quotes.length > 0 ? (
                    sentiment.quotes.map((q: string, idx: number) => (
                      <div key={idx} className="bg-white p-4 italic text-sm border-l-4 border-bor-pos rounded shadow-sm">
                        "{q}"
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-12 text-center text-bor-tx3 border border-dashed border-bor-bd rounded">
                       No remarks available for the current selection.
                    </div>
                  )}
                </div>
             )}

             {activeTab === 'panelbehaviour' && (
                <div className="bg-white rounded border border-bor-bd overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-bor-bg">
                       <tr>
                          <th className="p-3">Panelist Name</th>
                          <th className="p-3 text-center">Reviews</th>
                          <th className="p-3 text-center">Avg Score</th>
                          <th className="p-3 text-center">Std Dev</th>
                       </tr>
                    </thead>
                    <tbody>
                       {data?.panelist_behaviour.map((p: any, idx: number) => (
                         <tr key={idx} className="border-b border-bor-bd hover:bg-bor-bg3">
                            <td className="p-3 font-medium">{p.Panelist_Name}</td>
                            <td className="p-3 text-center">{p.Review_Count}</td>
                            <td className={cn("p-3 text-center font-bold", p.Avg_Score >= 5 ? "text-bor-pos" : p.Avg_Score <= -5 ? "text-bor-neg" : "text-bor-neu")}>
                               {p.Avg_Score.toFixed(2)}
                            </td>
                            <td className="p-3 text-center text-bor-tx2">{p.Std_Dev ? p.Std_Dev.toFixed(2) : '0.00'}</td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
             )}
          </div>
        )}
      </main>
    </div>
  );
}

function KPICard({ title, value, sub }: any) {
  return (
    <div className="bg-white p-4 rounded border border-bor-bd shadow-sm">
      <h3 className="text-[10px] uppercase font-bold text-bor-tx3 mb-1 tracking-wider">{title}</h3>
      <div className="text-2xl font-bold text-bor-tx">{value}</div>
      <p className="text-[11px] text-bor-tx2 mt-1">{sub}</p>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white p-5 rounded border border-bor-bd shadow-sm">
      <h3 className="text-xs font-bold text-bor-tx mb-6 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}
