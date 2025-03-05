import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  constructor() {
    this.storage = Platform.OS === 'web' ? window.localStorage : AsyncStorage;
  }

  async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        return this.storage.getItem(key);
      }
      return await this.storage.getItem(key);
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        this.storage.setItem(key, value);
      } else {
        await this.storage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }

  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        this.storage.removeItem(key);
      } else {
        await this.storage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  }

  async clear() {
    try {
      if (Platform.OS === 'web') {
        this.storage.clear();
      } else {
        await this.storage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  async getAllKeys() {
    try {
      if (Platform.OS === 'web') {
        return Object.keys(this.storage);
      }
      return await this.storage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from storage:', error);
      return [];
    }
  }

  async multiGet(keys) {
    try {
      if (Platform.OS === 'web') {
        return keys.map(key => [key, this.storage.getItem(key)]);
      }
      return await this.storage.multiGet(keys);
    } catch (error) {
      console.error('Error getting multiple items from storage:', error);
      return [];
    }
  }

  async multiSet(keyValuePairs) {
    try {
      if (Platform.OS === 'web') {
        keyValuePairs.forEach(([key, value]) => {
          this.storage.setItem(key, value);
        });
      } else {
        await this.storage.multiSet(keyValuePairs);
      }
    } catch (error) {
      console.error('Error setting multiple items in storage:', error);
    }
  }

  async multiRemove(keys) {
    try {
      if (Platform.OS === 'web') {
        keys.forEach(key => {
          this.storage.removeItem(key);
        });
      } else {
        await this.storage.multiRemove(keys);
      }
    } catch (error) {
      console.error('Error removing multiple items from storage:', error);
    }
  }

  async getObject(key) {
    try {
      const value = await this.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting object from storage:', error);
      return null;
    }
  }

  async setObject(key, value) {
    try {
      await this.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting object in storage:', error);
    }
  }

  async getArray(key) {
    try {
      const value = await this.getItem(key);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error getting array from storage:', error);
      return [];
    }
  }

  async setArray(key, value) {
    try {
      await this.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting array in storage:', error);
    }
  }

  async getBoolean(key) {
    try {
      const value = await this.getItem(key);
      return value === 'true';
    } catch (error) {
      console.error('Error getting boolean from storage:', error);
      return false;
    }
  }

  async setBoolean(key, value) {
    try {
      await this.setItem(key, value.toString());
    } catch (error) {
      console.error('Error setting boolean in storage:', error);
    }
  }

  async getNumber(key) {
    try {
      const value = await this.getItem(key);
      return value ? Number(value) : 0;
    } catch (error) {
      console.error('Error getting number from storage:', error);
      return 0;
    }
  }

  async setNumber(key, value) {
    try {
      await this.setItem(key, value.toString());
    } catch (error) {
      console.error('Error setting number in storage:', error);
    }
  }
}

export const storage = new Storage();

export const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      const storedValue = await storage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    };
    loadValue();
  }, [key]);

  const updateValue = async (newValue) => {
    setValue(newValue);
    await storage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}; 