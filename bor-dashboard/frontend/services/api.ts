import axios from 'axios';
import { DashboardData, SentimentData, InsightsData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const dashboardService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData);
    return response.data;
  },

  loadSample: async () => {
    const response = await api.post('/sample');
    return response.data;
  },

  getAnalytics: async (datasetId: string): Promise<DashboardData> => {
    const response = await api.get(`/analytics/${datasetId}`);
    return response.data;
  },

  getSentiment: async (datasetId: string): Promise<SentimentData> => {
    const response = await api.get(`/sentiment/${datasetId}`);
    return response.data;
  },

  getInsights: async (datasetId: string): Promise<InsightsData> => {
    const response = await api.get(`/insights/${datasetId}`);
    return response.data;
  },
};
