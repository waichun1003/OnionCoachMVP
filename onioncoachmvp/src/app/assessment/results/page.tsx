'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Loader } from '@/components/ui/loader';
import { AssessmentResult } from "@/components/assessment-result";

function AssessmentResultsContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');
  const name = searchParams.get('name');
  const urlScores = searchParams.get('scores');
  
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // If we have URL params, use those directly
    if (name && urlScores) {
      try {
        const scores = JSON.parse(urlScores);
        setAssessmentData({ name, scores });
        setLoading(false);
        return;
      } catch (err) {
        console.error('Error parsing scores from URL:', err);
        // Continue to API fetch if URL parsing fails
      }
    }

    // Only fetch from API if we have an ID
    if (!resultId) {
      setError('No assessment data provided');
      setLoading(false);
      return;
    }
    
    async function fetchAssessmentResults() {
      try {
        if (!resultId) return;
        const response = await axios.get(`/api/assessment/results?id=${encodeURIComponent(resultId)}`);
        
        if (response.data && response.data.results) {
          setAssessmentData(response.data.results);
        } else {
          setError('Assessment results not found');
        }
      } catch (err) {
        console.error('Error fetching assessment results:', err);
        setError('Error retrieving your assessment results. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAssessmentResults();
  }, [resultId, name, urlScores]);
  
  if (loading) {
    return <Loader message="Loading your assessment results..." />;
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm max-w-lg w-full">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Error</h1>
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => window.location.href = '/assessment/start'}
          >
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  // If we have the AssessmentResult component, use it
  if (assessmentData?.name && assessmentData?.scores) {
    return <AssessmentResult 
      name={assessmentData.name} 
      scores={assessmentData.scores} 
      onSchedule={() => window.location.href = '/schedule'}
    />;
  }
  
  // Fallback to the detailed view
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Assessment Results</h1>
      
      {assessmentData && (
        <div>
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              {assessmentData.personalityType}
            </h2>
            <p className="text-gray-700">
              Recommended Path: <span className="font-medium">{assessmentData.recommendedPath}</span>
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Scores</h3>
            {Object.entries(assessmentData.scores || {}).map(([category, score]) => (
              <div key={category} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{category}</span>
                  <span>{score as number}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${(Number(score) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {assessmentData.strengths && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Your Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {assessmentData.strengths.map((strength: string) => (
                  <span key={strength} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          )}

          {assessmentData.challenges && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Areas for Growth</h3>
              <div className="flex flex-wrap gap-2">
                {assessmentData.challenges.map((challenge: string) => (
                  <span key={challenge} className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {challenge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssessmentResultsContent />
    </Suspense>
  );
} 