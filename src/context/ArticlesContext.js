// context/ArticlesContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { firestore } from '../components/Firebase';

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const articlesList = [];
      querySnapshot.forEach((doc) => {
        articlesList.push({ ...doc.data(), id: doc.id });
      });
      setArticles(articlesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
