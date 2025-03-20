import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface VolumeBarData {
  time: string;
  volume: number;
  isUp: boolean;
}

interface VolumeChartProps {
  data: VolumeBarData[];
  width?: number;
  height?: number;
  title?: string;
}

const VolumeChart: React.FC<VolumeChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 120,
  title = 'Volume',
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  
  // Chart dimensions
  const chartWidth = width - 60; // Leave space for y-axis labels
  const chartHeight = height - 40; // Leave space for x-axis labels and title
  const barWidth = Math.max(chartWidth / data.length - 2, 2);
  const spacing = 2;
  
  // Calculate max volume for scaling
  const maxVolume = Math.max(...data.map(d => d.volume));
  
  // Function to scale volume to chart coordinates
  const scaleVolume = (volume: number) => {
    return chartHeight - (volume / maxVolume) * chartHeight;
  };
  
  // Generate volume labels for y-axis
  const volumeLabels = [];
  const numLabels = 3;
  for (let i = 0; i < numLabels; i++) {
    const volume = (maxVolume * i) / (numLabels - 1);
    volumeLabels.push({
      volume,
      y: scaleVolume(volume),
    });
  }
  
  // Generate time labels for x-axis
  const timeLabels = [];
  const numTimeLabels = Math.min(5, data.length);
  for (let i = 0; i < numTimeLabels; i++) {
    const index = Math.floor((i * (data.length - 1)) / (numTimeLabels - 1));
    timeLabels.push({
      time: data[index].time,
      x: 60 + index * (barWidth + spacing),
    });
  }
  
  // Format volume for display
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    } else {
      return volume.toString();
    }
  };
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          {/* Y-axis volume labels */}
          {volumeLabels.map((label, index) => (
            <SvgText
              key={`label-${index}`}
              x={5}
              y={label.y + 4}
              fontSize={10}
              fill={Colors[colorScheme ?? 'light'].text}
            >
              {formatVolume(label.volume)}
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
          
          {/* Volume bars */}
          {data.map((bar, index) => {
            const x = 60 + index * (barWidth + spacing);
            const y = scaleVolume(bar.volume);
            const barHeight = chartHeight - y;
            
            return (
              <Rect
                key={`bar-${index}`}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={bar.isUp ? Colors[colorScheme ?? 'light'].success : Colors[colorScheme ?? 'light'].error}
                opacity={0.7}
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
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  chartContainer: {
    backgroundColor: 'transparent',
  },
});

export default VolumeChart;
