import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      // Simulate fetching categories from an API or local storage
      const fetchedCategories = [
        { id: '1', name: 'Top Stories', rssLink: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms' },
        { id: '2', name: 'Business', rssLink: 'http://timesofindia.indiatimes.com/rssfeeds/1898055.cms' },
        { id: '3', name: 'Sports', rssLink: 'http://timesofindia.indiatimes.com/rssfeeds/4719148.cms' },
      ];

      // Optionally, you can sanitize category names if they come from an external source
      const sanitizedCategories = fetchedCategories.map(category => ({
        ...category,
        name: category.name.replace(/<\/?[^>]+(>|$)/g, ""), // Removes any HTML tags
      }));

      setCategories(sanitizedCategories);
    };

    fetchCategories();
  }, []);

  const onPressCategory = (category) => {
    navigation.navigate('RssRenderingArticles', { rssLink: category.rssLink });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPressCategory(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Explore Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
});

export default CategoryScreen;
