import {useEffect} from 'react'
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
  import * as Font from 'expo-font';

  import {useFonts} from 'expo-font'
  
  import {ContentContainer} from './src/components/styled-components.js'


const ScreenContainer = ({children, ...props}) => {
    const insets = useSafeAreaInsets();
  
    const fetchFonts = async () => {
      const fonts = await Font.loadAsync({
        'Thunder': require('./assets/fonts/Thunder.ttf'),
        'TT Interphases Pro': require('./assets/fonts/TT_Interphases_Pro_Regular.ttf'),
        'TT Interphases Pro Demi Bold': require('./assets/fonts/TT_Interphases_Pro_DemiBold.ttf'),
      });
      return await Promise.all([fonts]);
    };

    useEffect(() => {
      fetchFonts();
    }, []);

   

  return (
    <>
    {!props.safeArea ? (
    <SafeAreaProvider style={{backgroundColor: props.bgColor, flex: 1, marginBottom: -insets.bottom, marginTop: -insets.top}}> 
        <SafeAreaView>
          <ContentContainer bgColor={props.bgColor} style={{marginBottom: insets.bottom, marginTop: insets.top, fontFamily: 'TT Interphases Pro'}}>
            {children}
          </ContentContainer>
        </SafeAreaView>
        </SafeAreaProvider>
      ) : (
        <ContentContainer bgColor={props.bgColor} style={{fontFamily: 'TT Interphases Pro'}}>
          {children}
        </ContentContainer>
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