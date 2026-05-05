import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfflineReadingScreen = ({ navigation }) => {
  const [downloadedArticles, setDownloadedArticles] = useState([]);

  useEffect(() => {
    fetchDownloadedArticles();
  }, []);

  const fetchDownloadedArticles = async () => {
    const savedArticles = JSON.parse(await AsyncStorage.getItem('savedArticles')) || [];
    setDownloadedArticles(savedArticles);
  };

  const handleDelete = async (article) => {
    const filteredArticles = downloadedArticles.filter(item => item.id !== article.id);
    await AsyncStorage.setItem('savedArticles', JSON.stringify(filteredArticles));
    setDownloadedArticles(filteredArticles);
    Alert.alert("Article deleted successfully");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Offline Reading</Text>
      <FlatList
        data={downloadedArticles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default OfflineReadingScreen;
