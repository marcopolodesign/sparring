import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
const { height } = Dimensions.get('screen');
import {Colors} from './constants';
import MainButton from './button'
import { Heading } from './styled-components';
import { useSharedValue } from 'react-native-reanimated';
  
  const BottomUp = ({ title, paragraph, buttonTitle, onPress, loading, sheetRef}) => {

  

    const snapPoints = useMemo(() => [.05], []);
    const animatedContentHeight = useSharedValue(0)


    return (
        <BottomSheet
        backgroundStyle={{backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40}}
        containerStyle={{flexDirection: 'column', justifyContent: 'center'}} 
        ref={sheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        shouldMeasureContentHeight={true} 
        index={-1}
        enableDynamicSizing={true}
        contentHeight={animatedContentHeight}
        >
          {/* <View style={{paddingVertical : 10}}>
          <View style={{ top: 5}}>
                <Text style={[{ color: "#111" }]}>
                  Paseadores recomendados
                </Text>
            </View>
          </View> */}
           
        <BottomSheetView
              style={{padding: 20, paddingBottom: 80,justifyContent: 'center', alignItems: 'center'}}
          >
          <View style={{ marginTop: 10, marginBottom: 0 }}>
                <Heading style={{textAlign: 'center'}}color={Colors.darkGreen}>{title}</Heading>
                  
                {paragraph && (
                  <Text style={{ color: Colors.textGrey, textAlign: 'center', marginVertical: 20 }}>
                    {paragraph}
                  </Text>
                )}

                {buttonTitle && (

                  <MainButton
                    bgColor={Colors.primaryGreen}
                    color={Colors.darkGreen}
                    ctaText={buttonTitle}
                    activeOpacity={0.8}
                    onPress={onPress}
                    willFlex={'0'}
                    style={{width: '100%'}}
                    >
                  
                    {loading == true && (
                      <ActivityIndicator style={{ marginLeft: 3 }} />
                    )}
                    </MainButton>
        
                )}
              </View>
        </BottomSheetView>
        </BottomSheet>
   

    );
  };

  export default BottomUp;
  
 
  
  const styles = StyleSheet.create({
    main: {
      paddingTop: 10,
      paddingHorizontal: '5%',
      zIndex: 500,
      alignItems: 'center',
      paddingBottom: 20,
    },
    closebtn: {
      backgroundColor: "#fff",
      width: 30,
      height: 30,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 15,
      right: 30,
    },
    btnCard: {
      paddingVertical: 17,
      borderRadius: 8,
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primaryGreen,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });