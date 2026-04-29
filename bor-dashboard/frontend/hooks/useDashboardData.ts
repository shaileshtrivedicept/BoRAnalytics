import { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';
import { DashboardData, SentimentData, InsightsData } from '../types';

export const useDashboardData = (datasetId: string | null) => {
  const [analytics, setAnalytics] = useState<DashboardData | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!datasetId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [a, s, i] = await Promise.all([
          dashboardService.getAnalytics(datasetId),
          dashboardService.getSentiment(datasetId),
          dashboardService.getInsights(datasetId),
        ]);
        setAnalytics(a);
        setSentiment(s);
        setInsights(i);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [datasetId]);

  return { analytics, sentiment, insights, loading, error };
};
