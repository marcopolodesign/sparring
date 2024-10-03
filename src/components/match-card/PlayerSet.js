import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../constants'; // Assuming you have a Colors constant file
import Players from './players';
import { Text } from '../styled-components';
import SignUp from './SignUp';
import PhotoMin from '../photo-min';
import { addMemberToMatch } from '../../../api/functions';

const PlayerSet = ({ match, user, isPartidosView, canSignUp, partidoRef, setBottomUpProps }) => {

  // const isUserNotInMatch = !match.members.some(member => member.id === 0); // Check if user is not in the match


  return (
    <>
    {console.log(canSignUp, 'puede anotarse')}
  
      {match.ammount_players > 2 ? (
        <>
          {/* Case Doubles */}
          <Players
            spots={match.ammount_players}
            member_1={match.member_1}
            member_2={match.member_2}
            matchProp={match}
            photoSize={isPartidosView ? 'big' : null}
          />
          {!match.member_2 && (
            <SignUp
              match={match}
              user={user}
              onPress={async () => {
                if (canSignUp) {
                    // console.log(memberKey, 'memberKey');
                await addMemberToMatch(match.id, user.id, 2);
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
                } else {
                router.push({
                    pathname: '(app)/partido',
                    params: { idMatch: match.id, playerPos: 2 },
                });
                }
            }}
            />
          )}

          <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>

          {match.member_3 && match.member_4 ? (
            // Hay que modificar para que tome los últimos 2 jugadores, ver cómo se pasa eso por props
            <Players
            matchProp={match} 
            member_1={match.member_3}
            member_2={match.member_4}
            photoSize={isPartidosView ? 'big' : null}
            />) 
            : 
            <>
              {[3, 4].map((memberIndex) => {
                const memberKey = `member_${memberIndex}`;
                const playerPos = memberIndex; // Position for the `onPress` function

                return !match[memberKey] ? (
                    <SignUp
                    key={memberKey}
                    match={match}
                    user={user}
                    onPress={async () => {
                        if (canSignUp) {
                            console.log(memberKey, 'memberKey');
                        await addMemberToMatch(match.id, user.id, playerPos);
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
                        } else {
                        router.push({
                            pathname: '(app)/partido',
                            params: { idMatch: match.id, playerPos: playerPos },
                        });
                        }
                    }}
                    />
                ) : (
                    <View key={memberKey} style={{ flexDirection: 'column' }}>
                    <PhotoMin sourceImg={match[memberKey]?.profilePictureUrl} size={isPartidosView ? 'big' : null} />
                    <Text style={{ textAlign: 'center' }} color={Colors.textGrey}>
                        {match[memberKey]?.firstName}
                    </Text>
                    </View>
                );
                })}
            </>
          }
        </>
      ) : (
        <>
          {/* Case Singles */}
          <Players
            spots={match.ammount_players}
            players={match.members}
            matchProp={match}
            member_1={match.member_1}
            photoSize={isPartidosView ? 'big' : null}
          />
          <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>

          {match.ammount_players > match.members?.length ? (
            <SignUp
              players={match.ammount_players}
              match={match}
              user={user}
              onPress={async () => {
                if (canSignUp) {
                await addMemberToMatch(match.id, user.id, 2);
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
                } else {
                router.push({
                    pathname: '(app)/partido',
                    params: { idMatch: match.id, playerPos: 2 },
                });
                }
            }}
            />
          ) : match.members?.length >= 2 ? (
            <View style={{ flexDirection: 'column' }}>
              <PhotoMin sourceImg={match.member_2?.profilePictureUrl} size={isPartidosView ? 'big' : null} />
              <Text style={{ textAlign: 'center' }} color={Colors.textGrey}>
                  {match.member_2?.firstName}
              </Text>
              </View> ) 
          : null }
        </>
      )}
    </>
  );
};

export default PlayerSet;