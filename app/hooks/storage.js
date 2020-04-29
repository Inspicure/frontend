// source: https://github.com/react-native-hooks/async-storage/blob/master/src/index.js
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
// TODO: usecallback some stuff in here
export default (key) => {
  const [storageItem, setStorageItem] = useState(null);
  const [dataReady, setDataReady] = useState(false);

  const getStorageItem = async () => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
  };

  const updateStorageItem = async (data) => {
    setDataReady(false);
    if (typeof data === 'string') {
      await AsyncStorage.setItem(key, data);
      console.log(`storage item ${key} set with data ${data}`);
      setStorageItem(data);
    }
    setDataReady(true);
    return data;
  };

  const clearStorageItem = async () => {
    setDataReady(false);
    await AsyncStorage.removeItem(key);
    setStorageItem(null);
    setDataReady(true);
  };

  useEffect(() => {
    const populateStorageItem = async () => {
      await getStorageItem();
      console.log(`loading storage item for ${key}`);
      setDataReady(true);
    };
    populateStorageItem();
  }, [getStorageItem, setDataReady, key]);

  return [
    storageItem,
    dataReady,
    updateStorageItem,
    clearStorageItem,
  ];
};
