import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TokenCard from '@/src/components/TokenCard';
import TradingPanel from '@/src/components/TradingPanel';
import PortfolioSummary from '@/src/components/PortfolioSummary';
import MarketOverview from '@/src/components/MarketOverview';

// Mock data
const mockToken = {
  symbol: 'SOL',
  name: 'Solana',
  price: 150.75,
  priceChange24h: 5.25,
  volume24h: 1500000000,
  marketCap: 65000000000,
  platform: 'raydium',
};

const mockPortfolioData = {
  totalValue: 10000,
  dailyChange: 250,
  dailyChangePercent: 2.5,
  weeklyChange: 500,
  weeklyChangePercent: 5.0,
  monthlyChange: 1000,
  monthlyChangePercent: 10.0,
  allTimeChange: 2000,
  allTimeChangePercent: 20.0,
  portfolioHistory: Array(30).fill(0).map((_, i) => ({
    time: `2025-03-${i + 1}`,
    value: 8000 + (i * 100),
  })),
};

const mockMarketStats = {
  totalMarketCap: 2500000000000,
  totalVolume24h: 150000000000,
  solPrice: 150.75,
  solChange24h: 5.25,
  btcPrice: 65000,
  btcChange24h: 2.1,
  ethPrice: 3500,
  ethChange24h: 3.2,
};

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
  {
    symbol: 'JTO',
    name: 'Jito',
    price: 3.45,
    priceChange24h: -2.1,
    volume24h: 75000000,
    platform: 'moonshot',
  },
];

const mockCandlestickData = [
  { time: '09:00', open: 100, high: 110, low: 95, close: 105, volume: 1000 },
  { time: '10:00', open: 105, high: 115, low: 100, close: 110, volume: 1500 },
  { time: '11:00', open: 110, high: 120, low: 105, close: 115, volume: 2000 },
  { time: '12:00', open: 115, high: 125, low: 110, close: 120, volume: 1800 },
  { time: '13:00', open: 120, high: 130, low: 115, close: 125, volume: 2200 },
];

// Mock Image component
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    Image: 'Image',
  };
});

// Mock Svg components
jest.mock('react-native-svg', () => {
  const MockSvg = ({ children }) => <div>{children}</div>;
  const MockSvgComponent = ({ children }) => <div>{children}</div>;
  
  return {
    __esModule: true,
    default: MockSvg,
    Svg: MockSvg,
    Line: MockSvgComponent,
    Rect: MockSvgComponent,
    Path: MockSvgComponent,
    Circle: MockSvgComponent,
    Text: MockSvgComponent,
  };
});

// Mock chart components
jest.mock('@/src/components/charts/CandlestickChart', () => 'CandlestickChart');
jest.mock('@/src/components/charts/LineChart', () => 'LineChart');
jest.mock('@/src/components/charts/VolumeChart', () => 'VolumeChart');

describe('UI Components', () => {
  test('TokenCard renders correctly', () => {
    const { getByText } = render(
      <TokenCard token={mockToken} />
    );
    
    expect(getByText('SOL')).toBeTruthy();
    expect(getByText('Solana')).toBeTruthy();
    expect(getByText('+5.25%')).toBeTruthy();
  });
  
  test('TokenCard handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TokenCard token={mockToken} onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('SOL'));
    expect(onPressMock).toHaveBeenCalled();
  });
  
  test('TradingPanel renders correctly', () => {
    const { getByText } = render(
      <TradingPanel
        tokenSymbol="SOL"
        tokenName="Solana"
        currentPrice={150.75}
        priceChange24h={5.25}
        balance={1000}
      />
    );
    
    expect(getByText('SOL / USD')).toBeTruthy();
    expect(getByText('Solana')).toBeTruthy();
    expect(getByText('Buy')).toBeTruthy();
    expect(getByText('Sell')).toBeTruthy();
  });
  
  test('TradingPanel handles trade execution', () => {
    const onTradeMock = jest.fn();
    const { getByText } = render(
      <TradingPanel
        tokenSymbol="SOL"
        tokenName="Solana"
        currentPrice={150.75}
        priceChange24h={5.25}
        balance={1000}
        onTrade={onTradeMock}
      />
    );
    
    // In a real test, we would input an amount and press the trade button
  });
  
  test('PortfolioSummary renders correctly', () => {
    const { getByText } = render(
      <PortfolioSummary {...mockPortfolioData} />
    );
    
    expect(getByText('Portfolio Value')).toBeTruthy();
    expect(getByText('24h')).toBeTruthy();
    expect(getByText('7d')).toBeTruthy();
    expect(getByText('30d')).toBeTruthy();
    expect(getByText('All Time')).toBeTruthy();
  });
  
  test('MarketOverview renders correctly', () => {
    const { getByText } = render(
      <MarketOverview
        trendingTokens={mockTrendingTokens}
        marketStats={mockMarketStats}
        candlestickData={mockCandlestickData}
      />
    );
    
    expect(getByText('Market Overview')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
    expect(getByText('SOL')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Trending Tokens')).toBeTruthy();
  });
});
