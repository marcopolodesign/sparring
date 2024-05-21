import React, {useRef} from 'react'
import {View, ScrollView, FlatList} from 'react-native';
import {Colors} from '../components/constants.js';
import { Heading, Text, ViewJustifyCenter, Span, SubHeading } from '../components/styled-components.js';
import { Dimensions, ImageBackground } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import PhotoMin from './photo-min.js';
import Players from './match-card/players.js';
import SignUp from './match-card/SignUp.js';
const { height, width } = Dimensions.get('screen');
import * as Haptics from 'expo-haptics';
import profile from '../assets/images/profile-pic.jpg'





const coachesCarrousel = () => {
    const DATA = [
        {
          player1: "Emiliano",
          player2: "Juan",
          player3: "Mateo",
          player4: "Ignacio",
        },
        {
            player1: "Martin",
            player2: "Mateo",
            player3: "Pedro",
            player4: "Carlos",
        },
        {
            player1: "Gabriel",
            player2: "Tato",
            player3: "Maxi",
            player4: "Gustavo",
        },
        {
            player1: "Emiliano",
            player2: "Juan",
            player3: "Mateo",
            player4: "Ignacio",
        },
        {
            player1: "Emiliano",
            player2: "Juan",
            player3: "Mateo",
            player4: "Ignacio",
        },
        {
            player1: "Emiliano",
            player2: "Juan",
            player3: "Mateo",
            player4: "Ignacio",
        },
    ];

    const openMatches = (item) => {
        return(
            <View style={{padding: 15, backgroundColor: '#fff', borderRadius: 8, width: width * 0.78, marginLeft: 20, position: 'relative'}}>
                <View style={{position: 'absolute', backgroundColor: Colors.primaryGreen, height: "30%", width: width * 0.78, top: 0, left: 0, borderTopRightRadius: 8, borderTopLeftRadius: 8}}></View>
               
                <View>
                    <ImageBackground 
                        source={profile}
                        style={{width: 160, height: 160, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden', marginBottom: 20}} 
                        onPress={() => {console.log('navigate')}}>
                    </ImageBackground>                   
                </View>

       
                <View style={{marginTop: 25}}>
                    <Text size={'22px'} color={Colors.darkGreen} weight={'bold'}>{item.player1} Lopez</Text>
                    <SubHeading size={'16px'} color={Colors.textGrey} weight={'bold'}>Doy clases hace más de 10 años a adultos, niños y adolescentes desde nivel inicial hasta avanzado</SubHeading>
                </View>
                
            </View>
        )
    }
    const ref = React.useRef();

  return ( 
    <View style={{marginLeft: -20, marginRight: -20}}>
        <FlatList
            ref={ref}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() =>{
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
            data={DATA}
            contentContainerStyle={{flexDirection: 'row', marginTop: 20, paddingLeft: -20, marginRight: -20}}
            renderItem={({ item }) =>
            openMatches(item)
        }
            // estimatedItemSize={400}
        />
    </View>
  )
}


export default coachesCarrousel;


