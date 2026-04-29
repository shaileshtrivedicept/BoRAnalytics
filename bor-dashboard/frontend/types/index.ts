export interface KPI {
  total_students: number;
  total_studios: number;
  total_programmes: number;
  average_score: number;
  median_score: number;
  pass_rate: number;
}

export interface Trend {
  semester: string;
  score: number;
  [key: string]: string | number;
}

export interface ProgrammeStat {
  programme: string;
  avg_score: number;
  median_score: number;
  score_std: number;
  student_count: number;
  studio_count: number;
}

export interface StudioStat {
  studio_id: string;
  studio_title: string;
  programme: string;
  avg_score: number;
  median_score: number;
  student_count: number;
}

export interface DivergenceCase {
  Email: string;
  criterion: string;
  studio_title: string;
  divergence: number;
  [key: number]: number;
}

export interface TutorPerformance {
  tutor: string;
  avg_score: number;
  review_count: number;
  score_std: number;
  studios_count: number;
}

export interface Remark {
  Email: string;
  studio_title: string;
  criterion: string;
  remarks: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Keyword {
  text: string;
  value: number;
}

export interface Theme {
  theme: string;
  count: number;
  avg_score: number;
}

export interface Insight {
  type: 'positive' | 'warning' | 'info' | 'neutral';
  text: string;
}

export interface DashboardData {
  kpis: KPI;
  trends: Trend[];
  programme_trends: Trend[];
  programme_stats: ProgrammeStat[];
  studio_stats: StudioStat[];
  divergence: DivergenceCase[];
  high_divergence: DivergenceCase[];
  tutor_performance: TutorPerformance[];
  available_filters: {
    semesters: string[];
    programmes: string[];
    studios: string[];
  };
}

export interface SentimentData {
  remarks: Remark[];
  keywords: Keyword[];
  themes: Theme[];
}

export interface InsightsData {
  insights: Insight[];
}
