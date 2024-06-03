import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Heading, SubHeading, Button, ViewJustifyCenter, BorderView } from '../../src/components/styled-components.js';
import { Colors, Generals } from '../../src/components/constants.js';
import Container from '../../Container.js';
import PageHeader from '../../src/components/header/page-header.js';
import MainButton from '../../src/components/button.js';
import Whapp from '../../src/assets/icons/whapp.js';
import LocationIcon from '../../src/assets/icons/location-pin.js';
import Socials from '../../src/components/profile/socials.js';
import Friends from '../../src/components/friends-list.js';
import { fetchUser } from '../../api/functions.js'; // Import your fetchUser function
import { set } from 'date-fns';

const Profile = () => {
  const dispatch = useDispatch();
  const { playerID } = useLocalSearchParams(); // Get userId from URL parameters
  const [user, setUser] = useState(null);
  const [image, setImage] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [backUrl, setBackUrl] = useState(null);

  const backUpURL = useSelector(state => state.backUrl)

 
  if (!backUrl) {
    setBackUrl(backUpURL);
  }

  const fetchUserData = async (id) => {
    try {
      const fetchedUser = await fetchUser(id);
      setUser(fetchedUser);
      setProfileImage(fetchedUser?.profilePicture.formats.thumbnail.url);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (playerID) {
      fetchUserData(playerID);
    }
  }, [playerID]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const userData = [
    { title: 'Partidos', data: 16 },
    { title: 'Amigos', data: 20 },
    { title: 'Desde', data: 2024 },
  ];

  return (
    <Container bgColor={Colors.primaryGreen}>
      <ScrollView style={{ flex: 1 }}>
        <PageHeader />
        <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 60, alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={{ transform: [{ translateY: -80 }], alignItems: 'center', flex: 1 }}>
              <ImageBackground
                source={{ uri: profileImage }}
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#fff',
                  overflow: 'hidden',
                  marginBottom: 20,
                }}
              />
            <Heading color={Colors.darkGreen}>
              {user.firstName} {user.lastName && user.lastName}
            </Heading>
            <SubHeading style={{ textAlign: 'center' }} color={Colors.textGrey}>
              {user.description}
            </SubHeading>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
              <MainButton bgColor={Colors.primaryGreen} ctaText={'Agregar a amigos'} color={Colors.darkGreen} icon={'Add'} />
              <Whapp />
            </View>

            <ViewJustifyCenter style={{ marginTop: 20, flexDirection: 'row', gap: 10, flex: 1, textAlign: 'center' }}>
              {userData.map((data, index) => (
                <BorderView style={{ alignItems: 'center' }} key={index}>
                  <Heading size={'36px'} style={{ textAlign: 'center', flex: 1 }} color={Colors.darkGreen}>
                    {data.data}
                  </Heading>
                  <SubHeading numberOfLines={1} size={'16px'} style={{ marginTop: 5, flex: 1 }} color={Colors.textGrey}>
                    {data.title}
                  </SubHeading>
                </BorderView>
              ))}
            </ViewJustifyCenter>

            {user.location && (
              <BorderView style={{ flex: 1, marginVertical: 10, flexDirection: 'row', gap: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                <LocationIcon color={'#000'} />
                <SubHeading color={Colors.textGrey}>{user.address}</SubHeading>
              </BorderView>
            )}

            <Socials user={user} />

            <Friends user={user} backUrl={backUrl} />

            <Text style={{ color: '#bbb', marginTop: 10 }}>{backUrl}</Text>
            <View style={{ marginBottom: 100 }}></View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;
