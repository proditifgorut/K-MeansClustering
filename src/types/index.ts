export interface Student {
  id: string;
  name: string;
  ipk: number;
  attendanceRate: number;
  projectScore: number;
  examScore: number;
  concentration?: string;
}

export interface ClusterResult {
  k: number;
  clusters: Student[][];
  centroids: number[][];
  inertia: number;
}

export interface OptimizationResult {
  optimalK: number;
  elbowData: { k: number; inertia: number }[];
  finalClusters: ClusterResult;
}
