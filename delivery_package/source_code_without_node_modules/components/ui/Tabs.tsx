import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  
  // Filter out only TabScreen components
  const tabScreens = React.Children.toArray(children).filter(
    child => child.type && child.type.displayName === 'TabScreen'
  );
  
  return (
    <React.Fragment>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabScreens.map((child, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton
            ]}
            onPress={() => setActiveTab(index)}
          >
            <ThemedText 
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText
              ]}
            >
              {child.props.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.tabContent}>
        {tabScreens[activeTab]}
      </View>
    </React.Fragment>
  );
};

export const TabScreen = ({ children, title }) => {
  return <View style={styles.screen}>{children}</View>;
};

// Set displayName for component type checking
TabScreen.displayName = 'TabScreen';

const styles = StyleSheet.create({
  tabsContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  tabContent: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
