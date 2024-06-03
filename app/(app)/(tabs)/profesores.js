import { useState, useEffect } from 'react';
import {useSelector}  from 'react-redux';
import {  StyleSheet, View, ScrollView, ImageBackground, Dimensions} from 'react-native';
import {Stack} from 'expo-router'
import { SubHeading } from '../../../src/components/styled-components.js';
import {Colors} from '../../../src/components/constants.js'
import Container from '../../../Container.js'
import { getCoaches } from '../../../api/functions.js';
import Profile from '../../../src/screens/Profile.js';
import MapCard from '../../../src/components/home/MapCard.js';

const { height, width } = Dimensions.get('screen');

export default function Profesores({...props}) {

  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backUrl = useSelector(state => state.backUrl);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches();
        setCoaches(data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <SubHeading>Loading...</SubHeading>
        </View>
    );
    }

  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="Profesores"/>
      <ScrollView>
   
       <View style={{gap: 30, flex: 1, paddingHorizontal: 20}}>
          {coaches.map((coach, index) => (
            <View style={{ padding: 15, backgroundColor: '#fff', borderRadius: 8}}>
             <View style={{ position: 'absolute', backgroundColor: Colors.primaryGreen, height: "30%", width: width * 0.907, top: 0, left: 0, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}></View>
             <View>
               <ImageBackground
                 source={{ uri: backUrl + coach.profilePicture?.formats?.thumbnail?.url }}
                 style={{ width: 160, height: 160, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden', marginBottom: 20 }}
               />
             </View>
             <View style={{ marginTop: 25 }}>
               <SubHeading size={'22px'} color={Colors.darkGreen} weight={'bold'}>{coach.firstName} {coach.lastName}</SubHeading>
               <SubHeading size={'16px'} color={Colors.textGrey} weight={'bold'}>{coach.description || 'Doy clases hace más de 10 años a adultos, niños y adolescentes desde nivel inicial hasta avanzado'}</SubHeading>
             </View>
           </View>
          ))}
       </View>
            
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
