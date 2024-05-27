import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Link, router } from 'expo-router';
import { Heading, SubHeading, Button } from '../components/styled-components.js'
import { Colors } from '../../src/components/constants.js'


import Container from '../../Container.js'
import PageHeader from '../../src/components/header/page-header.js'
import MainButton from '../../src/components/button.js'
import Whapp from '../assets/icons/whapp.js'

import profile from '../assets/images/profile-pic.jpg'




const Profile = () => {
    
    const session = useSelector(state => state.session);
    const user = JSON.parse(session);
    // const backUrl = useSelector(state => state.backUrl);

    const backUrl = 'https://sea-turtle-app-rkvrr.ondigitalocean.app'
    console.log(user)
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


return (
    <Container bgColor={Colors.primaryGreen}>
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
                <SubHeading style={{textAlign: 'center'}} color={Colors.textGrey}>{user.metadata?.description}</SubHeading>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
                    <MainButton bgColor={Colors.primaryGreen} ctaText={"Agregar a amigos"} color={Colors.darkGreen} icon={'Add'} />
                    <Whapp />
                </View>

                <Text>TESTING</Text>
                <Text style={{color: '#000'}}>{profilePictureUrl}</Text>
                <Text style={{color: '#000'}}>{backUrl}</Text>
                <Text style={{color: '#000'}}>{backUrl + profilePictureUrl}</Text>

                <View style={{marginTop: 20, flexDirection: 'row'}}>
                    <MainButton ctaText="Logout" onPress={handleLogout} bgColor={Colors.darkGreen} color={Colors.primaryGreen} willFlex={0}/>
                </View>
            </View>

            
        </View>
    </Container>
)   
}

export default Profile;