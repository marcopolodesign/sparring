import { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../components/constants.js';
import { Heading, SubHeading, Text, ViewJustifyCenter, Span } from '../components/styled-components.js';
import { Dimensions } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import PhotoMin from './photo-min.js';
import Players from './match-card/players.js';
import SignUp from './match-card/SignUp.js';
import * as Haptics from 'expo-haptics';
import { getMultipleMatchDetails } from '../../api/functions.js';
import { useSelector, useDispatch } from 'react-redux';

const { height, width } = Dimensions.get('screen');

const OwnMatches = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [userMatches, setUserMatches] = useState([]);

  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);

  const prevUserMatches = useRef(user.matches);
  const isPartidosView = props.partidosView;


  const dispatch = useDispatch();

  const fetchUserMatches = async () => {
    try {
      const matchIds = user.matches.map((match) => match.id);
      const fetchedUserMatches = await getMultipleMatchDetails(matchIds);

      setMatches(fetchedUserMatches); // Ensure user.matches is correctly set here
      setUserMatches(fetchedUserMatches);
      // console.log(fetchedUserMatches, 'FETCHED MATCHES');
      // console.log(fetchedUserMatches.length, 'LENGTHHHH');

      setIsLoading(false);
      
      if (props.setChildIsLoading) {
        setTimeout(() => {
            props.setChildIsLoading(false);
        }, 2000);
      }
      // dispatch({ type: 'SET_IS_READY'});

    } catch (error) {
      console.error('Error fetching OWN matches:', error.message);
    }
  };

  useEffect(() => {
    fetchUserMatches();
  }, []);

  if (!user.matches) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const matchContent = (match) => (
    <View id={match.id} style={[isPartidosView ? styles.flatContent : styles.flatContentHome, {   padding: 15, backgroundColor: '#fff', borderWidth: 2, borderColor: '#fff', borderRadius: 8, flex: 1}]}>
      <ViewJustifyCenter>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <PaddleRaquet />
          <Text size={'18px'} color={'black'}>
            {match.sport?.sport}
          </Text>
        </View>
        <Text size={'18px'} color={'#A8A8A8'}>
          {match.time}
        </Text>
      </ViewJustifyCenter>

      <Span bgColor={Colors.lightGrey} />

      <ViewJustifyCenter>
        {match.ammount_players > 2 ? (
          <>
            {/* Case Doubles */}
            <Players spots={match.ammount_players} players={match.members.slice(0,2)} />
            <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>

            {match.ammount_players > match.members.length ? (
              <SignUp
                players={match.ammount_players}
                match={match}
                user={user}
                onPress={() => {
                  router.push({
                    pathname: '(app)/partido',
                    params: { idMatch: match.id },
                  });
                }}
              />
            ) : ( 
              <Players players={match.members.slice(2,4)} spots={match.ammount_players} textColor={Colors.textGrey} />
            )}
          </>
        ) : (
          // Case Singles
          <>
            <Players isOwner spots={match.ammount_players} players={match.members} />
            <Text style={{ padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen }}>VS</Text>

            {match.ammount_players > match.members.length ? (
              <SignUp
                players={match.ammount_players}
                match={match}
                user={user}
                onPress={() => {
                  router.push({
                    pathname: '(app)/partido',
                    params: { idMatch: match.id },
                  });
                }}
              />
            ) : match.members.length >= 2 ? (
              <>
                {/* {console.log(match.members.length, 'LENGTHHHH')} */}
                {/* {console.log(match.members)} */}
                <Players user={match.members} spots={match.ammount_players} players={match.members} source={match.members.profilePictureUrl} textColor={Colors.textGrey} />
              </>
            ) : null}
          </>
        )}
      </ViewJustifyCenter>
    </View>
  );

  const openMatches = (match) => {
    // if (userMatches.length < 0) {
    //   return <Text style={{ color: '#fff' }}>There are no matches available</Text>;
    // }

    return match.members.length >= match.ammount_players ? (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: '(app)/partido',
            params: { idMatch: match.id },
          });
        }}
      >
        {matchContent(match)}
      </TouchableOpacity>
    ) : (
      <>{matchContent(match)}</>
    );
  };

  const ref = useRef(null);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={isPartidosView ? styles.containerPartidos : styles.containerHome}>
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={!isPartidosView}
          initialScrollIndex={isPartidosView ? null : 0}
          snapToInterval={isPartidosView ? null : (width * 0.83) + 21}
          decelerationRate={isPartidosView ? 'normal' : 'fast'}
          disableIntervalMomentum={!isPartidosView}
          maxToRenderPerBatch={12}
          scrollEnabled={true}
          data={matches}
          contentContainerStyle={isPartidosView ? styles.flatChild : styles.flatChildHome}
          renderItem={({ item }) => openMatches(item)}
      />
    </View>
  );
};

export default OwnMatches;


const styles = StyleSheet.create({
  containerPartidos : {
      paddingHorizontal: 20,
      flex: 1,
  },
  containerHome: {
      marginLeft: -20, marginRight: -20, marginTop: 20
  },
  flatChildHome: {
      flexDirection: 'row',
      paddingLeft: -20,
      marginRight: -20,
  },
  flatChild: {
      flexDirection: 'column',
      marginTop: 20,
      // backgroundColor: Colors.primaryGreen,
      paddingBottom: 300
  },
  flatContentHome: {
      width: width * 0.83,
      marginLeft: 20
  },
  flatContent : {
      marginBottom: 20,
      flex: 1,
      flexGrow: 0,
      minHeight: 130, // Ensure minimum height
  }
});
