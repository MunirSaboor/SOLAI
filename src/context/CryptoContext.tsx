import React, { createContext, useContext, useState, useEffect } from 'react';
import cryptoAPI, { Token, TradeSimulationResult } from '../api/cryptoAPI';

// Context interface
interface CryptoContextType {
  trendingTokens: Token[];
  recentTokens: Token[];
  isLoading: boolean;
  error: string | null;
  searchTokens: (query: string) => Promise<Token[]>;
  getTokenDetails: (address: string, platform: 'pump.fun' | 'moonshot' | 'raydium') => Promise<Token | null>;
  simulateTrade: (
    tokenAddress: string,
    amount: number,
    isBuy: boolean,
    platform: 'pump.fun' | 'moonshot' | 'raydium'
  ) => Promise<TradeSimulationResult>;
  refreshData: () => Promise<void>;
}

// Create context with default values
const CryptoContext = createContext<CryptoContextType>({
  trendingTokens: [],
  recentTokens: [],
  isLoading: false,
  error: null,
  searchTokens: async () => [],
  getTokenDetails: async () => null,
  simulateTrade: async () => ({
    success: false,
    estimatedPrice: 0,
    totalValue: 0,
    fee: 0,
    slippage: 0,
    platform: 'pump.fun'
  }),
  refreshData: async () => {}
});

// Provider component
export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch initial data
  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch trending and recent tokens in parallel
      const [trendingData, recentData] = await Promise.all([
        cryptoAPI.getTrendingTokens(),
        cryptoAPI.getRecentTokens()
      ]);
      
      setTrendingTokens(trendingData);
      setRecentTokens(recentData);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError('Failed to fetch cryptocurrency data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search tokens
  const searchTokens = async (query: string): Promise<Token[]> => {
    if (!query.trim()) return [];
    
    try {
      return await cryptoAPI.searchTokens(query);
    } catch (err) {
      console.error('Error searching tokens:', err);
      setError('Failed to search tokens. Please try again later.');
      return [];
    }
  };

  // Function to get token details
  const getTokenDetails = async (address: string, platform: 'pump.fun' | 'moonshot' | 'raydium'): Promise<Token | null> => {
    try {
      return await cryptoAPI.getTokenDetails(address, platform);
    } catch (err) {
      console.error(`Error getting token details for ${address}:`, err);
      setError('Failed to get token details. Please try again later.');
      return null;
    }
  };

  // Function to simulate a trade
  const simulateTrade = async (
    tokenAddress: string,
    amount: number,
    isBuy: boolean,
    platform: 'pump.fun' | 'moonshot' | 'raydium'
  ): Promise<TradeSimulationResult> => {
    try {
      return await cryptoAPI.simulateTrade(tokenAddress, amount, isBuy, platform);
    } catch (err) {
      console.error('Error simulating trade:', err);
      setError('Failed to simulate trade. Please try again later.');
      return {
        success: false,
        estimatedPrice: 0,
        totalValue: 0,
        fee: 0,
        slippage: 0,
        platform
      };
    }
  };

  // Function to refresh data
  const refreshData = async (): Promise<void> => {
    await fetchInitialData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Context value
  const value = {
    trendingTokens,
    recentTokens,
    isLoading,
    error,
    searchTokens,
    getTokenDetails,
    simulateTrade,
    refreshData
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

// Custom hook to use the crypto context
export const useCrypto = () => useContext(CryptoContext);

export default CryptoContext;
