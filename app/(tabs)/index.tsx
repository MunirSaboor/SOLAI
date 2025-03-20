import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Divider, useTheme } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Mock data for initial development
const mockPortfolioData = {
  totalValue: 1250.75,
  change24h: 3.2,
  holdings: [
    { name: 'SOL', amount: 100, value: 750.25, change24h: 4.5 },
    { name: 'ETH', amount: 1, value: 450.50, change24h: 1.2 },
    { name: 'BTC', amount: 0.01, value: 50.00, change24h: -2.1 }
  ],
  chartData: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [1150, 1180, 1220, 1200, 1240, 1230, 1250.75],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }
};

const mockMarketData = [
  { name: 'Solana', symbol: 'SOL', price: 7.50, change24h: 4.5 },
  { name: 'Ethereum', symbol: 'ETH', price: 450.50, change24h: 1.2 },
  { name: 'Bitcoin', symbol: 'BTC', price: 5000.00, change24h: -2.1 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 8.7 }
];

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [portfolioData, setPortfolioData] = useState(mockPortfolioData);
  const [marketData, setMarketData] = useState(mockMarketData);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const screenWidth = Dimensions.get("window").width - 32; // Account for padding

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">SOLAI Dashboard</ThemedText>
        <ThemedText type="subtitle">Paper Trading Portfolio</ThemedText>
      </ThemedView>
      
      <Card style={styles.portfolioCard}>
        <Card.Content>
          <Title>Portfolio Value</Title>
          <View style={styles.portfolioValueContainer}>
            <ThemedText type="title" style={styles.portfolioValue}>
              ${portfolioData.totalValue.toFixed(2)}
            </ThemedText>
            <View style={[
              styles.changeIndicator, 
              {backgroundColor: portfolioData.change24h >= 0 ? colors.success : colors.danger}
            ]}>
              <ThemedText style={styles.changeText}>
                {portfolioData.change24h >= 0 ? '+' : ''}{portfolioData.change24h}%
              </ThemedText>
            </View>
          </View>
          
          <LineChart
            data={portfolioData.chartData}
            width={screenWidth}
            height={180}
            chartConfig={{
              backgroundColor: colors.cardBackground,
              backgroundGradientFrom: colors.cardBackground,
              backgroundGradientTo: colors.cardBackground,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => colors.primaryText,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: colors.primary
              }
            }}
            bezier
            style={styles.chart}
          />
          
          <Title style={styles.sectionTitle}>Your Holdings</Title>
          {portfolioData.holdings.map((holding, index) => (
            <View key={index}>
              <View style={styles.holdingItem}>
                <View>
                  <ThemedText type="defaultSemiBold">{holding.name}</ThemedText>
                  <ThemedText>{holding.amount} {holding.name}</ThemedText>
                </View>
                <View style={styles.holdingValue}>
                  <ThemedText type="defaultSemiBold">${holding.value.toFixed(2)}</ThemedText>
                  <ThemedText style={{
                    color: holding.change24h >= 0 ? colors.success : colors.danger
                  }}>
                    {holding.change24h >= 0 ? '+' : ''}{holding.change24h}%
                  </ThemedText>
                </View>
              </View>
              {index < portfolioData.holdings.length - 1 && <Divider />}
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" style={styles.actionButton}>View Portfolio</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.marketCard}>
        <Card.Content>
          <Title>Market Overview</Title>
          {marketData.map((coin, index) => (
            <View key={index}>
              <View style={styles.marketItem}>
                <View>
                  <ThemedText type="defaultSemiBold">{coin.name}</ThemedText>
                  <ThemedText>{coin.symbol}</ThemedText>
                </View>
                <View style={styles.marketValue}>
                  <ThemedText type="defaultSemiBold">${coin.price.toFixed(2)}</ThemedText>
                  <ThemedText style={{
                    color: coin.change24h >= 0 ? colors.success : colors.danger
                  }}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                  </ThemedText>
                </View>
              </View>
              {index < marketData.length - 1 && <Divider />}
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" style={styles.actionButton}>Trade Now</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.aiCard}>
        <Card.Content>
          <Title>AI Insights</Title>
          <Paragraph>
            Your portfolio is showing positive momentum. Consider diversifying with some altcoins to balance risk.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">Get Detailed Analysis</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    marginTop: 60,
  },
  portfolioCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  portfolioValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 8,
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  holdingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  holdingValue: {
    alignItems: 'flex-end',
  },
  marketCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  marketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  marketValue: {
    alignItems: 'flex-end',
  },
  aiCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  actionButton: {
    marginLeft: 'auto',
  }
});
