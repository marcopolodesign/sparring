import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Stack, router, useLocalSearchParams} from 'expo-router'
import Container from '../../../../Container.js'
import { StyleSheet, View, StatusBar, FlatList, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { onFaceId, fetchUser } from '../../../../api/functions.js';
import {Colors} from '../../../../src/components/constants.js'
import { Heading, SubHeading, Text, ViewJustifyCenter } from '../../../../src/components/styled-components.js';
const { height } = Dimensions.get('screen');

import NearbyMatches from '../../../../src/components/matchesCarrousel.js'
import NearbyCoaches from '../../../../src/components/coachesCarrousel.js'

import * as Haptics from 'expo-haptics';

import Loading from '../../../../src/components/loading.js';

import Header from '../../../../src/components/header/header.js'
import BottomUp from '../../../../src/components/BottomUp.js'
import BottomSelect from '../../../../src/components/BottomSelect.js'
import MainButton from '../../../../src/components/button.js';
import MapCard from '../../../../src/components/home/MapCard.js';
import Share from '../../../../src/components/share.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OwnMatches from '../../../../src/components/ownMatches.js';
import Constants from 'expo-constants';



 const App =  ({...props}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [childIsLoading, setChildIsLoading] = useState(true)
  // console.log('childIsLoading', childIsLoading)
  const session = useSelector(state => state.session);
  const user = JSON.parse(session);
  console.log('user', JSON.stringify(user, "USERRRR", 2));
  const userId = user.id;
  const backUrl = useSelector(state => state.backUrl);
  const [hasFaceIDActive, setHasFaceIDActive] = useState(null)
  const [hasMatches, setHasMatches] = useState(null)

  const sheetRef = useRef(null);
  const countryBottomSheetRef = useRef(null)

  const {succesMessage} = useLocalSearchParams();
  const {LoadingBgColor} = useLocalSearchParams();

  // console.log('succesMessage', succesMessage)
  // console.log('LoadingBgColor', LoadingBgColor)

  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });


  useEffect(() => {
    console.log('Environment:', Constants.expoConfig.extra.envName);
  }, []);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const refreshedUser = await fetchUser(userId);
    dispatch({ type: 'SET_USER', payload: JSON.stringify(refreshedUser) });
    dispatch({ type: 'SET_SESSION', payload: JSON.stringify(refreshedUser) });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  // useEffect(() => {
  //   async function checkFaceId() {
  //     const faceIDStatus = await AsyncStorage.getItem('hasFaceIDSet');
  //     setHasFaceIDActive(faceIDStatus);
  //     // console.log('hasFaceIDActive', faceIDStatus); // This will log the correct value

  //     if (faceIDStatus !== 'true') {
  //       onFaceId(user);
  //     }
  //   }

  //   checkFaceId();
  // }, [user, onFaceId]);

  useEffect(() => {
      user.matches.length > 0 && setHasMatches(true)
  }, []);
  


  return (
    <>
    {/* {childIsLoading && 
        (
          <Loading LoadingBgColor={LoadingBgColor || "#0F5CCD"}
          title={succesMessage || 'Cargando'}
          SubTitle={'Estamos cargando tus partidos!'}
          loader
          />
        )}  */}
    <Container bgColor={Colors.darkGreen}> 
      <Stack.Screen options={{headerShown: false}} title="Home"/>
        <>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <StatusBar barStyle="light-content" />
        <Header user={user} backUrl={backUrl} />
        <StatusBar style="auto" />
        </View>
      <ScrollView 
    refreshControl={
      <RefreshControl tintColor={Colors.primaryGreen} refreshing={refreshing} onRefresh={onRefresh} />}
      style={{minHeight: height, paddingHorizontal: 20, paddingTop: 30, flex: 1, paddingBottom: 100}}>
        {hasMatches ?  (
            <View style={{marginBottom: 0}}>
              {console.log('HAS MATCHES')}
              <ViewJustifyCenter>
                  <Heading style={{marginBottom:0}}color={"#fff"}>Mis Partidos</Heading>
                  <TouchableOpacity onPress={() => {
                    router.push({pathname: '/(tabs)/explorar-partidos'})
                    // sheetRef.current.expand()
                    // setBottomUpProps({
                    //   title: 'CANCHA RESERVADA CORRECTAMENTE!',
                    //   paragraph: 'PPT Pilar - Cancha 1 • 9:00 — 10:00',
                    //   buttonTitle: 'Invitar amigos a la reserva',
                    //   onPress: () => {
                    //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    //   },
                    //   loading: false,
                    // });

                    }}>
                    <SubHeading isBold color={'#fff'} size={'16px'}>Buscar más partidos</SubHeading>
                  </TouchableOpacity>
              </ViewJustifyCenter>
            <OwnMatches  setChildIsLoading={setChildIsLoading} />
            </View>
        )  : (
          // {user.matches.length > 0 && 
            (
              <>
                <View>
                  <Heading color={"#fff"}>Jugar ahora</Heading>
                  <TouchableOpacity onPress={() => {
                      router.push({pathname: 'app/tabs/partidos/explorar-partidos'})

                    sheetRef.current.expand()
                    setBottomUpProps({
                      title: 'CANCHA RESERVADA CORRECTAMENTE!',
                      paragraph: 'PPT Pilar - Cancha 1 • 9:00 — 10:00',
                      buttonTitle: 'Invitar amigos a la reserva',
                      onPress: () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      },
                      loading: false,
                    });
                    }}>
                    <Text color={'#fff'} size={'14px'}>Ver partidos por Zona Norte</Text>
                  </TouchableOpacity>
                </View>
                <NearbyMatches />
              </>
            ) 
            // }
            )
            }
          
      
    
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 40, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
            <MainButton
              onPress={() => {
                countryBottomSheetRef.current.expand()
                // setBottomUpProps({
                //   title: 'Proximamente disponible!!!!',
                //   paragraph: 'Estás con ganas de jugar?',
                //   buttonTitle: 'Anotate a la beta!',
                //   onPress: () => {
                //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                //     console.log('presssssin')
                      // router.push({  params: {newMatchSport: 'Paddle'}, pathname: '(app)/createMatch'})
                //     loading: true
                //   },
                //   loading: false,
                // });
              }}
            bgColor={Colors.primaryGreen} ctaText={"Crear Partido"} color={Colors.darkGreen} icon={'Add'} />
          </View>
        
          <MapCard user={user} href={'(tabs)/map'} enableScroll={false}/>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 40}}>
            <Heading color={"#fff"}>Buscar Profesores</Heading>
            <TouchableOpacity onPress={() => {
              sheetRef.current.expand()
              setBottomUpProps({
                title: 'CANCHA RESERVADA CORRECTAMENTE!',
                paragraph: 'PPT Pilar - Cancha 1 • 9:00 — 10:00',
                buttonTitle: 'Invitar amigos a la reserva',
                onPress: () => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                },
                loading: false,
              });
              }}>
              <SubHeading size={'16px'} isBold color={'#fff'}>Ver todos</SubHeading>
            </TouchableOpacity>
          </View>

          <NearbyCoaches />

          <Share />
          <View style={{paddingBottom: 300}}></View>
        </ScrollView>
    
        <BottomUp
          {...bottomUpProps}
          sheetRef={sheetRef}
          
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            sheetRef.current.close();
          }}
        />
        <BottomSelect selection hasTabs ref={countryBottomSheetRef} />
        </>
     </Container>
    </>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
