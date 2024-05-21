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
    const user = useSelector(state => state.user)
    const backUrl = useSelector(state => state.apiUrl)


    const dispatch = useDispatch();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwt');
        dispatch({ type: 'LOGOUT' });
        router.replace('(login)')
    };


return (
    <Container bgColor={Colors.primaryGreen}>
        <PageHeader />
            <View style={{backgroundColor: "#fff", flex: 1, marginTop: 60, alignItems: 'center', paddingHorizontal: 20}}>
            <View style={{transform: [{translateY: -80}], alignItems: "center"}}>
                <ImageBackground 
                    source={{uri: backUrl + user.profilePicture.formats.thumbnail.url}}
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

                <View style={{marginTop: 20, flexDirection: 'row'}}>
                    <MainButton ctaText="Logout" onPress={handleLogout} bgColor={Colors.darkGreen} color={Colors.primaryGreen} willFlex={0}/>
                </View>
            </View>

            
        </View>
    </Container>
)   
}

export default Profile;