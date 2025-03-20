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

export interface MoonshotResponse {
  tokens: Token[];
  trending: Token[];
  recent: Token[];
}

// Base URL for Moonshot API
const BASE_URL = 'https://api.moonshot.com';

// API client for Moonshot
class MoonshotAPI {
  // Get trending tokens
  async getTrendingTokens(): Promise<Token[]> {
    try {
      const response = await axios.get(`${BASE_URL}/trending`);
      return this.formatTokens(response.data.tokens);
    } catch (error) {
      console.error('Error fetching trending tokens from Moonshot:', error);
      return [];
    }
  }

  // Get recent tokens
  async getRecentTokens(): Promise<Token[]> {
    try {
      const response = await axios.get(`${BASE_URL}/recent`);
      return this.formatTokens(response.data.tokens);
    } catch (error) {
      console.error('Error fetching recent tokens from Moonshot:', error);
      return [];
    }
  }

  // Get token details
  async getTokenDetails(address: string): Promise<Token | null> {
    try {
      const response = await axios.get(`${BASE_URL}/token/${address}`);
      return this.formatToken(response.data);
    } catch (error) {
      console.error(`Error fetching token details for ${address} from Moonshot:`, error);
      return null;
    }
  }

  // Search tokens
  async searchTokens(query: string): Promise<Token[]> {
    try {
      const response = await axios.get(`${BASE_URL}/search?q=${query}`);
      return this.formatTokens(response.data.tokens);
    } catch (error) {
      console.error(`Error searching tokens with query "${query}" from Moonshot:`, error);
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
      console.error('Error simulating trade on Moonshot:', error);
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

export default new MoonshotAPI();
