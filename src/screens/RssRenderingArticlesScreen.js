import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';
import { decode } from 'html-entities';

const RssRenderingArticlesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const rssLink = route.params?.rssLink;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      if (rssLink) {
        const response = await fetch(rssLink);
        const text = await response.text();
        const feed = await rssParser.parse(text);
        console.log(feed); // Debug: Log the parsed feed

        const articlesData = feed.items.map(item => ({
          id: item.id || item.url,
          title: item.title,
          description: decode(item.description || 'No description available'),
          image: item.enclosures?.[0]?.url,
          link: item.links?.[0]?.url,
        }));

        setArticles(articlesData);
      }
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [rssLink]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles();
  }, [rssLink]);

  const renderArticleItem = ({ item }) => {
    const maxDescriptionLength = 100;
    const truncatedDescription = item.description.length > maxDescriptionLength 
      ? item.description.substring(0, maxDescriptionLength) + '...' 
      : item.description;

    return (
      <TouchableOpacity
        style={styles.articleContainer}
        onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      >
        {item.image && <Image source={{ uri: item.image }} style={styles.articleImage} />}
        {item.title ? <Text style={styles.articleTitle}>{item.title}</Text> : null}
        <Text style={styles.articleDescription}>
          {truncatedDescription || 'No description available'}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Articles</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search', { articles })}>
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.articleList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#fdbf00']}
          />
        }
      />
      <TouchableOpacity style={styles.reloadButton} onPress={fetchArticles}>
        <Icon name="refresh" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#fdbf00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleList: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  articleContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
  },
  reloadButton: {
    position: 'absolute',
    bottom: 80,
    right: 15,
    backgroundColor: '#fdbf00',
    borderRadius: 50,
    padding: 15,
    elevation: 3,
  },
});

export default RssRenderingArticlesScreen;
 