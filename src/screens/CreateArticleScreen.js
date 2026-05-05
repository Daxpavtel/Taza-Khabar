// CreateArticleScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ProgressBarAndroid, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { firestore, storage } from '../components/Firebase';
import { useNotifications } from '../context/NotificationContext';

const CreateArticleScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addNotification } = useNotifications();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image picked:', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return '';

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `images/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error('Upload failed', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error('Error during image upload:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    let imageUrl = '';

    try {
      imageUrl = await uploadImage();
      console.log('Image URL:', imageUrl);

      await addDoc(collection(firestore, 'articles'), {
        title,
        description,
        image: imageUrl,
        createdAt: new Date(),
      });

      // Add a notification
      addNotification({
        id: new Date().toISOString(),
        text: `New article titled "${title}" has been submitted!`,
      });

      // Show success alert
      Alert.alert('Success', 'Article uploaded successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Notifications') }
      ]);

      // Clear form fields
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error uploading article:', error);
      Alert.alert('Error', 'Failed to upload article.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Article</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploading ? (
        <View style={styles.progressContainer}>
          <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress / 100} />
          <Text>{Math.round(progress)}%</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default CreateArticleScreen;
