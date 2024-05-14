import {useEffect} from 'react'
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
  import { createStore } from 'redux';
  import { useSelector, Provider } from 'react-redux';

  import {useFonts} from 'expo-font'
  
  import {ContentContainer} from './src/components/styled-components.js'

  import User from './api/test-user.json'
  import Coach from './api/test-coach.json'


const ScreenContainer = ({children, ...props}) => {
    const insets = useSafeAreaInsets();
    const initialState = {user: null, counter: 0, coach: null};
  

  useFonts({
    'Thunder': require('./src/assets/fonts/Thunder.ttf'),
    'TT Interphases Pro': require('./src/assets/fonts/TT_Interphases_Pro_Regular.ttf'),
    'TT Interphases Pro Demi Bold': require('./src/assets/fonts/TT_Interphases_Pro_DemiBold.ttf'),
  });

   

  return (
    <SafeAreaProvider style={{backgroundColor: props.bgColor, flex: 1,    marginBottom: -insets.bottom, marginTop: -insets.top}}> 
    <SafeAreaView>
 
        <ContentContainer bgColor={props.bgColor} style={{marginBottom: insets.bottom, marginTop: insets.top}}>
            {children}
        </ContentContainer>

        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ScreenContainer