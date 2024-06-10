import React, { useState, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
const { height } = Dimensions.get('screen');
import {Colors} from './constants';
import MainButton from './button'
import { Heading, SubHeading, ViewJustifyCenter, PopOptions } from './styled-components';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigationState } from '@react-navigation/native';

  
const BottomUp = forwardRef((props, ref) => {
    const routes = useNavigationState(state => state.routes);
    const currentRoute = routes[routes.length - 1];

    const matchDetails = props.newMatch

    console.log('currentRoute', currentRoute.name)
    const sports = ['Tennis', 'Paddle', 'Pickleball'];

    const [selectBottomUpProps, setSelectBottomUpProps] = useState({
      title: 'Selecciona un deporte',
      options: sports,
      onPress: (sport) => {
        console.log('sport', sport);
        ref.current.close();
        {currentRoute.name != "createMatch" ?
            router.push({  params: {newMatchSport: sport}, pathname: '(app)/createMatch'})
         : 
            props.setNewMatch({
                ...matchDetails,
                name: sport,
                sport: {
                    sport: sport
                }
            })
        }
      },
    })





    const selectSnapPoints = useMemo(() => [.05], []);
    const selectContentHeight = useSharedValue(0)
    return (
      
        <BottomSheet
        backgroundStyle={{backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40}}
        containerStyle={{flexDirection: 'column', justifyContent: 'center', zIndex: 55, flex: 1}} 
        ref={ref}
        snapPoints={selectSnapPoints}
        initialSnapIndex={0}
        shouldMeasureContentHeight={true} 
        index={-1}
        enableDynamicSizing={true}
        contentHeight={selectContentHeight}
        // backdropComponent={BottomSheetBackdrop}
        backdropComponent={(props) => (
          <BottomSheetBackdrop containerStyle={{zIndex: 5}} {...props}  />
        )}      
        >
          {/* <View style={{paddingVertical : 10}}>
          <View style={{ top: 5}}>
                <Text style={[{ color: "#111" }]}>
                </Text>
            </View>
          </View> */}
           
        <BottomSheetView
              style={{padding: 20, paddingBottom: props.hasTabs ? 150 : 50, alignItems: 'center', flex: 1, width: '100%'}}
          >

        <View style={{ marginTop: 10, marginBottom: 0, flex: 1, width: '100%' }}>
                <Heading style={{textAlign: 'center'}}color={Colors.darkGreen}>{selectBottomUpProps.title}</Heading>
                  
                {selectBottomUpProps.paragraph && (
                  <Text style={{ color: Colors.textGrey, textAlign: 'center', marginVertical: 20 }}>
                    {selectBottomUpProps.paragraph}
                  </Text>
                )}
                <ViewJustifyCenter style={{marginVertical: 20, gap: 10 }}>
                    {selectBottomUpProps.options.map((sport) => (
                        <PopOptions
                        key={sport}
                        style={styles.modalItem}
                        onPress={() => {
                            selectBottomUpProps.onPress(sport);
                        }}
                        >
                        <SubHeading size={'16px'} color={Colors.textGrey} style={styles.modalItemText}>{sport}</SubHeading>
                        </PopOptions>
                    ))}
                </ViewJustifyCenter>
                </View>


        </BottomSheetView>
        </BottomSheet>
   

    );
  });

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
