import { Slot } from 'expo-router';
import { SessionProvider } from '../api/ctx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (

    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
     </GestureHandlerRootView>
    </SessionProvider>
  );
}