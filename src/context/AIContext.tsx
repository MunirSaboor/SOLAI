import React, { createContext, useContext, useState } from 'react';
import deepSeekService, { 
  TradeAnalysis, 
  StrategyGuidance, 
  PortfolioAnalysis 
} from '../services/ai/deepSeekService';
import { Token } from '../api/cryptoAPI';

// Context interface
interface AIContextType {
  isLoading: boolean;
  error: string | null;
  analyzeTradeDecision: (
    token: Token,
    amount: number,
    price: number,
    isBuy: boolean,
    portfolioContext: any
  ) => Promise<TradeAnalysis>;
  getStrategyGuidance: (
    marketTrends: any,
    userPreferences: any
  ) => Promise<StrategyGuidance>;
  analyzePortfolio: (
    holdings: any[],
    transactionHistory: any[]
  ) => Promise<PortfolioAnalysis>;
  getEducationalRecommendations: (
    userLevel: 'beginner' | 'intermediate' | 'advanced',
    interests: string[]
  ) => Promise<string[]>;
}

// Create context with default values
const AIContext = createContext<AIContextType>({
  isLoading: false,
  error: null,
  analyzeTradeDecision: async () => ({
    feedback: '',
    riskLevel: 'medium',
    potentialIssues: [],
    recommendations: []
  }),
  getStrategyGuidance: async () => ({
    overview: '',
    shortTerm: '',
    longTerm: '',
    diversificationTips: [],
    riskManagement: []
  }),
  analyzePortfolio: async () => ({
    overview: '',
    strengths: [],
    weaknesses: [],
    opportunities: [],
    recommendations: [],
    riskAssessment: ''
  }),
  getEducationalRecommendations: async () => []
});

// Provider component
export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to analyze a trade decision
  const analyzeTradeDecision = async (
    token: Token,
    amount: number,
    price: number,
    isBuy: boolean,
    portfolioContext: any
  ): Promise<TradeAnalysis> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const analysis = await deepSeekService.analyzeTradeDecision(
        token,
        amount,
        price,
        isBuy,
        portfolioContext
      );
      return analysis;
    } catch (err) {
      console.error('Error analyzing trade decision:', err);
      setError('Failed to analyze trade. Please try again later.');
      return {
        feedback: 'Unable to analyze trade at this time. Please try again later.',
        riskLevel: 'medium',
        potentialIssues: ['Analysis service unavailable'],
        recommendations: ['Try again later']
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get strategy guidance
  const getStrategyGuidance = async (
    marketTrends: any,
    userPreferences: any
  ): Promise<StrategyGuidance> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const guidance = await deepSeekService.getStrategyGuidance(
        marketTrends,
        userPreferences
      );
      return guidance;
    } catch (err) {
      console.error('Error getting strategy guidance:', err);
      setError('Failed to get strategy guidance. Please try again later.');
      return {
        overview: "Unable to generate strategy guidance at this time.",
        shortTerm: "Please try again later.",
        longTerm: "Please try again later.",
        diversificationTips: ["Service temporarily unavailable"],
        riskManagement: ["Service temporarily unavailable"]
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to analyze portfolio
  const analyzePortfolio = async (
    holdings: any[],
    transactionHistory: any[]
  ): Promise<PortfolioAnalysis> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const analysis = await deepSeekService.analyzePortfolio(
        holdings,
        transactionHistory
      );
      return analysis;
    } catch (err) {
      console.error('Error analyzing portfolio:', err);
      setError('Failed to analyze portfolio. Please try again later.');
      return {
        overview: "Unable to analyze portfolio at this time.",
        strengths: ["Analysis service unavailable"],
        weaknesses: ["Analysis service unavailable"],
        opportunities: ["Analysis service unavailable"],
        recommendations: ["Please try again later"],
        riskAssessment: "Risk assessment unavailable"
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get educational recommendations
  const getEducationalRecommendations = async (
    userLevel: 'beginner' | 'intermediate' | 'advanced',
    interests: string[]
  ): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const recommendations = await deepSeekService.getEducationalRecommendations(
        userLevel,
        interests
      );
      return recommendations;
    } catch (err) {
      console.error('Error getting educational recommendations:', err);
      setError('Failed to get recommendations. Please try again later.');
      return ['Service temporarily unavailable. Please try again later.'];
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    isLoading,
    error,
    analyzeTradeDecision,
    getStrategyGuidance,
    analyzePortfolio,
    getEducationalRecommendations
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// Custom hook to use the AI context
export const useAI = () => useContext(AIContext);

export default AIContext;
