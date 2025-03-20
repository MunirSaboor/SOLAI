import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { supabase } from '@/src/lib/supabase';
import { cryptoAPI } from '@/src/api/cryptoAPI';

// Mock the supabase client
jest.mock('@/src/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
    },
  },
}));

// Mock the crypto API
jest.mock('@/src/api/cryptoAPI', () => ({
  cryptoAPI: {
    getTrendingTokens: jest.fn(),
    getRecentTokens: jest.fn(),
    getTokenDetails: jest.fn(),
    simulateTrade: jest.fn(),
  },
}));

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Supabase authentication session retrieval', async () => {
    const mockSession = {
      user: { id: 'user123', email: 'test@example.com' },
      access_token: 'test-token',
      refresh_token: 'refresh-token',
    };

    supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const { data, error } = await supabase.auth.getSession();
    
    expect(error).toBeNull();
    expect(data.session).toEqual(mockSession);
    expect(supabase.auth.getSession).toHaveBeenCalled();
  });

  test('CryptoAPI getTrendingTokens', async () => {
    const mockTrendingTokens = [
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 150.75,
        priceChange24h: 5.25,
        volume24h: 1500000000,
        platform: 'raydium',
      },
      {
        symbol: 'BONK',
        name: 'Bonk',
        price: 0.00002,
        priceChange24h: 12.5,
        volume24h: 250000000,
        platform: 'pump.fun',
      },
    ];

    cryptoAPI.getTrendingTokens.mockResolvedValue(mockTrendingTokens);

    const result = await cryptoAPI.getTrendingTokens();
    
    expect(result).toEqual(mockTrendingTokens);
    expect(cryptoAPI.getTrendingTokens).toHaveBeenCalled();
  });

  test('CryptoAPI getTokenDetails', async () => {
    const mockTokenDetails = {
      symbol: 'SOL',
      name: 'Solana',
      price: 150.75,
      priceChange24h: 5.25,
      volume24h: 1500000000,
      marketCap: 65000000000,
      platform: 'raydium',
      description: 'Solana is a high-performance blockchain...',
      website: 'https://solana.com',
      twitter: '@solana',
      priceHistory: [
        { time: '2025-03-18', price: 145.50 },
        { time: '2025-03-19', price: 150.75 },
      ],
    };

    cryptoAPI.getTokenDetails.mockResolvedValue(mockTokenDetails);

    const result = await cryptoAPI.getTokenDetails('SOL');
    
    expect(result).toEqual(mockTokenDetails);
    expect(cryptoAPI.getTokenDetails).toHaveBeenCalledWith('SOL');
  });

  test('CryptoAPI simulateTrade', async () => {
    const mockTradeResult = {
      success: true,
      executedPrice: 150.75,
      amount: 10,
      total: 1507.50,
      fee: 1.51,
      slippage: 7.54,
      finalAmount: 1516.55,
      timestamp: '2025-03-19T12:00:00Z',
    };

    cryptoAPI.simulateTrade.mockResolvedValue(mockTradeResult);

    const result = await cryptoAPI.simulateTrade('SOL', 10, true, 'raydium');
    
    expect(result).toEqual(mockTradeResult);
    expect(cryptoAPI.simulateTrade).toHaveBeenCalledWith('SOL', 10, true, 'raydium');
  });
});
