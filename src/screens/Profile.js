import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Link, router } from 'expo-router';
import { Heading, SubHeading, Button, ViewJustifyCenter, BorderView } from '../components/styled-components.js'
import { Colors, Generals } from '../../src/components/constants.js'


import Container from '../../Container.js'
import PageHeader from '../../src/components/header/page-header.js'
import MainButton from '../../src/components/button.js'
import Whapp from '../assets/icons/whapp.js'
import LocationIcon from '../assets/icons/location-pin.js'

import Socials from '../components/profile/socials.js';
import Friends from '../components/friends-list.js';




const Profile = () => {
    
    const session = useSelector(state => state.session);
    const user = JSON.parse(session);
    const backUrl = useSelector(state => state.backUrl);

    console.log(backUrl)
  
  // console.log(user['id'])
    
    // Check if user.profilePicture and its nested properties exist
    const profilePictureUrl = user.profilePicture.formats.thumbnail.url;

    const dispatch = useDispatch();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwt');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('session');
        // AsyncStorage.clear()
        router.replace('/sign-in')
        dispatch({ type: 'RESET_STATE' });
    };

       
    const userData= [{
        title: 'Partidos',
        data: 16
    }, {
        title: 'Amigos',
        data: 20
    }, {
        title: 'Desde',
        data: 2024
    }]

    


return (
    <Container bgColor={Colors.primaryGreen}>
        <ScrollView style={{flex: 1}}>
        <PageHeader />
            <View style={{backgroundColor: "#fff", flex: 1, marginTop: 60, alignItems: 'center', paddingHorizontal: 20}}>
            <View style={{transform: [{translateY: -80}], alignItems: "center"}}>
                <ImageBackground 
                    source={{uri: backUrl + profilePictureUrl}}
                    style={{width: 180, height: 180, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden', marginBottom: 20}} 
                    onPress={() => {console.log('navigate')}}>
                </ImageBackground>
                <Heading color={Colors.darkGreen}>{user.firstName} {user.lastName&&user.lastName}
                </Heading>
                <SubHeading style={{textAlign: 'center'}} color={Colors.textGrey}>{user.description}</SubHeading>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
                    <MainButton bgColor={Colors.primaryGreen} ctaText={"Agregar a amigos"} color={Colors.darkGreen} icon={'Add'} />
                    <Whapp />
                </View>


                <ViewJustifyCenter style={{marginVertical: 20, flexDirection: 'row', gap: 10, paddingHorizontal: 20, textAlign: 'center'}}>
                    {userData.map((data, index) => (
                        <BorderView style={{alignItems: 'center'}} key={index}>
                            <Heading style={{textAlign: 'center'}} color={Colors.darkGreen}>{data.data}</Heading>
                            <SubHeading style={{marginTop: 5}} color={Colors.textGrey}>{data.title}</SubHeading>
                        </BorderView>
                    ))}
                </ViewJustifyCenter>

                {user.location && 
                <BorderView style={{marginVertical: 20, flexDirection: 'row', gap: 10, paddingHorizontal: 20, textAlign: 'center'}}>
                
                    <LocationIcon color={'#000'}/>
                    <SubHeading color={Colors.textGrey}>{user.location}</SubHeading>

                </BorderView>
                }

                <Socials user={user} />

                <Friends user={user} backUrl={backUrl} />

                <View style={{marginTop: 20, flexDirection: 'row'}}>
                    <MainButton ctaText="Logout" onPress={handleLogout} bgColor={Colors.darkGreen} color={Colors.primaryGreen} willFlex={0}/>
                </View>

             
                <Text style={{color: '#000'}}>{backUrl}</Text>
                <View style={{marginBottom: 100}}></View>

            </View>

            
        </View>
        </ScrollView>
    </Container>
)   
}

export default Profile;