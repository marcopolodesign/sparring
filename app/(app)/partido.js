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
import { getMatchDetails, addMemberToMatch } from '../../api/functions.js'
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
        // console.log('Match from partidos.js:', JSON.stringify(match, null, 2));
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

    
      <ScrollView 
      contentContainerStyle={{flexGrow: 1}}
      style={{ flex: 1, position: 'relative', minHeight: height}}>
        <PageHeader canEdit/>
        <View style={{ padding: 20, zIndex: 3, gap: 20}}>

          {matchOwner.id != user.id && (
          <View
            style={{
              borderRadius: Generals.borderRadius,
              backgroundColor: Colors.darkGreen,
              paddingHorizontal: 20,
              paddingVertical: 25,
              marginTop: 0,
              alignItems: 'flex-start',
            }}
          >
            <Heading color={Colors.primaryGreen}>
              {matchOwner.firstName} va a jugar al {match.sport.sport} en {match.location?.address.split(',')[0]}, el {match.date} a las {match.time}HS
            </Heading>

            {match.description && (
              <>
              <Span bgColor={'#fff'} />
              <SubHeading size={'16px'} color={'#fff'}>
                {match.description}
              </SubHeading>
              <Span bgColor={'#fff'} />
              </>
            )}

            <MatchOwner user={matchOwner} source={matchOwner.profilePictureUrl} textColor={Colors.primaryGreen} hasArrow={'true'} 
            
            />
          </View>
          )}

          <BorderView
            style={{ marginVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, backgroundColor: '#fff' }}
          >
            <PaddleRaquet />
            <SubHeading size={'16px'} color={Colors.textGrey}>
              {match.sport.sport} • {match.ammount_players === 2 ? 'Singles' : 
            'Dobles' } • Intermedio 
            </SubHeading>
          </BorderView>


            <BorderView style={{ gap: 20, flex: 1}}>
              <SubHeading style={{ fontWeight: 'bold' }} color={'#000'} size={'16px'}>
                Jugadores
              </SubHeading>

              <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                { match.ammount_players > 2 ? (
                  // Case Doubles
                  <>
                  <ViewJustifyCenter style={{ gap: 10 }}>
                  {members.slice(0, 2).map((member, index) => (
                      <MatchPlayers key={index} user={member} source={member.profilePictureUrl} textColor={Colors.textGrey} />
                    ))}
                  </ViewJustifyCenter>
                  <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>


                  {match.ammount_players > match.members.length ? (
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
                    />) 
                    : (
                      members.slice(2, 4).map((member, index) => (
                        <MatchPlayers key={index} user={member} source={member.profilePictureUrl} textColor={Colors.textGrey} />
                      ))
                    ) }
                  </>
                ) : 
                // Case Singles
                <>
                   <MatchPlayers user={members[0]} source={members[0].profilePictureUrl} textColor={Colors.textGrey} />
                   <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>
                  
                   {match.ammount_players > match.members.length ? (
                    <SignUp
                      onPress={ async () => {
                        await addMemberToMatch(match.id, user.id);
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
                    />) : 
                    <MatchPlayers user={members[1]} source={members[1].profilePictureUrl} textColor={Colors.textGrey} /> }
                </>}

                
              </View>
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
                {match?.time}
              </SubHeading>
            </BorderView>
          </ViewJustifyCenter>

          <BorderView style={{ alignItems: 'center', gap: 10, flexDirection: 'row', justifyContent: 'center' }}>
              <LocationPin color={'#000'} />
              <SubHeading textCenter size={'16px'} color={Colors.textGrey}>
                {match?.location?.address?.split(',')[0]}
              </SubHeading>
            </BorderView>

       
        </View>


        <View style={{marginBottom: 100}}></View>
        <View
            style={{ position: 'absolute', width: '100%', bottom: '-0%', left: 0, zIndex: 1, backgroundColor: '#f9f9f9', height: '89%', alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}
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