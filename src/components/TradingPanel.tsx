import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Divider, TextInput, useTheme } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface TradingPanelProps {
  tokenSymbol: string;
  tokenName: string;
  currentPrice: number;
  priceChange24h: number;
  balance: number;
  onTrade?: (amount: number, isBuy: boolean) => void;
}

const TradingPanel: React.FC<TradingPanelProps> = ({
  tokenSymbol,
  tokenName,
  currentPrice,
  priceChange24h,
  balance,
  onTrade,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  
  // Calculate total based on amount and current price
  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    return amountNum * currentPrice;
  };
  
  // Calculate fee based on total
  const calculateFee = () => {
    return calculateTotal() * 0.001; // 0.1% fee
  };
  
  // Calculate slippage amount
  const calculateSlippage = () => {
    const slippagePercent = parseFloat(slippage) || 0;
    return calculateTotal() * (slippagePercent / 100);
  };
  
  // Calculate final amount including fees and slippage
  const calculateFinalAmount = () => {
    if (activeTab === 'buy') {
      return calculateTotal() + calculateFee() + calculateSlippage();
    } else {
      return calculateTotal() - calculateFee() - calculateSlippage();
    }
  };
  
  // Format price with appropriate precision
  const formatPrice = (price: number) => {
    if (price < 0.0001) {
      return price.toExponential(2);
    } else if (price < 0.01) {
      return price.toFixed(6);
    } else if (price < 1) {
      return price.toFixed(4);
    } else if (price < 1000) {
      return price.toFixed(2);
    } else {
      return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
  };
  
  // Handle trade execution
  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    if (onTrade) {
      onTrade(parseFloat(amount), activeTab === 'buy');
    }
  };
  
  // Set amount to a percentage of balance
  const setAmountPercentage = (percentage: number) => {
    if (activeTab === 'buy') {
      const maxAmount = balance / currentPrice;
      setAmount((maxAmount * percentage).toFixed(6));
    } else {
      // For sell, percentage of token balance
      setAmount((balance * percentage).toFixed(6));
    }
  };
  
  return (
    <Card style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
      <Card.Title
        title={`${tokenSymbol} / USD`}
        subtitle={tokenName}
        right={(props) => (
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${formatPrice(currentPrice)}</Text>
            <Text
              style={[
                styles.priceChange,
                { color: priceChange24h >= 0 ? Colors[colorScheme ?? 'light'].success : Colors[colorScheme ?? 'light'].error },
              ]}
            >
              {priceChange24h >= 0 ? '+' : ''}
              {priceChange24h.toFixed(2)}%
            </Text>
          </View>
        )}
      />
      
      <Card.Content>
        <View style={styles.tabContainer}>
          <Button
            mode={activeTab === 'buy' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('buy')}
            style={[
              styles.tabButton,
              activeTab === 'buy' && { backgroundColor: Colors[colorScheme ?? 'light'].success },
            ]}
            labelStyle={activeTab === 'buy' ? styles.activeTabLabel : {}}
          >
            Buy
          </Button>
          <Button
            mode={activeTab === 'sell' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('sell')}
            style={[
              styles.tabButton,
              activeTab === 'sell' && { backgroundColor: Colors[colorScheme ?? 'light'].error },
            ]}
            labelStyle={activeTab === 'sell' ? styles.activeTabLabel : {}}
          >
            Sell
          </Button>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>
            {activeTab === 'buy' ? 'Available USD:' : `Available ${tokenSymbol}:`}
          </Text>
          <Text style={styles.balanceValue}>
            {activeTab === 'buy' ? `$${balance.toFixed(2)}` : balance.toFixed(6)}
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            label={activeTab === 'buy' ? `Amount to buy (${tokenSymbol})` : `Amount to sell (${tokenSymbol})`}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            right={<TextInput.Affix text={tokenSymbol} />}
          />
          
          <View style={styles.percentageButtons}>
            <Button compact onPress={() => setAmountPercentage(0.25)} style={styles.percentButton}>
              25%
            </Button>
            <Button compact onPress={() => setAmountPercentage(0.5)} style={styles.percentButton}>
              50%
            </Button>
            <Button compact onPress={() => setAmountPercentage(0.75)} style={styles.percentButton}>
              75%
            </Button>
            <Button compact onPress={() => setAmountPercentage(1)} style={styles.percentButton}>
              100%
            </Button>
          </View>
        </View>
        
        <View style={styles.slippageContainer}>
          <Text style={styles.slippageLabel}>Slippage Tolerance:</Text>
          <View style={styles.slippageButtons}>
            <Button
              compact
              mode={slippage === '0.5' ? 'contained' : 'outlined'}
              onPress={() => setSlippage('0.5')}
              style={styles.slippageButton}
            >
              0.5%
            </Button>
            <Button
              compact
              mode={slippage === '1.0' ? 'contained' : 'outlined'}
              onPress={() => setSlippage('1.0')}
              style={styles.slippageButton}
            >
              1.0%
            </Button>
            <Button
              compact
              mode={slippage === '2.0' ? 'contained' : 'outlined'}
              onPress={() => setSlippage('2.0')}
              style={styles.slippageButton}
            >
              2.0%
            </Button>
            <TextInput
              label="Custom"
              value={slippage}
              onChangeText={setSlippage}
              keyboardType="numeric"
              style={styles.slippageInput}
              mode="outlined"
              dense
              right={<TextInput.Affix text="%" />}
            />
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price:</Text>
            <Text style={styles.summaryValue}>${formatPrice(currentPrice)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={styles.summaryValue}>${formatPrice(calculateTotal())}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fee (0.1%):</Text>
            <Text style={styles.summaryValue}>${formatPrice(calculateFee())}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Slippage ({slippage}%):</Text>
            <Text style={styles.summaryValue}>${formatPrice(calculateSlippage())}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>You will {activeTab === 'buy' ? 'pay' : 'receive'}:</Text>
            <Text style={styles.totalValue}>${formatPrice(calculateFinalAmount())}</Text>
          </View>
        </View>
        
        <Button
          mode="contained"
          onPress={handleTrade}
          style={[
            styles.tradeButton,
            {
              backgroundColor:
                activeTab === 'buy'
                  ? Colors[colorScheme ?? 'light'].success
                  : Colors[colorScheme ?? 'light'].error,
            },
          ]}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {activeTab === 'buy' ? 'Buy' : 'Sell'} {tokenSymbol}
        </Button>
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
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  activeTabLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  percentageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentButton: {
    marginHorizontal: 2,
  },
  slippageContainer: {
    marginBottom: 16,
  },
  slippageLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  slippageButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slippageButton: {
    marginRight: 8,
  },
  slippageInput: {
    flex: 1,
    height: 40,
  },
  divider: {
    marginVertical: 16,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tradeButton: {
    paddingVertical: 8,
  },
});

export default TradingPanel;
