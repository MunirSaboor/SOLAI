import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

// Sample data for content library
const INITIAL_CONTENT = [
  { id: '1', title: 'Getting Started Guide', category: 'Tutorial', isFavorite: false },
  { id: '2', title: 'User Settings', category: 'Documentation', isFavorite: true },
  { id: '3', title: 'Advanced Features', category: 'Tutorial', isFavorite: false },
  { id: '4', title: 'Troubleshooting', category: 'Support', isFavorite: false },
  { id: '5', title: 'API Reference', category: 'Documentation', isFavorite: true },
];

export default function ContentLibraryComponent() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const [content, setContent] = React.useState(INITIAL_CONTENT);
  const [filter, setFilter] = React.useState('All');
  const [filteredContent, setFilteredContent] = React.useState(INITIAL_CONTENT);
  
  // Filter categories
  const categories = ['All', 'Tutorial', 'Documentation', 'Support', 'Favorites'];
  
  React.useEffect(() => {
    if (filter === 'All') {
      setFilteredContent(content);
    } else if (filter === 'Favorites') {
      setFilteredContent(content.filter(item => item.isFavorite));
    } else {
      setFilteredContent(content.filter(item => item.category === filter));
    }
  }, [filter, content]);
  
  const toggleFavorite = (id) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };
  
  const viewContentDetails = (item) => {
    Alert.alert(
      item.title,
      `This is the content for ${item.title} in the ${item.category} category.`,
      [{ text: 'OK' }]
    );
  };
  
  const renderContentItem = ({ item }) => (
    <ThemedView variant="card" style={styles.contentItem}>
      <View style={styles.contentHeader}>
        <ThemedText type="bodyBold">{item.title}</ThemedText>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <ThemedText style={{ 
            fontSize: 20, 
            color: item.isFavorite ? colors.warning : colors.secondaryText 
          }}>
            {item.isFavorite ? '★' : '☆'}
          </ThemedText>
        </TouchableOpacity>
      </View>
      
      <ThemedText type="footnote" style={styles.categoryTag}>
        {item.category}
      </ThemedText>
      
      <Button 
        variant="outline" 
        size="small" 
        style={styles.viewButton}
        onPress={() => viewContentDetails(item)}
      >
        View Details
      </Button>
    </ThemedView>
  );
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title2" style={styles.title}>Content Library</ThemedText>
      
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filter === category && { 
                backgroundColor: colors.primary,
              }
            ]}
            onPress={() => setFilter(category)}
          >
            <ThemedText 
              type="footnote"
              style={[
                filter === category && styles.activeFilterText
              ]}
            >
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      
      {filteredContent.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText type="body" style={styles.emptyText}>
            No content found for this filter.
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={filteredContent}
          keyExtractor={(item) => item.id}
          renderItem={renderContentItem}
          style={styles.contentList}
          contentContainerStyle={styles.contentListContainer}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentList: {
    flex: 1,
  },
  contentListContainer: {
    paddingBottom: 20,
  },
  contentItem: {
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    marginBottom: 12,
  },
  viewButton: {
    alignSelf: 'flex-start',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
  }
});
