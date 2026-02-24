import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { storage } from './storage';
import { logger } from './logging';

class StateManager {
  constructor() {
    this.stores = new Map();
    this.subscribers = new Map();
  }

  createStore(name, initialState = {}) {
    if (this.stores.has(name)) {
      logger.warn(`Store ${name} already exists`);
      return this.stores.get(name);
    }

    const store = {
      state: initialState,
      setState: (newState) => {
        store.state = { ...store.state, ...newState };
        this.notifySubscribers(name);
      },
      resetState: () => {
        store.state = { ...initialState };
        this.notifySubscribers(name);
      },
    };

    this.stores.set(name, store);
    return store;
  }

  getStore(name) {
    return this.stores.get(name);
  }

  deleteStore(name) {
    this.stores.delete(name);
    this.subscribers.delete(name);
  }

  subscribe(name, callback) {
    if (!this.subscribers.has(name)) {
      this.subscribers.set(name, new Set());
    }
    this.subscribers.get(name).add(callback);

    return () => {
      this.subscribers.get(name).delete(callback);
    };
  }

  notifySubscribers(name) {
    const store = this.stores.get(name);
    if (!store) return;

    const subscribers = this.subscribers.get(name);
    if (subscribers) {
      subscribers.forEach(callback => callback(store.state));
    }
  }

  async persistStore(name, storageKey) {
    const store = this.stores.get(name);
    if (!store) return;

    try {
      await storage.setItem(storageKey, JSON.stringify(store.state));
    } catch (error) {
      logger.error(`Failed to persist store ${name}:`, error);
    }
  }

  async hydrateStore(name, storageKey) {
    const store = this.stores.get(name);
    if (!store) return;

    try {
      const persistedState = await storage.getItem(storageKey);
      if (persistedState) {
        store.state = JSON.parse(persistedState);
        this.notifySubscribers(name);
      }
    } catch (error) {
      logger.error(`Failed to hydrate store ${name}:`, error);
    }
  }

  async clearStore(name, storageKey) {
    const store = this.stores.get(name);
    if (!store) return;

    try {
      store.resetState();
      await storage.removeItem(storageKey);
    } catch (error) {
      logger.error(`Failed to clear store ${name}:`, error);
    }
  }
}

export const stateManager = new StateManager();

export const createStore = (name, initialState = {}) => {
  return stateManager.createStore(name, initialState);
};

export const useStore = (name, selector = null) => {
  const store = stateManager.getStore(name);
  if (!store) {
    throw new Error(`Store ${name} does not exist`);
  }

  const [state, setState] = useState(store.state);

  useEffect(() => {
    const unsubscribe = stateManager.subscribe(name, (newState) => {
      setState(newState);
    });

    return () => unsubscribe();
  }, [name]);

  if (selector) {
    return selector(state);
  }

  return state;
};

export const useStoreActions = (name) => {
  const store = stateManager.getStore(name);
  if (!store) {
    throw new Error(`Store ${name} does not exist`);
  }

  return {
    setState: useCallback((newState) => {
      store.setState(newState);
    }, [store]),
    resetState: useCallback(() => {
      store.resetState();
    }, [store]),
  };
};

export const usePersistentStore = (name, storageKey, initialState = {}) => {
  const store = useStore(name, initialState);
  const actions = useStoreActions(name);

  useEffect(() => {
    stateManager.hydrateStore(name, storageKey);
  }, [name, storageKey]);

  const setState = useCallback(async (newState) => {
    actions.setState(newState);
    await stateManager.persistStore(name, storageKey);
  }, [actions, name, storageKey]);

  const resetState = useCallback(async () => {
    actions.resetState();
    await stateManager.clearStore(name, storageKey);
  }, [actions, name, storageKey]);

  return {
    state: store,
    setState,
    resetState,
  };
};

export const StoreContext = createContext(null);

export const StoreProvider = ({ name, initialState, children }) => {
  const store = useMemo(() => createStore(name, initialState), [name, initialState]);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return store;
};

export const withStore = (name, selector = null) => {
  return (Component) => {
    return (props) => {
      const state = useStore(name, selector);
      return <Component {...props} {...state} />;
    };
  };
};

export const useStoreSelector = (name, selector) => {
  const store = stateManager.getStore(name);
  if (!store) {
    throw new Error(`Store ${name} does not exist`);
  }

  const [selectedState, setSelectedState] = useState(selector(store.state));

  useEffect(() => {
    const unsubscribe = stateManager.subscribe(name, (newState) => {
      setSelectedState(selector(newState));
    });

    return () => unsubscribe();
  }, [name, selector]);

  return selectedState;
}; 