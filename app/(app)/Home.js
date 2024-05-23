import React, {useState, useEffect} from 'react'
import { StyleSheet, View, StatusBar, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
const { height } = Dimensions.get('screen');
import * as Haptics from 'expo-haptics';

import Container from '../../Container.js'
import { Heading, Text } from '../../src/components/styled-components.js';
// import NearbyMatches from '../../components/matchesCarrousel.js'
// import NearbyCoaches from '../../components/coachesCarrousel.js'
// import {Colors} from '../../components/constants.js'



// import Header from '../../components/header/header.js'
// import BottomUp from '../../components/BottomUp.js'
// import MainButton from '/../../components/button.js';
// import MapCard from '../../components/home/MapCard.js';
// import Share from '../../components/share.js';



const Home = ({...props}) => {
  const sheetRef = React.useRef(null);

  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });

  
  return (
    <Container>
      <View></View>
    </Container>
  )
}

export default Home;

