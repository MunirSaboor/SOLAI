import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme, IconButton } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface TokenData {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap?: number;
  logo?: string;
  platform: 'pump.fun' | 'moonshot' | 'raydium';
}

interface TokenCardProps {
  token: TokenData;
  onPress?: () => void;
  showDetails?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  onPress,
  showDetails = true,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  
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
  
  // Format volume and market cap
  const formatLargeNumber = (num?: number) => {
    if (!num) return 'N/A';
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
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
  
  // Get price change color
  const getPriceChangeColor = (change: number) => {
    return change >= 0
      ? Colors[colorScheme ?? 'light'].success
      : Colors[colorScheme ?? 'light'].error;
  };
  
  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground },
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View style={styles.tokenInfo}>
          <View style={styles.logoContainer}>
            {token.logo ? (
              <Image
                source={{ uri: token.logo }}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View
                style={[
                  styles.logoPlaceholder,
                  { backgroundColor: getPlatformColor(token.platform) },
                ]}
              >
                <Text style={styles.logoText}>{token.symbol.charAt(0)}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.symbol}>{token.symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {token.name}
            </Text>
            <View style={styles.platformContainer}>
              <View
                style={[
                  styles.platformBadge,
                  { backgroundColor: getPlatformColor(token.platform) },
                ]}
              >
                <Text style={styles.platformText}>{token.platform}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.priceInfo}>
          <Text style={styles.price}>${formatPrice(token.price)}</Text>
          <Text
            style={[
              styles.priceChange,
              { color: getPriceChangeColor(token.priceChange24h) },
            ]}
          >
            {token.priceChange24h >= 0 ? '+' : ''}
            {token.priceChange24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      
      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>24h Volume</Text>
            <Text style={styles.detailValue}>
              {formatLargeNumber(token.volume24h)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Market Cap</Text>
            <Text style={styles.detailValue}>
              {formatLargeNumber(token.marketCap)}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.tradeButton}>
            <Text style={styles.tradeButtonText}>Trade</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    opacity: 0.7,
  },
  platformContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  platformBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  platformText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tradeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TokenCard;
