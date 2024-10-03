import { useState, useEffect, useRef, useCallback } from 'react';
import { router } from 'expo-router';
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Colors } from '../components/constants.js';
import { Heading, SubHeading, Text, ViewJustifyCenter, Span } from '../components/styled-components.js';
import { Dimensions } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import Arrow from '../assets/icons/arrow-left.js';
import LocationPin from '../assets/icons/location-pin.js';
import * as Haptics from 'expo-haptics';
import { getMultipleMatchDetails, getAllMatches } from '../../api/functions.js';
import { useSelector, useDispatch } from 'react-redux';
import PlayerSet from './match-card/PlayerSet.js';

const { height, width } = Dimensions.get('screen');

const OwnMatches = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);

  const prevUserMatches = useRef(user.matches);
  const isPartidosView = props.partidosView;



  const dispatch = useDispatch();

  const fetchUserMatches = async () => {
    try {
      const matchIds = user.matches?.map((match) => match.id);
      // const fetchedUserMatches = await getMultipleMatchDetails(matchIds, user.id);
      const fetchedUserMatches = await getAllMatches(user.id, 1);

      setMatches(fetchedUserMatches); // Ensure user.matches is correctly set here
      setUserMatches(fetchedUserMatches);
      // console.log(JSON.stringify(fetchedUserMatches, 2, ' ') );
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // LoadMatches()
    console.log('testing refresh ownmatches')
  }, []);


  if (!user.matches) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

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
          
          style={{marginBottom: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SubHeading color="black" isBold >{match.date.split(' ').slice(0, 2).join(' ')} • {match.time}hs</SubHeading> 
              <Arrow width={20} color={Colors.blue} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 0}}>
              <LocationPin color={Colors.textGrey} width={20}/> 
              <Text style={{color: Colors.textGrey, fontSize: 15}}>{match.location?.address?.split(' ').slice(0, 3).join(' ').replace(/,$/, '')}{match.id}</Text>
            </View>

            {/* <Span bgColor={Colors.lightGrey} /> */}
          </TouchableOpacity>

          
        )}

        <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
           <PlayerSet match={match} isPartidosView/>
        </View>
      </View>
    </TouchableOpacity>
  );

  const openMatches = (match) => {
    // if (userMatches.length < 0) {
    //   return <Text style={{ color: '#fff' }}>There are no matches available</Text>;
    // }

    return match.members?.length >= match.ammount_players ? (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: '(app)/partido',
            params: { idMatch: match.id },
          });
        }}
      >

        {console.log('aca?')}
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
          refreshControl={
            <RefreshControl tintColor={Colors.primaryGreen} refreshing={refreshing} onRefresh={onRefresh} />
           }
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
