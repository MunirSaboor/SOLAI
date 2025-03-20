import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, useTheme, IconButton } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CandlestickChart from '@/src/components/charts/CandlestickChart';
import VolumeChart from '@/src/components/charts/VolumeChart';
import LineChart from '@/src/components/charts/LineChart';

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  weeklyChange: number;
  weeklyChangePercent: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  allTimeChange: number;
  allTimeChangePercent: number;
  portfolioHistory: { time: string; value: number }[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  dailyChange,
  dailyChangePercent,
  weeklyChange,
  weeklyChangePercent,
  monthlyChange,
  monthlyChangePercent,
  allTimeChange,
  allTimeChangePercent,
  portfolioHistory,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  
  // Format currency value
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  // Get color based on value (positive/negative)
  const getValueColor = (value: number) => {
    return value >= 0
      ? Colors[colorScheme ?? 'light'].success
      : Colors[colorScheme ?? 'light'].error;
  };
  
  return (
    <Card style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Portfolio Value</Text>
          <IconButton
            icon="dots-vertical"
            size={20}
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.valueContainer}>
          <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
          <View style={styles.changeContainer}>
            <Text
              style={[
                styles.changeValue,
                { color: getValueColor(dailyChangePercent) },
              ]}
            >
              {dailyChange >= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(dailyChange))} ({formatPercentage(dailyChangePercent)})
            </Text>
            <Text style={styles.periodLabel}>24h</Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={portfolioHistory}
            height={180}
            color={getValueColor(allTimeChangePercent)}
            showDots={false}
            title=""
          />
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>24h</Text>
            <Text
              style={[
                styles.statValue,
                { color: getValueColor(dailyChangePercent) },
              ]}
            >
              {formatPercentage(dailyChangePercent)}
            </Text>
            <Text
              style={[
                styles.statSubvalue,
                { color: getValueColor(dailyChange) },
              ]}
            >
              {formatCurrency(dailyChange)}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>7d</Text>
            <Text
              style={[
                styles.statValue,
                { color: getValueColor(weeklyChangePercent) },
              ]}
            >
              {formatPercentage(weeklyChangePercent)}
            </Text>
            <Text
              style={[
                styles.statSubvalue,
                { color: getValueColor(weeklyChange) },
              ]}
            >
              {formatCurrency(weeklyChange)}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>30d</Text>
            <Text
              style={[
                styles.statValue,
                { color: getValueColor(monthlyChangePercent) },
              ]}
            >
              {formatPercentage(monthlyChangePercent)}
            </Text>
            <Text
              style={[
                styles.statSubvalue,
                { color: getValueColor(monthlyChange) },
              ]}
            >
              {formatCurrency(monthlyChange)}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>All Time</Text>
            <Text
              style={[
                styles.statValue,
                { color: getValueColor(allTimeChangePercent) },
              ]}
            >
              {formatPercentage(allTimeChangePercent)}
            </Text>
            <Text
              style={[
                styles.statSubvalue,
                { color: getValueColor(allTimeChange) },
              ]}
            >
              {formatCurrency(allTimeChange)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueContainer: {
    marginBottom: 16,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  periodLabel: {
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.7,
  },
  chartContainer: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statSubvalue: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default PortfolioSummary;
