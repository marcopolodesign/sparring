import React, { useState, useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'
import { Text, View, Dimensions } from 'react-native'
import {Stack, router} from 'expo-router'
import { useLocalSearchParams } from 'expo-router';
import {Colors, Generals} from '../../src/components/constants.js'
import Container from '../../Container.js'
import PageHeader from '../../src/components/header/page-header.js'
import { BorderView, Heading, Span, SubHeading, ViewJustifyCenter } from '../../src/components/styled-components.js'
import { ScrollView } from 'react-native-gesture-handler'
import MatchOwner from '../../src/components/friend-h-single.js'
import { getMatchDetails } from '../../api/functions.js'
const { height, width } = Dimensions.get('screen');
import * as Haptics from 'expo-haptics'

import MatchPlayers from '../../src/components/friend-v-single.js'

// import Icons
import PaddleRaquet from '../../src/assets/icons/paddle-raquet.js'
import LocationPin from '../../src/assets/icons/location-pin.js'
import Calendar from '../../src/assets/icons/calendar.js'
import SignUp from '../../src/components/match-card/SignUp.js'

import BottomUp from '../../src/components/BottomUp.js'
import { id } from 'date-fns/locale';

const Match = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [match, setMatch] = useState([]);
  const members = match.members || [];
  const matchOwner = match.match_owner || {};
  const partidoRef = useRef(null);
  const params = useLocalSearchParams();


  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });

  useEffect(() => {
    const loadMatch = async () => {
      try {
      
        const match = await getMatchDetails(params.idMatch);
        setMatch(match);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching match:', error.message);
      }
    };
    loadMatch();
  }, []);

  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);
  const profilePictureUrl = user?.profilePicture?.formats?.thumbnail?.url;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            animation: 'fade_from_bottom',
            backgroundColor: Colors.lightBlue,
          }}
          title="Partido"
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container bgColor={Colors.lightBlue}>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          animation: 'fade_from_bottom',
          backgroundColor: Colors.lightBlue,
        }}
        title="Partido"
      />

    

      <ScrollView style={{  flex: 1 }}>
        <PageHeader />
        <View style={{ padding: 20, zIndex: 3  }}>
          <View
            style={{
              borderRadius: Generals.borderRadius,
              backgroundColor: Colors.darkGreen,
              paddingHorizontal: 20,
              paddingVertical: 25,
              marginTop: 30,
              alignItems: 'flex-start',
            }}
          >
            <Heading color={Colors.primaryGreen}>
              {matchOwner.firstName} va a jugar al {match.sport.sport} en {match.location.address} , el {match.date} a las {match.time}HS
            </Heading>
            <Span bgColor={'#fff'} />
            <SubHeading size={'16px'} color={'#fff'}>
              {match.description}
            </SubHeading>
            <Span bgColor={'#fff'} />

            <MatchOwner user={matchOwner} source={matchOwner.profilePictureUrl} textColor={Colors.primaryGreen} hasArrow={'true'} />
          </View>

          <BorderView
            style={{ marginVertical: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 }}
          >
            <PaddleRaquet />
            <SubHeading size={'16px'} color={Colors.textGrey}>
              {match.sport.sport} • Intermedio
            </SubHeading>
          </BorderView>

          <ViewJustifyCenter style={{ gap: 20, flex: 1 }}>
            <BorderView style={{ alignItems: 'center', gap: 10 }}>
              <Calendar color={'#000'} />
              <SubHeading textCenter size={'16px'} color={Colors.textGrey}>
                {match.date}
              </SubHeading>
            </BorderView>
            <BorderView style={{ alignItems: 'center', gap: 10 }}>
              <LocationPin color={'#000'} />
              <SubHeading textCenter size={'16px'} color={Colors.textGrey}>
                {match?.location?.address}
              </SubHeading>
            </BorderView>
          </ViewJustifyCenter>

          <BorderView style={{ gap: 20, flex: 1, marginVertical: 20 }}>
            <SubHeading style={{ fontWeight: 'bold' }} color={'#000'} size={'16px'}>
              Jugadores
            </SubHeading>

            <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <ViewJustifyCenter style={{ gap: 10 }}>
                {members.map((member, index) => (
                  <MatchPlayers key={index} user={member} source={member.profilePictureUrl} textColor={Colors.textGrey} />
                ))}
              </ViewJustifyCenter>
              <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>
              <SignUp
                onPress={() => {
                  partidoRef.current.expand();
                  setBottomUpProps({
                    title: 'Ya estás anotado!',
                    paragraph: `${match.location.address} • ${match.date} — ${match.time}`,
                    buttonTitle: 'Cerrar',
                    onPress: () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    },
                    loading: false,
                  });
                }}
              />
            </View>
          </BorderView>
        </View>


        <View style={{marginBottom: 100}}></View>
        <View
          style={{ position: 'absolute', width: '100%', bottom: 0, left: 0, zIndex: 1, backgroundColor: '#f9f9f9', height: '86%' }}
        /> 
      </ScrollView>


      <BottomUp
        {...bottomUpProps}
        sheetRef={partidoRef}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          partidoRef.current.close();
          router.replace('/');
        }}
      />
    </Container>
  );
};


export default Match