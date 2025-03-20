import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Path, Line, Circle, Text as SvgText } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface DataPoint {
  time: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  title?: string;
  color?: string;
  showDots?: boolean;
  showGrid?: boolean;
  showArea?: boolean;
  showLabels?: boolean;
  lineThickness?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 200,
  title = 'Price Chart',
  color,
  showDots = true,
  showGrid = true,
  showArea = true,
  showLabels = true,
  lineThickness = 2,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const chartColor = color || Colors[colorScheme ?? 'light'].tint;
  
  // Chart dimensions
  const chartWidth = width - 60; // Leave space for y-axis labels
  const chartHeight = height - 40; // Leave space for x-axis labels and title
  
  // Calculate min and max values for scaling
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const valueRange = maxValue - minValue;
  
  // Add some padding to the value range
  const paddedMinValue = minValue - valueRange * 0.05;
  const paddedMaxValue = maxValue + valueRange * 0.05;
  const paddedValueRange = paddedMaxValue - paddedMinValue;
  
  // Function to scale value to chart coordinates
  const scaleValue = (value: number) => {
    return chartHeight - ((value - paddedMinValue) / paddedValueRange) * chartHeight;
  };
  
  // Generate value labels for y-axis
  const valueLabels = [];
  const numLabels = 5;
  for (let i = 0; i < numLabels; i++) {
    const value = paddedMinValue + (paddedValueRange * i) / (numLabels - 1);
    valueLabels.push({
      value,
      y: scaleValue(value),
    });
  }
  
  // Generate time labels for x-axis
  const timeLabels = [];
  const numTimeLabels = Math.min(5, data.length);
  for (let i = 0; i < numTimeLabels; i++) {
    const index = Math.floor((i * (data.length - 1)) / (numTimeLabels - 1));
    timeLabels.push({
      time: data[index].time,
      x: 60 + (index / (data.length - 1)) * chartWidth,
    });
  }
  
  // Generate path for line
  let linePath = '';
  let areaPath = '';
  
  data.forEach((point, index) => {
    const x = 60 + (index / (data.length - 1)) * chartWidth;
    const y = scaleValue(point.value);
    
    if (index === 0) {
      linePath += `M ${x} ${y}`;
      areaPath += `M ${x} ${chartHeight} L ${x} ${y}`;
    } else {
      linePath += ` L ${x} ${y}`;
      areaPath += ` L ${x} ${y}`;
    }
  });
  
  // Complete area path
  if (data.length > 0) {
    const lastX = 60 + chartWidth;
    areaPath += ` L ${lastX} ${chartHeight} Z`;
  }
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          {/* Grid lines */}
          {showGrid &&
            valueLabels.map((label, index) => (
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
          
          {/* Y-axis value labels */}
          {showLabels &&
            valueLabels.map((label, index) => (
              <SvgText
                key={`label-${index}`}
                x={5}
                y={label.y + 4}
                fontSize={10}
                fill={Colors[colorScheme ?? 'light'].text}
              >
                {label.value.toFixed(2)}
              </SvgText>
            ))}
          
          {/* X-axis time labels */}
          {showLabels &&
            timeLabels.map((label, index) => (
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
          
          {/* Area under the line */}
          {showArea && (
            <Path
              d={areaPath}
              fill={chartColor}
              fillOpacity={0.1}
            />
          )}
          
          {/* Line */}
          <Path
            d={linePath}
            stroke={chartColor}
            strokeWidth={lineThickness}
            fill="none"
          />
          
          {/* Dots */}
          {showDots &&
            data.map((point, index) => {
              const x = 60 + (index / (data.length - 1)) * chartWidth;
              const y = scaleValue(point.value);
              
              return (
                <Circle
                  key={`dot-${index}`}
                  cx={x}
                  cy={y}
                  r={3}
                  fill={chartColor}
                />
              );
            })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  chartContainer: {
    backgroundColor: 'transparent',
  },
});

export default LineChart;
