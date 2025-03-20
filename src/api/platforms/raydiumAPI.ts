import axios from 'axios';

// Types
export interface Token {
  address: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
}

export interface RaydiumResponse {
  tokens: Token[];
  pools: any[];
  pairs: any[];
}

// Base URL for Raydium API
const BASE_URL = 'https://api.raydium.io';

// API client for Raydium
class RaydiumAPI {
  // Get trending tokens
  async getTrendingTokens(): Promise<Token[]> {
    try {
      const response = await axios.get(`${BASE_URL}/v2/trending`);
      return this.formatTokens(response.data.tokens);
    } catch (error) {
      console.error('Error fetching trending tokens from Raydium:', error);
      return [];
    }
  }

  // Get token details
  async getTokenDetails(address: string): Promise<Token | null> {
    try {
      const response = await axios.get(`${BASE_URL}/v2/token/${address}`);
      return this.formatToken(response.data);
    } catch (error) {
      console.error(`Error fetching token details for ${address} from Raydium:`, error);
      return null;
    }
  }

  // Get liquidity pools
  async getLiquidityPools(): Promise<any[]> {
    try {
      const response = await axios.get(`${BASE_URL}/v2/pools`);
      return response.data.pools || [];
    } catch (error) {
      console.error('Error fetching liquidity pools from Raydium:', error);
      return [];
    }
  }

  // Get trading pairs
  async getTradingPairs(): Promise<any[]> {
    try {
      const response = await axios.get(`${BASE_URL}/v2/pairs`);
      return response.data.pairs || [];
    } catch (error) {
      console.error('Error fetching trading pairs from Raydium:', error);
      return [];
    }
  }

  // Search tokens
  async searchTokens(query: string): Promise<Token[]> {
    try {
      const response = await axios.get(`${BASE_URL}/v2/search?q=${query}`);
      return this.formatTokens(response.data.tokens);
    } catch (error) {
      console.error(`Error searching tokens with query "${query}" from Raydium:`, error);
      return [];
    }
  }

  // Simulate a trade (for paper trading)
  async simulateTrade(
    tokenAddress: string,
    amount: number,
    isBuy: boolean
  ): Promise<{
    success: boolean;
    estimatedPrice: number;
    totalValue: number;
    fee: number;
    slippage: number;
  }> {
    try {
      // In a real implementation, this would call the API
      // For now, we'll simulate the response
      const token = await this.getTokenDetails(tokenAddress);
      
      if (!token) {
        throw new Error('Token not found');
      }
      
      const estimatedPrice = token.price;
      const totalValue = amount * estimatedPrice;
      const fee = totalValue * 0.001; // 0.1% fee
      const slippage = totalValue * 0.005; // 0.5% slippage
      
      return {
        success: true,
        estimatedPrice,
        totalValue,
        fee,
        slippage
      };
    } catch (error) {
      console.error('Error simulating trade on Raydium:', error);
      return {
        success: false,
        estimatedPrice: 0,
        totalValue: 0,
        fee: 0,
        slippage: 0
      };
    }
  }

  // Helper method to format token data
  private formatToken(data: any): Token {
    return {
      address: data.address || '',
      symbol: data.symbol || '',
      name: data.name || '',
      price: parseFloat(data.price) || 0,
      change24h: parseFloat(data.change_24h) || 0,
      volume24h: parseFloat(data.volume_24h) || 0,
      marketCap: parseFloat(data.market_cap) || 0,
      image: data.image || undefined
    };
  }

  // Helper method to format multiple tokens
  private formatTokens(data: any[]): Token[] {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(token => this.formatToken(token));
  }
}

export default new RaydiumAPI();
