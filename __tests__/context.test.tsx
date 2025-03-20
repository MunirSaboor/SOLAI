import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CryptoProvider } from '../src/context/CryptoContext';
import { AIProvider } from '../src/context/AIContext';

// Mock the crypto API and deepSeek service
jest.mock('../src/api/cryptoAPI', () => ({
  getTrendingTokens: jest.fn().mockResolvedValue([
    {
      address: '0x123',
      symbol: 'SOL',
      name: 'Solana',
      price: 7.50,
      change24h: 4.5,
      volume24h: 1000000,
      marketCap: 3200000000,
      platform: 'pump.fun'
    }
  ]),
  getRecentTokens: jest.fn().mockResolvedValue([
    {
      address: '0x456',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 450.50,
      change24h: 1.2,
      volume24h: 5000000,
      marketCap: 50000000000,
      platform: 'moonshot'
    }
  ])
}));

jest.mock('../src/services/ai/deepSeekService', () => ({
  analyzeTradeDecision: jest.fn().mockResolvedValue({
    feedback: 'Test feedback',
    riskLevel: 'medium',
    potentialIssues: ['Test issue'],
    recommendations: ['Test recommendation']
  })
}));

// Test component to consume context
const TestComponent = () => {
  return <div>Test Component</div>;
};

describe('Context Integration Tests', () => {
  test('CryptoProvider renders without crashing', () => {
    const { getByText } = render(
      <CryptoProvider>
        <TestComponent />
      </CryptoProvider>
    );
  });

  test('AIProvider renders without crashing', () => {
    const { getByText } = render(
      <AIProvider>
        <TestComponent />
      </AIProvider>
    );
  });

  test('Nested providers render without crashing', () => {
    const { getByText } = render(
      <CryptoProvider>
        <AIProvider>
          <TestComponent />
        </AIProvider>
      </CryptoProvider>
    );
  });
});
