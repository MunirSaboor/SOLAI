import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Chip, useTheme, IconButton } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CandlestickChart from '@/src/components/charts/CandlestickChart';
import VolumeChart from '@/src/components/charts/VolumeChart';

interface MarketOverviewProps {
  trendingTokens: Array<{
    symbol: string;
    name: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    platform: 'pump.fun' | 'moonshot' | 'raydium';
  }>;
  marketStats: {
    totalMarketCap: number;
    totalVolume24h: number;
    solPrice: number;
    solChange24h: number;
    btcPrice: number;
    btcChange24h: number;
    ethPrice: number;
    ethChange24h: number;
  };
  candlestickData: Array<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({
  trendingTokens,
  marketStats,
  candlestickData,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [selectedToken, setSelectedToken] = useState('SOL');
  
  // Format currency value
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  // Format large numbers (billions, millions)
  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
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
  
  // Get platform color
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'pump.fun':
        return '#FF6B6B';
      case 'moonshot':
        return '#4ECDC4';
      case 'raydium':
        return '#9D50BB';
      default:
        return Colors[colorScheme ?? 'light'].text;
    }
  };
  
  // Filter volume data from candlestick data
  const volumeData = candlestickData.map(candle => ({
    time: candle.time,
    volume: candle.volume,
    isUp: candle.close >= candle.open,
  }));
  
  return (
    <Card style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Market Overview</Text>
          <IconButton
            icon="refresh"
            size={20}
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.marketStatsContainer}>
          <View style={styles.marketStatItem}>
            <Text style={styles.marketStatLabel}>Market Cap</Text>
            <Text style={styles.marketStatValue}>
              {formatLargeNumber(marketStats.totalMarketCap)}
            </Text>
          </View>
          
          <View style={styles.marketStatItem}>
            <Text style={styles.marketStatLabel}>24h Volume</Text>
            <Text style={styles.marketStatValue}>
              {formatLargeNumber(marketStats.totalVolume24h)}
            </Text>
          </View>
          
          <View style={styles.marketStatItem}>
            <Text style={styles.marketStatLabel}>SOL</Text>
            <Text style={styles.marketStatValue}>
              ${marketStats.solPrice.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.marketStatChange,
                { color: getValueColor(marketStats.solChange24h) },
              ]}
            >
              {formatPercentage(marketStats.solChange24h)}
            </Text>
          </View>
          
          <View style={styles.marketStatItem}>
            <Text style={styles.marketStatLabel}>BTC</Text>
            <Text style={styles.marketStatValue}>
              ${marketStats.btcPrice.toFixed(0)}
            </Text>
            <Text
              style={[
                styles.marketStatChange,
                { color: getValueColor(marketStats.btcChange24h) },
              ]}
            >
              {formatPercentage(marketStats.btcChange24h)}
            </Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tokenSelector}>
            <Chip
              selected={selectedToken === 'SOL'}
              onPress={() => setSelectedToken('SOL')}
              style={styles.tokenChip}
              selectedColor={Colors[colorScheme ?? 'light'].tint}
            >
              SOL
            </Chip>
            <Chip
              selected={selectedToken === 'BTC'}
              onPress={() => setSelectedToken('BTC')}
              style={styles.tokenChip}
              selectedColor={Colors[colorScheme ?? 'light'].tint}
            >
              BTC
            </Chip>
            <Chip
              selected={selectedToken === 'ETH'}
              onPress={() => setSelectedToken('ETH')}
              style={styles.tokenChip}
              selectedColor={Colors[colorScheme ?? 'light'].tint}
            >
              ETH
            </Chip>
            {trendingTokens.slice(0, 5).map(token => (
              <Chip
                key={token.symbol}
                selected={selectedToken === token.symbol}
                onPress={() => setSelectedToken(token.symbol)}
                style={styles.tokenChip}
                selectedColor={getPlatformColor(token.platform)}
              >
                {token.symbol}
              </Chip>
            ))}
          </ScrollView>
          
          <CandlestickChart
            data={candlestickData}
            height={250}
            title={`${selectedToken}/USD`}
            timeframe="1h"
          />
          
          <VolumeChart
            data={volumeData}
            height={100}
          />
        </View>
        
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingTitle}>Trending Tokens</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingTokens.map(token => (
              <Card
                key={token.symbol}
                style={[
                  styles.trendingCard,
                  { backgroundColor: Colors[colorScheme ?? 'light'].background },
                ]}
                onPress={() => setSelectedToken(token.symbol)}
              >
                <Card.Content style={styles.trendingCardContent}>
                  <View style={styles.trendingTokenHeader}>
                    <View
                      style={[
                        styles.platformIndicator,
                        { backgroundColor: getPlatformColor(token.platform) },
                      ]}
                    />
                    <Text style={styles.trendingTokenSymbol}>{token.symbol}</Text>
                  </View>
                  
                  <Text style={styles.trendingTokenPrice}>
                    ${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}
                  </Text>
                  
                  <Text
                    style={[
                      styles.trendingTokenChange,
                      { color: getValueColor(token.priceChange24h) },
                    ]}
                  >
                    {formatPercentage(token.priceChange24h)}
                  </Text>
                  
                  <Text style={styles.trendingTokenVolume}>
                    Vol: {formatLargeNumber(token.volume24h)}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  marketStatItem: {
    minWidth: '22%',
    marginBottom: 8,
  },
  marketStatLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  marketStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketStatChange: {
    fontSize: 12,
  },
  chartContainer: {
    marginBottom: 16,
  },
  tokenSelector: {
    marginBottom: 8,
  },
  tokenChip: {
    marginRight: 8,
  },
  trendingContainer: {
    marginTop: 8,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  trendingCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 8,
  },
  trendingCardContent: {
    padding: 8,
  },
  trendingTokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  platformIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  trendingTokenSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  trendingTokenPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  trendingTokenChange: {
    fontSize: 12,
    marginBottom: 2,
  },
  trendingTokenVolume: {
    fontSize: 10,
    opacity: 0.7,
  },
});

export default MarketOverview;
