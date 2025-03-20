import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
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
  totalProfit: 125.25,
  profitPercentage: 11.1,
  holdings: [
    { name: 'SOL', amount: 100, value: 750.25, change24h: 4.5, profit: 75.25, profitPercentage: 11.1 },
    { name: 'ETH', amount: 1, value: 450.50, change24h: 1.2, profit: 50.50, profitPercentage: 12.6 },
    { name: 'BTC', amount: 0.01, value: 50.00, change24h: -2.1, profit: -0.50, profitPercentage: -1.0 }
  ],
  transactions: [
    { type: 'buy', coin: 'SOL', amount: 50, price: 6.75, total: 337.50, date: '2025-03-15' },
    { type: 'buy', coin: 'ETH', amount: 0.5, price: 400.00, total: 200.00, date: '2025-03-14' },
    { type: 'sell', coin: 'BTC', amount: 0.005, price: 5100.00, total: 25.50, date: '2025-03-12' },
    { type: 'buy', coin: 'SOL', amount: 50, price: 6.75, total: 337.50, date: '2025-03-10' },
    { type: 'buy', coin: 'ETH', amount: 0.5, price: 400.00, total: 200.00, date: '2025-03-08' },
  ],
  chartData: {
    labels: ["1W", "2W", "3W", "1M", "2M", "3M"],
    datasets: [
      {
        data: [1100, 1150, 1180, 1220, 1200, 1250.75],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }
};

export default function PortfolioScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const theme = useTheme();
  
  const [activeTab, setActiveTab] = useState('holdings');
  const screenWidth = Dimensions.get("window").width - 32; // Account for padding

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Portfolio</ThemedText>
        <ThemedText type="subtitle">Track your paper trading performance</ThemedText>
      </ThemedView>
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.portfolioValueContainer}>
            <View>
              <ThemedText style={styles.valueLabel}>Total Value</ThemedText>
              <ThemedText type="title" style={styles.portfolioValue}>
                ${mockPortfolioData.totalValue.toFixed(2)}
              </ThemedText>
            </View>
            <View>
              <ThemedText style={styles.valueLabel}>Total Profit/Loss</ThemedText>
              <View style={styles.profitContainer}>
                <ThemedText type="title2" style={{
                  color: mockPortfolioData.totalProfit >= 0 ? colors.success : colors.danger
                }}>
                  ${mockPortfolioData.totalProfit.toFixed(2)}
                </ThemedText>
                <View style={[
                  styles.changeIndicator, 
                  {backgroundColor: mockPortfolioData.profitPercentage >= 0 ? colors.success : colors.danger}
                ]}>
                  <ThemedText style={styles.changeText}>
                    {mockPortfolioData.profitPercentage >= 0 ? '+' : ''}{mockPortfolioData.profitPercentage.toFixed(1)}%
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          
          <LineChart
            data={mockPortfolioData.chartData}
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
        </Card.Content>
      </Card>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'holdings' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('holdings')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'holdings' && styles.activeTabText
          ]}>Holdings</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'transactions' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('transactions')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'transactions' && styles.activeTabText
          ]}>Transactions</ThemedText>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'holdings' ? (
        <Card style={styles.contentCard}>
          <Card.Content>
            <Title>Your Holdings</Title>
            {mockPortfolioData.holdings.map((holding, index) => (
              <View key={index}>
                <View style={styles.holdingItem}>
                  <View>
                    <ThemedText type="defaultSemiBold">{holding.name}</ThemedText>
                    <ThemedText>{holding.amount} {holding.name}</ThemedText>
                  </View>
                  <View style={styles.holdingValue}>
                    <ThemedText type="defaultSemiBold">${holding.value.toFixed(2)}</ThemedText>
                    <View style={styles.profitRow}>
                      <ThemedText style={{
                        color: holding.profit >= 0 ? colors.success : colors.danger,
                        marginRight: 4
                      }}>
                        ${holding.profit.toFixed(2)}
                      </ThemedText>
                      <ThemedText style={{
                        color: holding.profitPercentage >= 0 ? colors.success : colors.danger
                      }}>
                        ({holding.profitPercentage >= 0 ? '+' : ''}{holding.profitPercentage.toFixed(1)}%)
                      </ThemedText>
                    </View>
                  </View>
                </View>
                {index < mockPortfolioData.holdings.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.actionButton}>Trade</Button>
          </Card.Actions>
        </Card>
      ) : (
        <Card style={styles.contentCard}>
          <Card.Content>
            <Title>Recent Transactions</Title>
            {mockPortfolioData.transactions.map((transaction, index) => (
              <View key={index}>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionDetails}>
                    <View style={[
                      styles.transactionType,
                      {backgroundColor: transaction.type === 'buy' ? colors.success + '20' : colors.danger + '20'}
                    ]}>
                      <ThemedText style={{
                        color: transaction.type === 'buy' ? colors.success : colors.danger,
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {transaction.type}
                      </ThemedText>
                    </View>
                    <View>
                      <ThemedText type="defaultSemiBold">{transaction.coin}</ThemedText>
                      <ThemedText>{transaction.date}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.transactionValue}>
                    <ThemedText type="defaultSemiBold">
                      {transaction.type === 'buy' ? '-' : '+'} ${transaction.total.toFixed(2)}
                    </ThemedText>
                    <ThemedText>
                      {transaction.amount} {transaction.coin} @ ${transaction.price.toFixed(2)}
                    </ThemedText>
                  </View>
                </View>
                {index < mockPortfolioData.transactions.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" style={styles.actionButton}>Export History</Button>
          </Card.Actions>
        </Card>
      )}
      
      <Card style={styles.aiCard}>
        <Card.Content>
          <Title>AI Portfolio Analysis</Title>
          <Paragraph>
            Your portfolio is well-balanced with 60% in SOL, 36% in ETH, and 4% in BTC. 
            Consider taking some profits on SOL as it's up 11.1% since purchase.
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
  summaryCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  portfolioValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  valueLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  portfolioValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  changeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  contentCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  holdingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  holdingValue: {
    alignItems: 'flex-end',
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  transactionValue: {
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
