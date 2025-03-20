import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Divider, Chip, useTheme } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

// Mock data for initial development
const mockCryptoData = {
  name: 'Solana',
  symbol: 'SOL',
  price: 7.50,
  change24h: 4.5,
  high24h: 7.85,
  low24h: 7.15,
  volume24h: '1.2M',
  marketCap: '3.2B',
};

const mockTrendingCoins = [
  { name: 'Solana', symbol: 'SOL', change24h: 4.5 },
  { name: 'Ethereum', symbol: 'ETH', change24h: 1.2 },
  { name: 'Bitcoin', symbol: 'BTC', change24h: -2.1 },
  { name: 'Dogecoin', symbol: 'DOGE', change24h: 8.7 },
  { name: 'Cardano', symbol: 'ADA', change24h: -1.5 },
];

export default function TradeScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const theme = useTheme();
  
  const [selectedCrypto, setSelectedCrypto] = useState(mockCryptoData);
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  
  const handleAmountChange = (text) => {
    setAmount(text);
    const numAmount = parseFloat(text) || 0;
    setEstimatedTotal(numAmount * selectedCrypto.price);
  };
  
  const handleTrade = () => {
    // In a real app, this would execute the trade
    alert(`${tradeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${selectedCrypto.symbol} for $${estimatedTotal.toFixed(2)}`);
    setAmount('');
    setEstimatedTotal(0);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Trade</ThemedText>
        <ThemedText type="subtitle">Paper Trading - Zero Risk</ThemedText>
      </ThemedView>
      
      <Card style={styles.cryptoCard}>
        <Card.Content>
          <View style={styles.cryptoHeader}>
            <View>
              <Title>{selectedCrypto.name}</Title>
              <ThemedText>{selectedCrypto.symbol}</ThemedText>
            </View>
            <View style={styles.priceContainer}>
              <ThemedText type="title2">${selectedCrypto.price.toFixed(2)}</ThemedText>
              <ThemedText style={{
                color: selectedCrypto.change24h >= 0 ? colors.success : colors.danger
              }}>
                {selectedCrypto.change24h >= 0 ? '+' : ''}{selectedCrypto.change24h}%
              </ThemedText>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>24h High</ThemedText>
              <ThemedText type="defaultSemiBold">${selectedCrypto.high24h}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>24h Low</ThemedText>
              <ThemedText type="defaultSemiBold">${selectedCrypto.low24h}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Volume</ThemedText>
              <ThemedText type="defaultSemiBold">{selectedCrypto.volume24h}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Market Cap</ThemedText>
              <ThemedText type="defaultSemiBold">{selectedCrypto.marketCap}</ThemedText>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.tradeCard}>
        <Card.Content>
          <Title>Trade {selectedCrypto.symbol}</Title>
          
          <View style={styles.tradeTypeContainer}>
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'buy' && { backgroundColor: colors.success + '20' },
                { borderColor: colors.success }
              ]}
              onPress={() => setTradeType('buy')}
            >
              <ThemedText style={[
                styles.tradeTypeText,
                tradeType === 'buy' && { color: colors.success }
              ]}>Buy</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'sell' && { backgroundColor: colors.danger + '20' },
                { borderColor: colors.danger }
              ]}
              onPress={() => setTradeType('sell')}
            >
              <ThemedText style={[
                styles.tradeTypeText,
                tradeType === 'sell' && { color: colors.danger }
              ]}>Sell</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Amount ({selectedCrypto.symbol})</ThemedText>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              placeholder={`Enter ${selectedCrypto.symbol} amount`}
              mode="outlined"
            />
          </View>
          
          <View style={styles.totalContainer}>
            <ThemedText style={styles.totalLabel}>Estimated Total:</ThemedText>
            <ThemedText type="title2">${estimatedTotal.toFixed(2)}</ThemedText>
          </View>
          
          <View style={styles.feeContainer}>
            <ThemedText style={styles.feeText}>Trading Fee (0.1%): ${(estimatedTotal * 0.001).toFixed(2)}</ThemedText>
            <ThemedText style={styles.feeText}>Slippage (0.5%): ${(estimatedTotal * 0.005).toFixed(2)}</ThemedText>
          </View>
          
          <Button 
            mode="contained" 
            style={[
              styles.tradeButton,
              { backgroundColor: tradeType === 'buy' ? colors.success : colors.danger }
            ]}
            onPress={handleTrade}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCrypto.symbol}
          </Button>
        </Card.Content>
      </Card>
      
      <Card style={styles.trendingCard}>
        <Card.Content>
          <Title>Trending Coins</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
            {mockTrendingCoins.map((coin, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.trendingItem}
                onPress={() => {
                  setSelectedCrypto({
                    ...mockCryptoData,
                    name: coin.name,
                    symbol: coin.symbol,
                    change24h: coin.change24h
                  });
                }}
              >
                <ThemedText type="defaultSemiBold">{coin.symbol}</ThemedText>
                <ThemedText style={{
                  color: coin.change24h >= 0 ? colors.success : colors.danger
                }}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
      
      <Card style={styles.aiCard}>
        <Card.Content>
          <Title>AI Trading Insights</Title>
          <Paragraph>
            SOL is showing strong momentum with increasing volume. Consider a small position with a stop loss at $7.00.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">Get More Insights</Button>
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
  cryptoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cryptoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  divider: {
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    marginBottom: 12,
  },
  statLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  tradeCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  tradeTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  tradeTypeButton: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  tradeTypeText: {
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: '500',
  },
  feeContainer: {
    marginBottom: 16,
  },
  feeText: {
    fontSize: 12,
    opacity: 0.7,
  },
  tradeButton: {
    paddingVertical: 8,
  },
  trendingCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  trendingScroll: {
    marginTop: 12,
  },
  trendingItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  aiCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
});
