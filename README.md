# <img src="https://img.shields.io/badge/TK-Taza%20Khabar-fdbf00?style=for-the-badge&logo=appsignal&logoColor=black" alt="TK Taza Khabar" />

> **A Modern Cross-Platform News & Articles Mobile Application**

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.74.5-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK%2051-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Firebase-10.12-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-34A853?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

<p align="center">
  <strong>Built with React Native • Powered by Firebase • Designed for Scale</strong>
</p>

---

## 📱 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Screens & Navigation](#-screens--navigation)
- [API & Integrations](#-api--integrations)
- [Design System](#-design-system)
- [Use Cases](#-use-cases)
- [Performance Optimizations](#-performance-optimizations)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📋 Overview

**TK (Taza Khabar)** is a feature-rich, cross-platform mobile application designed for news aggregation, content creation, and community engagement. It combines real-time article feeds, RSS integration, offline reading capabilities, and user-generated content publishing—all backed by Firebase's robust cloud infrastructure.

### 🎯 Problem Statement
Traditional news apps lack community-driven content creation and offline accessibility. TK bridges this gap by enabling users to not only consume news but also create, share, and save articles for offline reading.

### 💡 Solution
A unified platform that aggregates news from multiple sources (Firestore database + RSS feeds), allows citizen journalism through article creation, and provides seamless offline reading experiences.

---

## ✨ Features

### 🔐 Authentication & Security
- **Email/Password Authentication** via Firebase Auth
- **Protected Routes** with session management
- **Secure Data Storage** with Firebase security rules

### 📰 Content & News Feed
- **Real-time Article Feed** from Firestore with live updates
- **RSS Feed Integration** (Times of India & more)
- **Category-based Browsing** for organized content discovery
- **Rich Article Detail View** with images and formatted text
- **Full-screen Image Viewer** for media-rich articles

### ✍️ Content Creation
- **Article Publishing** with title, description, and images
- **Image Upload** to Firebase Storage with real-time progress tracking
- **Instant Notifications** on successful article submission

### 📖 User Experience
- **Offline Reading** - Download and save articles via AsyncStorage
- **Bookmarks** - Save favorite articles for quick access
- **Smart Search** - Full-text search across all articles
- **Comments System** - Community engagement on articles
- **Push Notifications** - In-app notification center
- **Pull-to-Refresh** - Real-time content synchronization
- **Splash Screen** - Professional app launch experience

### 🧭 Navigation
- **Drawer Navigator** - Side menu with quick access to key features
- **Bottom Tab Navigator** - Five primary tabs for core functionality
- **Stack Navigator** - Seamless screen-to-screen transitions with history

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React Native | 0.74.5 |
| **Development** | Expo SDK | 51 |
| **Navigation** | React Navigation v6 | 6.x |
| **Backend** | Firebase | 10.12 |
| **Auth** | Firebase Authentication | 20.3 |
| **Database** | Cloud Firestore | 20.3 |
| **Storage** | Firebase Cloud Storage | 20.3 |
| **State Management** | React Context API | Built-in |
| **HTTP Client** | Axios | 1.7.2 |
| **RSS Parser** | react-native-rss-parser | 1.5.1 |
| **Image Picker** | expo-image-picker | 15.1 |
| **Animations** | react-native-animatable | 1.4.0 |
| **Local Storage** | @react-native-async-storage | 1.23.1 |
| **Icons** | @expo/vector-icons | 14.0.3 |
| **Carousel** | react-native-snap-carousel | 1.6.1 |
| **HTML Rendering** | react-native-render-html | 6.3.4 |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         TK Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │  UI Layer       │    │  Navigation     │                 │
│  │  (Screens)      │◄──►│  (Tab/Drawer/   │                 │
│  │  17 Screens     │    │   Stack)        │                 │
│  └────────┬────────┘    └────────┬────────┘                 │
│           │                      │                           │
│  ┌────────▼──────────────────────▼────────┐                 │
│  │          Components Layer               │                 │
│  │  ArticleCard | SearchBar | RSSFeed      │                 │
│  │  CategoryList | Firebase                │                 │
│  └────────────────────┬────────────────────┘                 │
│                       │                                       │
│  ┌────────────────────▼────────────────────┐                 │
│  │          State Management                │                 │
│  │  ArticlesContext | NotificationContext   │                 │
│  └────────────────────┬────────────────────┘                 │
│                       │                                       │
│  ┌────────────────────▼────────────────────┐                 │
│  │          Backend Services                │                 │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │                 │
│  │  │ Firestore│ │  Auth    │ │ Storage  │ │                 │
│  │  │ (Real-   │ │ (Session │ │ (Images) │ │                 │
│  │  │  time)   │ │  Mgmt)   │ │          │ │                 │
│  │  └──────────┘ └──────────┘ └──────────┘ │                 │
│  └─────────────────────────────────────────┘                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
TK/
│
├── 📄 App.js                          # Root navigator & app entry point
├── 📄 firebaseConfig.js               # Firebase initialization & exports
├── 📄 SignupScreen.js                 # Legacy signup component
├── 📄 SplashScreen.js                 # App launch splash screen
├── 📄 package.json                    # Dependencies & scripts
├── 📄 app.json                        # Expo configuration
├── 📄 babel.config.js                 # Babel transpiler config
│
├── 📁 src/
│   │
│   ├── 📁 screens/                    # Application screens (17 total)
│   │   ├── HomeScreen.js              # Main feed with pull-to-refresh
│   │   ├── LoginScreen.js             # User authentication
│   │   ├── SignUpScreen.js            # New user registration
│   │   ├── ArticleDetailScreen.js     # Full article view
│   │   ├── CategoryScreen.js          # Category-based browsing
│   │   ├── CreateArticleScreen.js     # Article creation & upload
│   │   ├── SearchScreen.js            # Full-text article search
│   │   ├── ProfileScreen.js           # User profile management
│   │   ├── BookmarksScreen.js         # Saved articles
│   │   ├── NotificationsScreen.js     # In-app notifications
│   │   ├── OfflineReadingScreen.js    # Offline saved articles
│   │   ├── CommentsScreen.js          # Article comments
│   │   ├── SettingsScreen.js          # App settings
│   │   ├── ContactScreen.js           # Contact/support form
│   │   ├── ImageViewerScreen.js       # Full-screen image view
│   │   ├── RssRenderingArticlesScreen.js  # RSS feed display
│   │   └── SplashScreen.js            # Loading/splash screen
│   │
│   ├── 📁 components/                 # Reusable UI components
│   │   ├── ArticleCard.js             # Article preview card
│   │   ├── CategoryList.js            # Category navigation list
│   │   ├── SearchBar.js               # Search input component
│   │   ├── RSSFeed.js                 # RSS feed parser & display
│   │   └── Firebase.js                # Firebase service wrapper
│   │
│   ├── 📁 context/                    # Global state management
│   │   ├── ArticlesContext.js         # Articles state & Firestore sync
│   │   └── NotificationContext.js     # Notification state manager
│   │
│   └── 📁 styles/                     # Design system tokens
│       ├── colors.js                  # Color palette
│       ├── typography.js              # Font styles & sizes
│       └── layout.js                  # Spacing & layout constants
│
└── 📁 assets/                         # Static resources
    ├── icon.png                       # App icon
    ├── splash.png                     # Splash screen image
    └── adaptive-icon.png              # Android adaptive icon
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18.x |
| **npm / yarn** | >= 9.x / 1.22.x |
| **Expo CLI** | Latest |
| **Android Studio** | For Android emulator |
| **Xcode** | For iOS simulator (macOS only) |

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/TK.git

# Navigate to project directory
cd TK

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Platforms

```bash
# Android device/emulator
npm run android

# iOS simulator (macOS only)
npm run ios

# Web browser
npm run web

# Expo Go app (scan QR code)
npm start
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Note your project configuration

### 2. Enable Services

| Service | Purpose | Setup Steps |
|---------|---------|-------------|
| **Authentication** | User login/signup | Enable Email/Password provider |
| **Firestore** | Article & user data | Create database in production/test mode |
| **Storage** | Image uploads | Enable with default security rules |

### 3. Configure Environment

Update `firebaseConfig.js` with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Firestore Collections

| Collection | Fields | Description |
|------------|--------|-------------|
| `articles` | `title`, `description`, `image`, `createdAt` | All published articles |
| `users` | `email`, `displayName`, `createdAt` | User profiles |
| `comments` | `articleId`, `userId`, `text`, `timestamp` | Article comments |

---

## 📱 Screens & Navigation

### Navigation Hierarchy

```
App
├── LoginScreen
├── SignUpScreen
│
└── DrawerNavigator
    ├── TabNavigator
    │   ├── Home (Stack)
    │   │   ├── HomeScreen
    │   │   ├── ArticleDetailScreen
    │   │   ├── SearchScreen
    │   │   ├── CategoryScreen
    │   │   ├── CommentsScreen
    │   │   ├── ImageViewerScreen
    │   │   ├── CreateArticleScreen
    │   │   ├── RssRenderingArticlesScreen
    │   │   └── NotificationsScreen
    │   │
    │   ├── Offline (OfflineReadingScreen)
    │   ├── CreateArticle (CreateArticleScreen)
    │   ├── Notifications (NotificationsScreen)
    │   └── Profile (ProfileScreen)
    │
    ├── Bookmarks (BookmarksScreen)
    ├── Categories (CategoryScreen)
    ├── Contact (ContactScreen)
    └── Settings (SettingsScreen)
```

### Screen Overview

| Screen | Description | Key Features |
|--------|-------------|--------------|
| **Home** | Main article feed | Pull-to-refresh, Firestore sync, drawer toggle |
| **Article Detail** | Full article view | Image display, comments access, bookmark |
| **Create Article** | Content creation | Image picker, upload progress, Firestore submit |
| **Search** | Article search | Full-text search, filter results |
| **Category** | Browse by category | Category filtering, organized display |
| **Bookmarks** | Saved articles | Offline access, quick retrieval |
| **Offline** | Downloaded articles | AsyncStorage cache, no internet required |
| **Notifications** | Activity feed | Article updates, system alerts |
| **Profile** | User management | Account details, preferences |
| **Comments** | Discussion thread | Add/view comments per article |
| **Settings** | App configuration | Preferences, logout |
| **Contact** | Support form | User feedback, issue reporting |
| **ImageViewer** | Full-screen images | Zoom, swipe navigation |
| **RSS Feed** | External news | Times of India integration, parsing |

---

## 🔌 API & Integrations

### RSS Feed Sources

| Source | Endpoint | Content |
|--------|----------|---------|
| **Times of India** | `https://timesofindia.indiatimes.com/rssfeedstopstories.cms` | Top stories |
| **Extensible** | Add any RSS 2.0 / Atom feed | Custom sources |

### Firebase Services

```javascript
// Firestore Operations
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

// Storage Operations
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Auth Operations
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
```

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#fdbf00` | Headers, buttons, accents, active tabs |
| **Background** | `#f5f5f5` | Screen backgrounds |
| **Card** | `#ffffff` | Article cards, containers |
| **Text Primary** | `#333333` | Headings, titles |
| **Text Secondary** | `#666666` | Descriptions, subtitles |
| **Text Muted** | `#777777` | Placeholder text |
| **Border** | `#dddddd` | Input borders, dividers |
| **Success** | `#4CAF50` | Success states, pick image button |
| **Info** | `#007BFF` | Submit buttons, links |

### Typography

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Heading** | 24px | Bold | Screen titles |
| **Title** | 20px | Bold | Card titles, headers |
| **Subtitle** | 18px | Bold | Article titles |
| **Body** | 16px | Regular | Descriptions |
| **Caption** | 14px | Regular | Metadata, secondary text |

### Icon Libraries

- **Material Icons** - Primary action icons
- **Ionicons** - Navigation & tab icons
- **Feather** - Minimalist utility icons
- **FontAwesome** - Legacy & social icons

---

## 🎯 Use Cases

### For News Consumers
- ✅ Browse real-time news feeds
- ✅ Read articles offline without internet
- ✅ Bookmark favorite articles
- ✅ Search across all content
- ✅ Engage via comments

### For Content Creators
- ✅ Publish articles with images
- ✅ Track upload progress
- ✅ Receive submission notifications
- ✅ Reach a broader audience

### For Community Managers
- ✅ Moderate comments
- ✅ Manage article categories
- ✅ Monitor user engagement
- ✅ Curate RSS feed sources

### Ideal For
- 📰 Regional news platforms
- 🏫 University/college news apps
- 🏢 Corporate internal newsletters
- 🌐 Community-driven content hubs
- 📱 Personal news aggregation

---

## ⚡ Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Real-time Sync** | Firestore `onSnapshot` listeners |
| **Image Optimization** | Quality compression via `expo-image-picker` |
| **Lazy Loading** | `FlatList` with `keyExtractor` |
| **Offline Support** | AsyncStorage caching |
| **Pull-to-Refresh** | `RefreshControl` for manual sync |
| **State Management** | Context API for global state |
| **Navigation** | Lazy-loaded screens via React Navigation |

---

## 🗺 Roadmap

### Phase 1 - Core Features ✅
- [x] User authentication
- [x] Article feed (Firestore)
- [x] Article creation & upload
- [x] RSS feed integration
- [x] Offline reading
- [x] Bookmarks
- [x] Search functionality
- [x] Comments system
- [x] Notifications

### Phase 2 - Enhancements 🚧
- [ ] Push notifications (FCM)
- [ ] Dark mode theme
- [ ] User profiles with avatars
- [ ] Article sharing (social media)
- [ ] Admin dashboard
- [ ] Article categories & tags
- [ ] Reading history
- [ ] Analytics dashboard

### Phase 3 - Advanced Features 📋
- [ ] Video article support
- [ ] Multi-language support
- [ ] AI-powered recommendations
- [ ] Subscription/paywall system
- [ ] Live news ticker
- [ ] Podcast integration
- [ ] Social login (Google, Facebook)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'feat: add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

### Commit Message Format

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Code style changes |
| `refactor` | Code refactoring |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

| Platform | Link |
|----------|------|
| **Email** | pateldaksh1903@gmail.com |
| **GitHub** | [@Dakshpavtel](https://github.com/Daxpavtel) |
| **LinkedIn** | [dakshpatel1996](https://www.linkedin.com/in/dakshpatel1996/) |

---

<p align="center">
  <strong>Made with ❤️ by the TK Team</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" height="30" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" height="30" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" height="30" />
</p>

---

<p align="center">
  <sub>If this project helped you, consider giving it a ⭐</sub>
</p>
