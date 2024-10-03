import { useState, useEffect, useRef, useCallback } from 'react';
import { router } from 'expo-router';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Colors } from '../components/constants.js';
import { Heading, SubHeading, Text, ViewJustifyCenter, Span } from '../components/styled-components.js';
import { Dimensions } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import PhotoMin from './photo-min.js';
import Players from './match-card/players.js';
import SignUp from './match-card/SignUp.js';
import * as Haptics from 'expo-haptics';
import { getAllMatches } from '../../api/functions.js';
import { useSelector } from 'react-redux';
import Calendar from '../assets/icons/calendar.js';
import LocationPin from '../assets/icons/location-pin.js';
import PlayerSet from './match-card/PlayerSet.js';
import Arrow from '../assets/icons/arrow-left.js';
import { set } from 'date-fns';


const { height, width } = Dimensions.get('screen');

const MatchesCarrousel = ({ ...props }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);

  const hasMatch = props.hasMatches;
  const isPartidosView = props.partidosView;
  const { setMatchesLength } = props; // Destructure setMatchesLength

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    LoadMatches();
  }, []);

  const LoadMatches = () => {
    if (!hasMatch) {
      const loadMatch = async () => {
        try {
          const match = await getAllMatches(user.id);
          setMatches(match);  
          setIsLoading(false);
          setRefreshing(false);

          // Pass the number of matches to the parent component
          if (typeof setMatchesLength === 'function') {
            setMatchesLength(match.length); // Update the parent with the number of matches
          }
        } catch (error) {
          console.error('Error fetching match:', error.message);
        }
      };
      loadMatch();
    } else {
      setMatches(user.matches);
      setIsLoading(false);
      setRefreshing(false);

      // Pass the number of user matches to the parent component
      if (typeof setMatchesLength === 'function') {
        setMatchesLength(user.matches.length); // Update the parent with the number of matches
      }
    }
  };

  useEffect(() => {
    LoadMatches();
  }, []);

  const matchContent = (match) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '(app)/partido',
          params: { idMatch: match.id },
        });
      }}
    >
      <View
        id={match.id}
        style={[
          isPartidosView ? styles.flatContent : styles.flatContentHome,
          {
            padding: 15,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 8,
            flex: 1,
          },
        ]}
      >
        <ViewJustifyCenter>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <PaddleRaquet />
            <Text size={'18px'} color={'black'}>
              {match.sport?.sport} • {match.ammount_players > 2 ? 'Dobles' : 'Singles'}
            </Text>
          </View>
          <Text size={'18px'} color={'#A8A8A8'}>
            {match.time}hs
          </Text>
        </ViewJustifyCenter>

        <Span bgColor={Colors.lightGrey} />

        {isPartidosView && (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '(app)/partido',
                params: { idMatch: match.id },
              });
            }}
            style={{ marginBottom: 15 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SubHeading color="black" isBold>
                {match.date.split(' ').slice(0, 2).join(' ')} • {match.time}hs
              </SubHeading>
              <Arrow width={20} color={Colors.blue} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 0 }}>
              <LocationPin color={Colors.textGrey} width={20} />
              <Text style={{ color: Colors.textGrey, fontSize: 15 }}>
                {match.location.address.split(' ').slice(0, 3).join(' ').replace(/,$/, '')}
                {match.id}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <PlayerSet match={match} isPartidosView />
        </View>
      </View>
    </TouchableOpacity>
  );

  const openMatches = (match) => {
    if (matches.length === 0) {
      return <Text style={{ color: '#fff' }}>There are no matches available</Text>;
    }
    if (hasMatch) {
      if (match.match_owner.id === user.id) {
        return null;
      }
    } else {
      if (
        match.members.length >= match.ammount_players ||
        match.members?.some((member) => member.id === user.id) ||
        match.match_owner.id === user.id
      ) {
        return null;
      }
    }

    return match.members?.length >= match.ammount_players ? (
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
        snapToInterval={isPartidosView ? null : width * 0.83 + 21}
        decelerationRate={isPartidosView ? 'normal' : 'fast'}
        disableIntervalMomentum={!isPartidosView}
        maxToRenderPerBatch={12}
        scrollEnabled={true}
        data={matches}
        contentContainerStyle={isPartidosView ? styles.flatChild : styles.flatChildHome}
        renderItem={({ item }) => openMatches(item)}
        refreshControl={
          isPartidosView ? <RefreshControl tintColor={Colors.primaryGreen} refreshing={refreshing} onRefresh={onRefresh} /> : null
        }
      />
    </View>
  );
};

export default MatchesCarrousel;

const styles = StyleSheet.create({
  containerPartidos: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containerHome: {
    marginLeft: -20,
    marginRight: -20,
    marginTop: 20,
  },
  flatChildHome: {
    flexDirection: 'row',
    paddingLeft: -20,
    marginRight: -20,
  },
  flatChild: {
    flexDirection: 'column',
    marginTop: 20,
    paddingBottom: 300,
  },
  flatContentHome: {
    width: width * 0.83,
    marginLeft: 20,
  },
  flatContent: {
    marginBottom: 20,
    flex: 1,
    flexGrow: 0,
    minHeight: 130, // Ensure minimum height
  },
});