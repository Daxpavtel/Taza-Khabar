import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Share } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../components/Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticleDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { article } = route.params;

  if (!article || !article.id) {
    Alert.alert("Error", "Article ID is not available.");
    return null;  // Prevent rendering if article ID is not available
  }

 
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.description}\n\nRead more at: {contact To get Apk: pateldaksh2206@gmail.com}`,
      });
    } catch (error) {
      console.error('Error sharing article: ', error);
    }
  };
  const handleDelete = async () => {
    if (!article.id) {
      Alert.alert("Error", "Article ID is not available.");
      return;
    }
  
    Alert.alert(
      "Delete Article",
      "Are you sure you want to delete this article?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'articles', article.id));
              Alert.alert("Article deleted successfully");
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting article: ', error);
              Alert.alert("Error deleting article");
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
  
  const handleDownload = async () => {
    try {
      const savedArticles = JSON.parse(await AsyncStorage.getItem('savedArticles')) || [];
      savedArticles.push(article);
      await AsyncStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      Alert.alert("Article downloaded successfully");
    } catch (error) {
      console.error('Error downloading article: ', error);
      Alert.alert("Error downloading article");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <FontAwesome name="share" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {article.image ? (
          <Image source={{ uri: article.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>No Image Available</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <FontAwesome name="download" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  image: {
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    elevation: 3,
  },
});

export default ArticleDetailScreen;
