import {useEffect, useState} from 'react'
import { Slot } from 'expo-router';
import { SessionProvider } from '../api/ctx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fetchFonts } from '../api/functions';

export default function Root() {
  // Set up the auth context and render our layout inside of it.

  const [appReady, setAppReady] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadApp() {
      try {
        await fetchFonts();
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading app:', error);
      } finally {
        setAppReady(true);
      }
    }

    loadApp();
  }, [])

  if (!appReady) {
    return null;
  }

  return (

    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot backBehavior="history"/>
     </GestureHandlerRootView>
    </SessionProvider>
  );
}