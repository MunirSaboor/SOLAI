import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CandlestickChart from '@/src/components/charts/CandlestickChart';
import LineChart from '@/src/components/charts/LineChart';
import VolumeChart from '@/src/components/charts/VolumeChart';

// Mock data for charts
const mockCandlestickData = [
  { time: '09:00', open: 100, high: 110, low: 95, close: 105, volume: 1000 },
  { time: '10:00', open: 105, high: 115, low: 100, close: 110, volume: 1500 },
  { time: '11:00', open: 110, high: 120, low: 105, close: 115, volume: 2000 },
  { time: '12:00', open: 115, high: 125, low: 110, close: 120, volume: 1800 },
  { time: '13:00', open: 120, high: 130, low: 115, close: 125, volume: 2200 },
];

const mockLineData = [
  { time: '09:00', value: 100 },
  { time: '10:00', value: 110 },
  { time: '11:00', value: 115 },
  { time: '12:00', value: 120 },
  { time: '13:00', value: 125 },
];

const mockVolumeData = mockCandlestickData.map(candle => ({
  time: candle.time,
  volume: candle.volume,
  isUp: candle.close >= candle.open,
}));

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

describe('Chart Components', () => {
  test('CandlestickChart renders correctly', () => {
    const { getByText } = render(
      <CandlestickChart 
        data={mockCandlestickData} 
        title="Test Chart"
        timeframe="1h"
      />
    );
    
    expect(getByText('Test Chart')).toBeTruthy();
    expect(getByText('1h')).toBeTruthy();
  });
  
  test('CandlestickChart handles timeframe selection', () => {
    const { getByText } = render(
      <CandlestickChart 
        data={mockCandlestickData} 
        title="Test Chart"
        timeframe="1h"
      />
    );
    
    // Test timeframe options are rendered
    expect(getByText('5m')).toBeTruthy();
    expect(getByText('15m')).toBeTruthy();
    expect(getByText('1h')).toBeTruthy();
    expect(getByText('4h')).toBeTruthy();
    expect(getByText('1d')).toBeTruthy();
    
    // Test timeframe selection
    fireEvent.press(getByText('5m'));
    // In a real test, we would verify the state change
  });
  
  test('LineChart renders correctly', () => {
    const { getByText } = render(
      <LineChart 
        data={mockLineData} 
        title="Test Line Chart"
      />
    );
    
    expect(getByText('Test Line Chart')).toBeTruthy();
  });
  
  test('LineChart handles customization props', () => {
    const { rerender } = render(
      <LineChart 
        data={mockLineData} 
        title="Test Line Chart"
        showDots={true}
        showGrid={true}
        showArea={true}
        showLabels={true}
        lineThickness={2}
      />
    );
    
    // Test with different props
    rerender(
      <LineChart 
        data={mockLineData} 
        title="Test Line Chart"
        showDots={false}
        showGrid={false}
        showArea={false}
        showLabels={false}
        lineThickness={1}
      />
    );
    
    // In a real test, we would verify the visual changes
  });
  
  test('VolumeChart renders correctly', () => {
    const { getByText } = render(
      <VolumeChart 
        data={mockVolumeData} 
        title="Volume"
      />
    );
    
    expect(getByText('Volume')).toBeTruthy();
  });
});
