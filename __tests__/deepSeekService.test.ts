import { Token } from '../src/api/cryptoAPI';
import deepSeekService from '../src/services/ai/deepSeekService';

describe('DeepSeek AI Service', () => {
  // Mock token for testing
  const mockToken: Token = {
    address: '0x123456789',
    symbol: 'SOL',
    name: 'Solana',
    price: 7.50,
    change24h: 4.5,
    volume24h: 1000000,
    marketCap: 3200000000,
    platform: 'pump.fun'
  };

  // Mock portfolio data
  const mockHoldings = [
    { name: 'SOL', amount: 100, value: 750.25, change24h: 4.5 },
    { name: 'ETH', amount: 1, value: 450.50, change24h: 1.2 },
    { name: 'BTC', amount: 0.01, value: 50.00, change24h: -2.1 }
  ];

  const mockTransactions = [
    { type: 'buy', coin: 'SOL', amount: 50, price: 6.75, total: 337.50, date: '2025-03-15' },
    { type: 'buy', coin: 'ETH', amount: 0.5, price: 400.00, total: 200.00, date: '2025-03-14' },
    { type: 'sell', coin: 'BTC', amount: 0.005, price: 5100.00, total: 25.50, date: '2025-03-12' }
  ];

  test('analyzeTradeDecision returns valid analysis', async () => {
    const analysis = await deepSeekService.analyzeTradeDecision(
      mockToken,
      10,
      7.50,
      true,
      {}
    );

    expect(analysis).toBeDefined();
    expect(analysis.feedback).toBeTruthy();
    expect(['low', 'medium', 'high']).toContain(analysis.riskLevel);
    expect(Array.isArray(analysis.potentialIssues)).toBe(true);
    expect(Array.isArray(analysis.recommendations)).toBe(true);
  });

  test('getStrategyGuidance returns valid guidance', async () => {
    const guidance = await deepSeekService.getStrategyGuidance({}, {});

    expect(guidance).toBeDefined();
    expect(guidance.overview).toBeTruthy();
    expect(guidance.shortTerm).toBeTruthy();
    expect(guidance.longTerm).toBeTruthy();
    expect(Array.isArray(guidance.diversificationTips)).toBe(true);
    expect(Array.isArray(guidance.riskManagement)).toBe(true);
    expect(guidance.diversificationTips.length).toBeGreaterThan(0);
    expect(guidance.riskManagement.length).toBeGreaterThan(0);
  });

  test('analyzePortfolio returns valid analysis', async () => {
    const analysis = await deepSeekService.analyzePortfolio(
      mockHoldings,
      mockTransactions
    );

    expect(analysis).toBeDefined();
    expect(analysis.overview).toBeTruthy();
    expect(Array.isArray(analysis.strengths)).toBe(true);
    expect(Array.isArray(analysis.weaknesses)).toBe(true);
    expect(Array.isArray(analysis.opportunities)).toBe(true);
    expect(Array.isArray(analysis.recommendations)).toBe(true);
    expect(analysis.riskAssessment).toBeTruthy();
    expect(analysis.strengths.length).toBeGreaterThan(0);
    expect(analysis.recommendations.length).toBeGreaterThan(0);
  });

  test('getEducationalRecommendations returns valid recommendations', async () => {
    const recommendations = await deepSeekService.getEducationalRecommendations(
      'intermediate',
      ['defi', 'trading']
    );

    expect(recommendations).toBeDefined();
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);
  });
});
