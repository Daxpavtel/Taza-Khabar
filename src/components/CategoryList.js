import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryList = ({ categories, onPressCategory }) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => onPressCategory(item)}>
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.categoryList}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryItem: {
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CategoryList;
