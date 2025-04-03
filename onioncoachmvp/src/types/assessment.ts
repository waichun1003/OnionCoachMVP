export interface AssessmentResults {
  personalityType: string;
  strengths: string[];
  challenges: string[];
  recommendedPath: string;
  scores: Record<string, number>;
  completedAt: string;
}