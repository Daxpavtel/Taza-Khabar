// RSSFeed.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import { useNavigation } from '@react-navigation/native';

const RSSFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      const response = await axios.get('https://timesofindia.indiatimes.com/rssfeedstopstories.cms');
      console.log('RSS Feed Response:', response.data); // Log the raw response data
      const rssData = await rssParser.parse(response.data);
      const parsedArticles = rssData.items.map(item => {
        const imageUrl = item.enclosures.length > 0 ? item.enclosures[0].url : null;
        console.log('Parsed Image URL:', imageUrl); // Log the parsed image URL
        return {
          title: item.title,
          description: item.description,
          image: imageUrl,
          link: item.links.length > 0 ? item.links[0].url : null,
        };
      });
      console.log('Parsed Articles:', parsedArticles); // Log the parsed articles
      setArticles(parsedArticles);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
          <View style={styles.articleContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.articleImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>No Image</Text>
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text numberOfLines={3} style={styles.articleDescription}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    padding: 15,
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  textContainer: {
    padding: 15,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 16,
    color: '#777',
  },
});

export default RSSFeed;
