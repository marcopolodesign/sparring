import React, {useRef} from 'react'
import {View, ScrollView, FlatList} from 'react-native';
import {Colors} from '../components/constants.js';
import { Heading, Text, ViewJustifyCenter, Span } from '../components/styled-components.js';
import { Dimensions } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import PhotoMin from './photo-min.js';
import Players from './match-card/players.js';
import SignUp from './match-card/SignUp.js';
const { height, width } = Dimensions.get('screen');



const matchesCarrousel = () => {
    console.log(width)
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
        console.log(item)
        return(
            <View style={{padding: 15, backgroundColor: '#fff', borderRadius: 8, flex: 1, width: width * 0.78, marginLeft: 20}}>
               
                <ViewJustifyCenter>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <PaddleRaquet />
                        <Text size={'18px'} color={'black'}>Paddel</Text>
                    </View>
                    <Text size={'18px'} color={'#A8A8A8'}>Mañana, 14:30 — 16:00</Text>
                </ViewJustifyCenter>

                <Span bgColor={Colors.lightGrey}/>
       
                <ViewJustifyCenter>
                        <Players player1={item.player1} player2={item.player2} />
                        <Text style={{padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen}}>VS</Text>
                        <SignUp />
                        {/* <Players player1={item.player3} player2={item.player4} /> */}
                </ViewJustifyCenter>
                
            </View>
        )
    }
    const ref = React.useRef();

  return ( 
    <View style={{marginLeft: -20, marginRight: -20}}>
        <FlatList
            ref={ref}
            showsVerticalScrollIndicator={false}
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
            estimatedItemSize={200}
        />
    </View>
  )
}


export default matchesCarrousel;


