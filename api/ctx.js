import React, { createContext, useContext } from 'react';
import { useStorageState } from './useStorageState';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';


const IP = 'localhost';

// const serverURL = 'http://192.168.68.108:1337'
// const serverURL = 'http://localhost:1337'
const serverURL = 'https://sparring.nyc3.cdn.digitaloceanspaces.com/'


// console.log('URL:', serverURL);
// Initial state
const initialState = {
  stateUser: null,
  session: null,
  isLoading: true,
  counter: 0,
  backUrl: serverURL,
  hasFaceID: null,
};



// AsyncStorage.clear();

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'SET_USER':
      return { ...state, stateUser: action.payload };
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'LOGOUT':
      return { ...state, session: null, stateUser: null};
      case 'SET_FACE_ID':
        return { ...state, hasFaceID: action.payload};
      case 'SET_IS_READY':
        return { ...state, isLoading: false};
      case 'RESET_STATE':
        return initialState;
    default:
      return state;
  }
};

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  stateUser: null,
  session: null,
  isLoading: false,
  counter: 0,
  backUrl: URL,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}
