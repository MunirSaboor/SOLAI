import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define types for our candlestick data
interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
  width?: number;
  height?: number;
  title?: string;
  timeframe?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 300,
  title = 'Price Chart',
  timeframe = '1h',
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  
  // Chart dimensions
  const chartWidth = width - 60; // Leave space for y-axis labels
  const chartHeight = height - 60; // Leave space for x-axis labels and title
  const candleWidth = Math.max(chartWidth / data.length - 2, 2);
  const spacing = 2;
  
  // Calculate min and max values for scaling
  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));
  const priceRange = maxPrice - minPrice;
  
  // Add some padding to the price range
  const paddedMinPrice = minPrice - priceRange * 0.05;
  const paddedMaxPrice = maxPrice + priceRange * 0.05;
  const paddedPriceRange = paddedMaxPrice - paddedMinPrice;
  
  // Function to scale price to chart coordinates
  const scalePrice = (price: number) => {
    return chartHeight - ((price - paddedMinPrice) / paddedPriceRange) * chartHeight;
  };
  
  // Generate price labels for y-axis
  const priceLabels = [];
  const numLabels = 5;
  for (let i = 0; i < numLabels; i++) {
    const price = paddedMinPrice + (paddedPriceRange * i) / (numLabels - 1);
    priceLabels.push({
      price,
      y: scalePrice(price),
    });
  }
  
  // Generate time labels for x-axis
  const timeLabels = [];
  const numTimeLabels = Math.min(5, data.length);
  for (let i = 0; i < numTimeLabels; i++) {
    const index = Math.floor((i * (data.length - 1)) / (numTimeLabels - 1));
    timeLabels.push({
      time: data[index].time,
      x: 60 + index * (candleWidth + spacing),
    });
  }
  
  // Timeframe options
  const timeframes = ['5m', '15m', '1h', '4h', '1d'];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.timeframeSelector}>
          {timeframes.map((tf) => (
            <Text
              key={tf}
              style={[
                styles.timeframeOption,
                {
                  color:
                    selectedTimeframe === tf
                      ? Colors[colorScheme ?? 'light'].tint
                      : Colors[colorScheme ?? 'light'].text,
                  fontWeight: selectedTimeframe === tf ? 'bold' : 'normal',
                },
              ]}
              onPress={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </Text>
          ))}
        </View>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <Svg width={width} height={height}>
            {/* Grid lines */}
            {priceLabels.map((label, index) => (
              <Line
                key={`grid-${index}`}
                x1={60}
                y1={label.y}
                x2={width}
                y2={label.y}
                stroke={Colors[colorScheme ?? 'light'].border}
                strokeWidth={0.5}
                strokeDasharray="5,5"
              />
            ))}
            
            {/* Y-axis price labels */}
            {priceLabels.map((label, index) => (
              <SvgText
                key={`label-${index}`}
                x={5}
                y={label.y + 4}
                fontSize={10}
                fill={Colors[colorScheme ?? 'light'].text}
              >
                {label.price.toFixed(2)}
              </SvgText>
            ))}
            
            {/* X-axis time labels */}
            {timeLabels.map((label, index) => (
              <SvgText
                key={`time-${index}`}
                x={label.x}
                y={height - 10}
                fontSize={10}
                textAnchor="middle"
                fill={Colors[colorScheme ?? 'light'].text}
              >
                {label.time}
              </SvgText>
            ))}
            
            {/* Candlesticks */}
            {data.map((candle, index) => {
              const x = 60 + index * (candleWidth + spacing);
              const open = scalePrice(candle.open);
              const close = scalePrice(candle.close);
              const high = scalePrice(candle.high);
              const low = scalePrice(candle.low);
              const isUp = candle.close >= candle.open;
              const candleColor = isUp
                ? Colors[colorScheme ?? 'light'].success
                : Colors[colorScheme ?? 'light'].error;
              
              return (
                <React.Fragment key={`candle-${index}`}>
                  {/* Wick */}
                  <Line
                    x1={x + candleWidth / 2}
                    y1={high}
                    x2={x + candleWidth / 2}
                    y2={low}
                    stroke={candleColor}
                    strokeWidth={1}
                  />
                  
                  {/* Body */}
                  <Rect
                    x={x}
                    y={isUp ? close : open}
                    width={candleWidth}
                    height={Math.max(Math.abs(open - close), 1)}
                    fill={candleColor}
                  />
                </React.Fragment>
              );
            })}
          </Svg>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeframeSelector: {
    flexDirection: 'row',
  },
  timeframeOption: {
    marginLeft: 8,
    fontSize: 12,
  },
  chartContainer: {
    backgroundColor: 'transparent',
  },
});

export default CandlestickChart;
