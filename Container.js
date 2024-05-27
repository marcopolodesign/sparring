import {useEffect} from 'react'
import {View,TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard,StatusBar, StatusBarIOS, Platform } from 'react-native'
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
  import * as Font from 'expo-font';

  
  import {ContentContainer} from './src/components/styled-components.js'


const ScreenContainer = ({children, ...props}) => {
    const insets = useSafeAreaInsets();
  
  return (
    <>
    {!props.safeArea && (
      <SafeAreaProvider style={{backgroundColor: props.bgColor, flex: 1, marginBottom: -insets.bottom, marginTop: -insets.top}}> 
        <SafeAreaView style={{flex: 1}}>
   
      
        <ContentContainer bgColor={props.bgColor} style={{marginBottom: insets.bottom, marginTop: insets.top, fontFamily: 'TT Interphases Pro', flex: 1}}>
          {children}
        </ContentContainer>

   
        </SafeAreaView>
      </SafeAreaProvider>
    )}
  </>
  )
}

export default ScreenContainer



  // useFonts({
  //   'Thunder': require('./src/assets/fonts/Thunder.ttf'),
  //   'TT Interphases Pro': require('./src/assets/fonts/TT_Interphases_Pro_Regular.ttf'),
  //   'TT Interphases Pro Demi Bold': require('./src/assets/fonts/TT_Interphases_Pro_DemiBold.ttf'),
  // });