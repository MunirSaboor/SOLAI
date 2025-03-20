import pumpFunAPI, { Token as PumpFunToken } from './platforms/pumpFunAPI';
import moonshotAPI, { Token as MoonshotToken } from './platforms/moonshotAPI';
import raydiumAPI, { Token as RaydiumToken } from './platforms/raydiumAPI';

// Unified token interface
export interface Token {
  address: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
  platform: 'pump.fun' | 'moonshot' | 'raydium';
}

// Trade simulation result interface
export interface TradeSimulationResult {
  success: boolean;
  estimatedPrice: number;
  totalValue: number;
  fee: number;
  slippage: number;
  platform: 'pump.fun' | 'moonshot' | 'raydium';
}

// Crypto API service that combines all platform APIs
class CryptoAPIService {
  // Get trending tokens from all platforms
  async getTrendingTokens(): Promise<Token[]> {
    try {
      // Fetch trending tokens from all platforms in parallel
      const [pumpFunTokens, moonshotTokens, raydiumTokens] = await Promise.all([
        pumpFunAPI.getTrendingTokens(),
        moonshotAPI.getTrendingTokens(),
        raydiumAPI.getTrendingTokens()
      ]);
      
      // Convert to unified token format and combine
      return [
        ...this.convertPumpFunTokens(pumpFunTokens),
        ...this.convertMoonshotTokens(moonshotTokens),
        ...this.convertRaydiumTokens(raydiumTokens)
      ];
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      return [];
    }
  }
  
  // Get recent tokens from pump.fun and moonshot
  async getRecentTokens(): Promise<Token[]> {
    try {
      // Fetch recent tokens from platforms that support it
      const [pumpFunTokens, moonshotTokens] = await Promise.all([
        pumpFunAPI.getRecentTokens(),
        moonshotAPI.getRecentTokens()
      ]);
      
      // Convert to unified token format and combine
      return [
        ...this.convertPumpFunTokens(pumpFunTokens),
        ...this.convertMoonshotTokens(moonshotTokens)
      ];
    } catch (error) {
      console.error('Error fetching recent tokens:', error);
      return [];
    }
  }
  
  // Search tokens across all platforms
  async searchTokens(query: string): Promise<Token[]> {
    try {
      // Search tokens from all platforms in parallel
      const [pumpFunTokens, moonshotTokens, raydiumTokens] = await Promise.all([
        pumpFunAPI.searchTokens(query),
        moonshotAPI.searchTokens(query),
        raydiumAPI.searchTokens(query)
      ]);
      
      // Convert to unified token format and combine
      return [
        ...this.convertPumpFunTokens(pumpFunTokens),
        ...this.convertMoonshotTokens(moonshotTokens),
        ...this.convertRaydiumTokens(raydiumTokens)
      ];
    } catch (error) {
      console.error(`Error searching tokens with query "${query}":`, error);
      return [];
    }
  }
  
  // Get token details from a specific platform
  async getTokenDetails(address: string, platform: 'pump.fun' | 'moonshot' | 'raydium'): Promise<Token | null> {
    try {
      let token = null;
      
      // Get token details from the specified platform
      switch (platform) {
        case 'pump.fun':
          token = await pumpFunAPI.getTokenDetails(address);
          if (token) return this.convertPumpFunToken(token);
          break;
        case 'moonshot':
          token = await moonshotAPI.getTokenDetails(address);
          if (token) return this.convertMoonshotToken(token);
          break;
        case 'raydium':
          token = await raydiumAPI.getTokenDetails(address);
          if (token) return this.convertRaydiumToken(token);
          break;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching token details for ${address} from ${platform}:`, error);
      return null;
    }
  }
  
  // Simulate a trade on a specific platform
  async simulateTrade(
    tokenAddress: string,
    amount: number,
    isBuy: boolean,
    platform: 'pump.fun' | 'moonshot' | 'raydium'
  ): Promise<TradeSimulationResult> {
    try {
      let result;
      
      // Simulate trade on the specified platform
      switch (platform) {
        case 'pump.fun':
          result = await pumpFunAPI.simulateTrade(tokenAddress, amount, isBuy);
          break;
        case 'moonshot':
          result = await moonshotAPI.simulateTrade(tokenAddress, amount, isBuy);
          break;
        case 'raydium':
          result = await raydiumAPI.simulateTrade(tokenAddress, amount, isBuy);
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
      
      return {
        ...result,
        platform
      };
    } catch (error) {
      console.error(`Error simulating trade on ${platform}:`, error);
      return {
        success: false,
        estimatedPrice: 0,
        totalValue: 0,
        fee: 0,
        slippage: 0,
        platform
      };
    }
  }
  
  // Get liquidity pools from Raydium
  async getRaydiumLiquidityPools(): Promise<any[]> {
    try {
      return await raydiumAPI.getLiquidityPools();
    } catch (error) {
      console.error('Error fetching Raydium liquidity pools:', error);
      return [];
    }
  }
  
  // Get trading pairs from Raydium
  async getRaydiumTradingPairs(): Promise<any[]> {
    try {
      return await raydiumAPI.getTradingPairs();
    } catch (error) {
      console.error('Error fetching Raydium trading pairs:', error);
      return [];
    }
  }
  
  // Helper methods to convert tokens to unified format
  private convertPumpFunToken(token: PumpFunToken): Token {
    return {
      ...token,
      platform: 'pump.fun'
    };
  }
  
  private convertPumpFunTokens(tokens: PumpFunToken[]): Token[] {
    return tokens.map(token => this.convertPumpFunToken(token));
  }
  
  private convertMoonshotToken(token: MoonshotToken): Token {
    return {
      ...token,
      platform: 'moonshot'
    };
  }
  
  private convertMoonshotTokens(tokens: MoonshotToken[]): Token[] {
    return tokens.map(token => this.convertMoonshotToken(token));
  }
  
  private convertRaydiumToken(token: RaydiumToken): Token {
    return {
      ...token,
      platform: 'raydium'
    };
  }
  
  private convertRaydiumTokens(tokens: RaydiumToken[]): Token[] {
    return tokens.map(token => this.convertRaydiumToken(token));
  }
}

export default new CryptoAPIService();
