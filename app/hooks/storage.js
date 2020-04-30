// source: https://github.com/react-native-hooks/async-storage/blob/master/src/index.js
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default (key) => {
  const [storageItem, setStorageItem] = useState(null);
  const [dataReady, setDataReady] = useState(false);

  const getStorageItem = React.useCallback(async () => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
  }, [key, setStorageItem]);

  const updateStorageItem = React.useCallback(
    async (data) => {
      setDataReady(false);
      if (typeof data === 'string') {
        await AsyncStorage.setItem(key, data);
        setStorageItem(data);
      }
      setDataReady(true);
      return data;
    },
    [key],
  );

  const clearStorageItem = React.useCallback(async () => {
    setDataReady(false);
    await AsyncStorage.removeItem(key);
    setStorageItem(null);
    setDataReady(true);
  }, [key]);

  useEffect(() => {
    const populateStorageItem = async () => {
      await getStorageItem();
      setDataReady(true);
    };
    populateStorageItem();
  }, [getStorageItem, key]);

  return [
    storageItem,
    dataReady,
    updateStorageItem,
    clearStorageItem,
  ];
};
