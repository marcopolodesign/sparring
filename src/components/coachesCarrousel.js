import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, ImageBackground } from 'react-native';
import { Colors } from '../components/constants.js';
import { SubHeading } from '../components/styled-components.js';
import * as Haptics from 'expo-haptics';
import { getCoaches } from '../../api/functions.js';
import {useSelector} from 'react-redux';

const { height, width } = Dimensions.get('screen');

const CoachesCarousel = () => {
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backUrl = useSelector(state => state.backUrl);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches();
        setCoaches(data);
        // console.log(JSON.stringify(coaches, null,2))
      } catch (error) {
        console.error('Error fetching coaches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const renderCoachItem = ({ item }) => {
    return (
      <View style={{ padding: 15, backgroundColor: '#fff', borderRadius: 8, width: width * 0.78, marginLeft: 20, position: 'relative' }}>
        <View style={{ position: 'absolute', backgroundColor: Colors.primaryGreen, height: "30%", width: width * 0.78, top: 0, left: 0, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}></View>
        <View>
          <ImageBackground
            source={{ uri: backUrl + item.profilePicture?.formats?.thumbnail?.url }}
            style={{ width: 160, height: 160, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden', marginBottom: 20 }}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <SubHeading size={'22px'} color={Colors.darkGreen} weight={'bold'}>{item.firstName} {item.lastName}</SubHeading>
          <SubHeading size={'16px'} color={Colors.textGrey} weight={'bold'}>{item.description || 'Doy clases hace más de 10 años a adultos, niños y adolescentes desde nivel inicial hasta avanzado'}</SubHeading>
        </View>
      </View>
    );
  };

  const ref = React.useRef();

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <SubHeading>Loading...</SubHeading>
        </View>
    );
    }

  return (
    <View style={{ marginLeft: -20, marginRight: -20 }}>
      <FlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        initialScrollIndex={0}
        snapToInterval={width * 0.80}
        decelerationRate={'fast'}
        disableIntervalMomentum={true}
        maxToRenderPerBatch={2}
        scrollEnabled={true}
        data={coaches}
        contentContainerStyle={{ flexDirection: 'row', marginTop: 20, paddingLeft: -20, marginRight: -20 }}
        renderItem={renderCoachItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CoachesCarousel;
