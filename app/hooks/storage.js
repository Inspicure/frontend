// source: https://github.com/react-native-hooks/async-storage/blob/master/src/index.js
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// export default (key) => {
//   const [storageItem, setStorageItem] = useState(null);
//   const [dataReady, setDataReady] = useState(false);

//   const getStorageItem = React.useCallback(async () => {
//     const data = await AsyncStorage.getItem(key);
//     setStorageItem(data);
//     setDataReady(true);
//   }, [key]);

//   const updateStorageItem = React.useCallback(
//     async (data) => {
//       setDataReady(false);
//       if (typeof data === 'string') {
//         await AsyncStorage.setItem(key, data);
//         setStorageItem(data);
//       }
//       setDataReady(true);
//       return data;
//     },
//     [key],
//   );

//   const clearStorageItem = React.useCallback(async () => {
//     setDataReady(false);
//     await AsyncStorage.removeItem(key);
//     setStorageItem(null);
//     setDataReady(true);
//   }, [key]);

//   useEffect(() => {
//     if (!dataReady) {
//       getStorageItem();
//     }
//   }, [dataReady, getStorageItem, key]);

//   return [
//     storageItem,
//     dataReady,
//     updateStorageItem,
//     clearStorageItem,
//   ];
// };

// modified from source: https://gist.github.com/msukmanowsky/08a3650223dda8b102d2c9fe94ad5c12
export default (key) => {
  // default to not being ready to allow load
  const [storedValue, setStoredValue] = React.useState({ready: false});

  React.useEffect(() => {
    console.log("triggering effect")
    const populateStoredValue = async () => {
      const storedData = await AsyncStorage.getItem(key);
      if (storedData !== null) {
        setStoredValue(JSON.parse(storedData))
      }
    }
    populateStoredValue()
  }, [key]);

  const setValue = async (value) => {
    // const valueToStore = value instanceof Function ? value(storedValue) : value;
    await AsyncStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  return [storedValue, setValue];
}