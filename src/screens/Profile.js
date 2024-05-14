import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Link } from 'expo-router';
import { Heading, SubHeading } from '../components/styled-components.js'
import { Colors } from '../../src/components/constants.js'


import Container from '../../Container.js'
import PageHeader from '../../src/components/header/page-header.js'
import MainButton from '../components/button.js'
import Whapp from '../assets/icons/whapp.js'

import profile from '../assets/images/profile-pic.jpg'




const Profile = () => {
        const user = useSelector(state => state.user)
        console.log(user)
return (
    <Container bgColor={Colors.primaryGreen}>
        <PageHeader />
            <View style={{backgroundColor: "#fff", flex: 1, marginTop: 60, marginLeft: -20, marginRight: -20, alignItems: 'center', paddingHorizontal: 20}}>
            <View style={{transform: [{translateY: -100}], alignItems: "center"}}>
                <ImageBackground 
                    source={profile}
                    style={{width: 180, height: 180, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden', marginBottom: 20}} 
                    onPress={() => {console.log('navigate')}}>
                </ImageBackground>
                <Heading color={Colors.darkGreen}>{user.firstName} {user.lastName}</Heading>
                <SubHeading style={{textAlign: 'center'}} color={Colors.textGrey}>{user.metadata.description}</SubHeading>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
                    <MainButton bgColor={Colors.primaryGreen} ctaText={"Agregar a amigos"} color={Colors.darkGreen} icon={'Add'} />
                    <Whapp />
                </View>

            </View>
        </View>
    </Container>
)
}

export default Profile;