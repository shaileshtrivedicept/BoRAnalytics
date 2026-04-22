"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Tabs from '../components/layout/Tabs';
import { SimpleBarChart, TrendLineChart } from '../components/charts/DashboardCharts';
import { CriteriaRadarChart, ScoreScatterChart } from '../components/charts/SpecializedCharts';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TABS = [
  { id: 'overview', label: 'Semester Overview' }, { id: 'barchart', label: 'Studio Bar Chart' }, { id: 'scorechart', label: 'Studio Score Chart' }, { id: 'progcomp', label: 'Programme Comparison' }, { id: 'criteria', label: 'Criteria Overview' }, { id: 'studcrit', label: 'Studio Criteria' }, { id: 'insights', label: 'Key Insights' }, { id: 'tophigh', label: 'Highlights — Top' }, { id: 'watchlist', label: 'Highlights — Watch' }, { id: 'divoverview', label: 'Panel Divergence' }, { id: 'divdetail', label: 'Divergence Cases' }, { id: 'panelscatter', label: 'Panel Score Scatter' }, { id: 'tutorchart', label: 'Tutor Score Chart' }, { id: 'panelbehaviour', label: 'Panel Behaviour' }, { id: 'sentoverview', label: 'Sentiment Overview' }, { id: 'sentdetail', label: 'Sentiment Details' }
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
    const file = e.target.files?.[0]; if (!file) return;
    const formData = new FormData(); formData.append('file', file);
    setLoading(true);
    try { const res = await axios.post(`${API_BASE}/upload`, formData); setDatasetId(res.data.dataset_id); } catch (err) { console.error("Upload failed", err); } finally { setLoading(false); }
  };

  useEffect(() => { if (datasetId) fetchData(); }, [datasetId, filters]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(); if (filters.semester) params.append('semester', filters.semester); if (filters.program) params.append('program', filters.program);
      const [resData, resSent, resInsights] = await Promise.all([axios.get(`${API_BASE}/analytics/${datasetId}?${params.toString()}`), axios.get(`${API_BASE}/sentiment/${datasetId}?${params.toString()}`), axios.get(`${API_BASE}/insights/${datasetId}?${params.toString()}`)]);
      setData(resData.data); setSentiment(resSent.data.sentiment); setInsights(resInsights.data.insights);
    } catch (err) { console.error("Fetch failed", err); } finally { setLoading(false); }
  };

  if (!datasetId) return (
      <div className="min-h-screen bg-bor-bg flex items-center justify-center"><div className="bg-white p-8 rounded-lg shadow-sm border border-bor-bd text-center max-w-md"><h2 className="text-xl font-bold text-bor-tx mb-4">BOR Analytics Engine</h2><input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-bor-p1c file:text-white cursor-pointer" />{loading && <p className="mt-4 text-bor-p1c animate-pulse">Processing dataset...</p>}</div></div>
  );

  return (
    <div className="min-h-screen bg-bor-bg text-bor-tx flex flex-col">
      <Header stats={data ? `${data.kpis.total_reviews} panel reviews` : undefined} /><Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-6 flex-1">
        <div className="bg-white p-4 mb-6 rounded border border-bor-bd flex gap-4 items-center">
           <div><label className="block text-[10px] uppercase font-bold text-bor-tx3 mb-1">Semester</label><select value={filters.semester} onChange={(e) => setFilters({...filters, semester: e.target.value})} className="bg-bor-bg p-1 text-xs rounded border">{data?.filters.semesters.map((s: string) => <option key={s} value={s}>{s}</option>)}</select></div>
           <div className="ml-auto"><button onClick={() => window.print()} className="bg-bor-tx text-white px-3 py-1 text-xs rounded">Print Tab</button></div>
        </div>
        <div className="grid gap-6">
             {activeTab === 'overview' && (<div className="grid grid-cols-4 gap-4"><KPICard title="Average Score" value={data?.kpis.avg_score} /></div>)}
             {activeTab === 'barchart' && (<ChartCard title="Studio Comparison"><SimpleBarChart data={data?.studio_performance} xKey="Studio_Code" yKey="Avg_Normalized_Score" /></ChartCard>)}
        </div>
      </main>
    </div>
  );
}
function KPICard({ title, value }: any) { return (<div className="bg-white p-4 rounded border"><h3 className="text-[10px] uppercase font-bold text-bor-tx3">{title}</h3><div className="text-2xl font-bold text-bor-tx">{value}</div></div>); }
function ChartCard({ title, children }: any) { return (<div className="bg-white p-5 rounded border"><h3 className="text-xs font-bold text-bor-tx mb-6 uppercase">{title}</h3>{children}</div>); }
