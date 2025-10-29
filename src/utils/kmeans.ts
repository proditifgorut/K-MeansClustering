import { Student, ClusterResult } from '../types';

function euclideanDistance(point1: number[], point2: number[]): number {
  return Math.sqrt(
    point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0)
  );
}

function getStudentFeatures(student: Student): number[] {
  return [
    student.ipk,
    student.attendanceRate,
    student.projectScore,
    student.examScore
  ];
}

function initializeCentroids(data: number[][], k: number): number[][] {
  const centroids: number[][] = [];
  const used = new Set<number>();
  
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * data.length);
    if (!used.has(idx)) {
      centroids.push([...data[idx]]);
      used.add(idx);
    }
  }
  
  return centroids;
}

function assignClusters(data: number[][], centroids: number[][]): number[] {
  return data.map(point => {
    let minDist = Infinity;
    let clusterIdx = 0;
    
    centroids.forEach((centroid, idx) => {
      const dist = euclideanDistance(point, centroid);
      if (dist < minDist) {
        minDist = dist;
        clusterIdx = idx;
      }
    });
    
    return clusterIdx;
  });
}

function updateCentroids(data: number[][], assignments: number[], k: number): number[][] {
  const centroids: number[][] = [];
  const dimensions = data[0].length;
  
  for (let i = 0; i < k; i++) {
    const clusterPoints = data.filter((_, idx) => assignments[idx] === i);
    
    if (clusterPoints.length === 0) {
      centroids.push(data[Math.floor(Math.random() * data.length)]);
      continue;
    }
    
    const centroid = new Array(dimensions).fill(0);
    clusterPoints.forEach(point => {
      point.forEach((val, dim) => {
        centroid[dim] += val;
      });
    });
    
    centroids.push(centroid.map(sum => sum / clusterPoints.length));
  }
  
  return centroids;
}

function calculateInertia(data: number[][], assignments: number[], centroids: number[][]): number {
  return data.reduce((sum, point, idx) => {
    const centroid = centroids[assignments[idx]];
    return sum + Math.pow(euclideanDistance(point, centroid), 2);
  }, 0);
}

export function performKMeans(students: Student[], k: number, maxIterations = 100): ClusterResult {
  const data = students.map(getStudentFeatures);
  let centroids = initializeCentroids(data, k);
  let assignments: number[] = [];
  let prevAssignments: number[] = [];
  
  for (let iter = 0; iter < maxIterations; iter++) {
    assignments = assignClusters(data, centroids);
    
    if (JSON.stringify(assignments) === JSON.stringify(prevAssignments)) {
      break;
    }
    
    prevAssignments = [...assignments];
    centroids = updateCentroids(data, assignments, k);
  }
  
  const clusters: Student[][] = Array.from({ length: k }, () => []);
  students.forEach((student, idx) => {
    clusters[assignments[idx]].push(student);
  });
  
  const inertia = calculateInertia(data, assignments, centroids);
  
  return { k, clusters, centroids, inertia };
}

export function findOptimalK(students: Student[], maxK = 8): { k: number; inertia: number }[] {
  const results: { k: number; inertia: number }[] = [];
  
  for (let k = 2; k <= Math.min(maxK, students.length - 1); k++) {
    const result = performKMeans(students, k);
    results.push({ k, inertia: result.inertia });
  }
  
  return results;
}

export function determineOptimalK(elbowData: { k: number; inertia: number }[]): number {
  if (elbowData.length < 3) return elbowData[0]?.k || 2;
  
  const slopes: number[] = [];
  for (let i = 1; i < elbowData.length; i++) {
    const slope = (elbowData[i].inertia - elbowData[i - 1].inertia) / 
                  (elbowData[i].k - elbowData[i - 1].k);
    slopes.push(Math.abs(slope));
  }
  
  let maxDecrease = 0;
  let optimalIdx = 0;
  
  for (let i = 1; i < slopes.length; i++) {
    const decrease = slopes[i - 1] - slopes[i];
    if (decrease > maxDecrease) {
      maxDecrease = decrease;
      optimalIdx = i;
    }
  }
  
  return elbowData[optimalIdx + 1]?.k || elbowData[Math.floor(elbowData.length / 2)]?.k || 3;
}
