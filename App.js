import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

// Import your screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import OfflineReadingScreen from './src/screens/OfflineReadingScreen';
import ContactScreen from './src/screens/ContactScreen';
import ImageViewerScreen from './src/screens/ImageViewerScreen';
import CreateArticleScreen from './src/screens/CreateArticleScreen';
import RssRenderingArticlesScreen from './src/screens/RssRenderingArticlesScreen'; // Ensure this path is correct
import { ArticlesProvider } from './src/context/ArticlesContext';
import { NotificationProvider } from './src/context/NotificationContext';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Home stack navigator
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ImageViewer" component={ImageViewerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateArticle" component={CreateArticleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RssRenderingArticles" component={RssRenderingArticlesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Bottom tab navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
          return <Ionicons name={iconName} color={color} size={size} />;
        } else if (route.name === 'Offline') {
          iconName = 'file-download';
          return <MaterialIcons name={iconName} color={color} size={size} />;
        } else if (route.name === 'CreateArticle') {
          iconName = 'plus-circle';
          return <Feather name={iconName} color={color} size={size} />;
        } else if (route.name === 'Notifications') {
          iconName = 'notifications-outline';
          return <Ionicons name={iconName} color={color} size={size} />;
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
          return <Ionicons name={iconName} color={color} size={size} />;
        }
      },
      tabBarActiveTintColor: '#fdbf00',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Offline" component={OfflineReadingScreen} />
    <Tab.Screen name="CreateArticle" component={CreateArticleScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          icon={() => <Ionicons name="home-outline" size={24} color="#000" />}
        />
        <DrawerItem
          label="Bookmarks"
          onPress={() => props.navigation.navigate('Bookmarks')}
          icon={() => <FontAwesome name="bookmark-o" size={24} color="#000" />}
        />
        <DrawerItem
          label="Categories"
          onPress={() => props.navigation.navigate('Category')}
          icon={() => <MaterialIcons name="category" size={24} color="#000" />}
        />
        <DrawerItem
          label="Contact"
          onPress={() => props.navigation.navigate('Contact')}
          icon={() => <Ionicons name="contacts-outline" size={24} color="#000" />}
        />
        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
          icon={() => <Ionicons name="settings-outline" size={24} color="#000" />}
        />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('Login')}
          icon={() => <Ionicons name="exit-outline" size={24} color="#000" />}
        />
      </DrawerContentScrollView>
    )}
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#fff',
        width: 240,
      },
      headerShown: false,
    }}
  >
    <Drawer.Screen name="TabNavigator" component={TabNavigator} />
  </Drawer.Navigator>
);

// Main App component
const App = () => {
  return (
    <ArticlesProvider>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ImageViewer" component={ImageViewerScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </ArticlesProvider>
  );
};

export default App;
