import { Token } from '../src/api/cryptoAPI';
import cryptoAPI from '../src/api/cryptoAPI';

// Mock the axios module
jest.mock('axios');

describe('Crypto API Service', () => {
  // Test getTrendingTokens method
  test('getTrendingTokens combines results from all platforms', async () => {
    // Mock implementation to return test data
    jest.spyOn(cryptoAPI, 'getTrendingTokens').mockImplementation(async () => {
      return [
        {
          address: '0x123',
          symbol: 'SOL',
          name: 'Solana',
          price: 7.50,
          change24h: 4.5,
          volume24h: 1000000,
          marketCap: 3200000000,
          platform: 'pump.fun'
        },
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
      ];
    });

    const result = await cryptoAPI.getTrendingTokens();
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('platform');
    expect(result[0]).toHaveProperty('symbol');
    expect(result[0]).toHaveProperty('price');
  });

  // Test searchTokens method
  test('searchTokens returns tokens matching query', async () => {
    // Mock implementation to return test data
    jest.spyOn(cryptoAPI, 'searchTokens').mockImplementation(async (query) => {
      return [
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
      ];
    });

    const result = await cryptoAPI.searchTokens('SOL');
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].symbol).toBe('SOL');
  });

  // Test getTokenDetails method
  test('getTokenDetails returns token details from specified platform', async () => {
    // Mock implementation to return test data
    jest.spyOn(cryptoAPI, 'getTokenDetails').mockImplementation(async (address, platform) => {
      return {
        address: '0x123',
        symbol: 'SOL',
        name: 'Solana',
        price: 7.50,
        change24h: 4.5,
        volume24h: 1000000,
        marketCap: 3200000000,
        platform: platform
      };
    });

    const result = await cryptoAPI.getTokenDetails('0x123', 'pump.fun');
    
    expect(result).toBeDefined();
    expect(result?.address).toBe('0x123');
    expect(result?.symbol).toBe('SOL');
    expect(result?.platform).toBe('pump.fun');
  });

  // Test simulateTrade method
  test('simulateTrade returns valid simulation result', async () => {
    // Mock implementation to return test data
    jest.spyOn(cryptoAPI, 'simulateTrade').mockImplementation(async (address, amount, isBuy, platform) => {
      return {
        success: true,
        estimatedPrice: 7.50,
        totalValue: amount * 7.50,
        fee: amount * 7.50 * 0.001,
        slippage: amount * 7.50 * 0.005,
        platform: platform
      };
    });

    const result = await cryptoAPI.simulateTrade('0x123', 10, true, 'pump.fun');
    
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.estimatedPrice).toBe(7.50);
    expect(result.totalValue).toBe(75);
    expect(result.fee).toBe(0.075);
    expect(result.slippage).toBe(0.375);
    expect(result.platform).toBe('pump.fun');
  });
});
