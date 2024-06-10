import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { AnimatedRegion, Animated, Marker } from 'react-native-maps';
import { Colors, Generals } from '../../src/components/constants.js';
import Container from '../../Container.js';
import PageHeader from '../../src/components/header/page-header.js';
import { Heading, SubHeading, Span, BorderView } from '../../src/components/styled-components.js';
import { fetchCourtDetails } from '../../api/functions.js';
import MapMarker from '../../src/components/mapMarker.js';



const { width } = Dimensions.get('screen');

const CourtScreen = () => {
  const { courtId } = useLocalSearchParams();
  console.log('courtId:', courtId); 
  const [court, setCourt] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (courtId) {
      const fetchCourtData = async () => {
        try {
          const data = await fetchCourtDetails(courtId);
          console.log(data)
          setCourt(data.attributes);
          console.log(JSON.stringify(court, null, 2))
        } catch (error) {
          console.error('Error fetching court details:', error);
        }
      };
      fetchCourtData();
    }
  }, [courtId]);

  if (!court) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.attributes?.formats?.medium?.url }} style={{ width, height: 250 }} />
  );

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / (width - 40));
    setCurrentIndex(index);
  };

  return (
    <View bgColor={Colors.lightBlue}>
     
     <View style={{marginTop: 50, position: "absolute", top: 0, left: 0, zIndex: 10}}>
         <PageHeader />
    </View>

      <MapView
        style={{ width: '100%', height: 300 }}
        initialRegion={{
          latitude: court.location?.latitude,
          longitude: court.location?.longitude,
          latitudeDelta: "0.01",
          longitudeDelta: "0.01",
        }}
      >
        <Marker
          coordinate={{
            latitude: court.location?.latitude,
            longitude: court.location?.longitude,
          }}
        >
          <MapMarker
                uri={court.cover?.data?.attributes?.formats?.medium?.url}
                title={court.name}
                id={court.id}
                // isSelected={selectedMarker === court.id}
              />
          
        </Marker>
      </MapView>

      <View style={{padding: 20, gap: 30}}>
      <View style={{ padding: 20, backgroundColor: Colors.darkGreen, borderRadius: Generals.borderRadius }}>
        <Heading color={Colors.white}>{court.name}</Heading>
        <SubHeading color={Colors.white}>{court.location.address}, {court.location.city}</SubHeading>
        <Span bgColor={Colors.white} />
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
          <BorderView>
            <Text style={{ color: Colors.white }}>Paddle</Text>
          </BorderView>
          <BorderView>
            <Text style={{ color: Colors.white }}>Tennis</Text>
          </BorderView>
          <BorderView>
            <Text style={{ color: Colors.white }}>Snackbar</Text>
          </BorderView>
          <BorderView>
            <Text style={{ color: Colors.white }}>Vestuarios</Text>
          </BorderView>
        </View> */}
      </View>
      <FlatList
        data={court.gallery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, borderRadius: Generals.borderRadius }}>
        {court.gallery?.data?.map((_, index) => (
          <View
            key={index}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: currentIndex === index ? Colors.primaryGreen : Colors.lightGrey,
              margin: 5,
            }}
          />
        ))}
      </View>
      </View>
      
    </View>

  );
};

export default CourtScreen;
