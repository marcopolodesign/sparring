import {useState, useEffect, useRef} from 'react'
import {router} from 'expo-router'
import {View, ScrollView, FlatList} from 'react-native';
import {Colors} from '../components/constants.js';
import { Heading, Text, ViewJustifyCenter, Span } from '../components/styled-components.js';
import { Dimensions } from 'react-native';
import PaddleRaquet from '../assets/icons/paddle-raquet.js';
import PhotoMin from './photo-min.js';
import Players from './match-card/players.js';
import SignUp from './match-card/SignUp.js';
const { height, width } = Dimensions.get('screen');
import * as Haptics from 'expo-haptics';
import { getAllMatches } from '../../api/functions.js';

const matchesCarrousel = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);


    useEffect(() => {
        const loadMatch = async () => {
          try {
            const match = await getAllMatches();
            setMatches(match);
            // console.log('Match from matchesCarrousel.js:', JSON.stringify(match, null, 2));   
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching match:', error.message);
          }
        };
        loadMatch();
    }, []);


    const openMatches = (match) => {

        if (matches.lenght > 0) {
            return (
                <Text>There are no matches available</Text>
            )
        }

        return(
            <View id={match.id} style={{padding: 15, backgroundColor: '#fff', borderRadius: 8, flex: 1, width: width * 0.78, marginLeft: 20}}>
                {console.log(JSON.stringify(match[0], null, 2))}

               { console.log(match.id)}
                
                {console.log(match.members[1]?.firstName)}
                <ViewJustifyCenter>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <PaddleRaquet />
                        <Text size={'18px'} color={'black'}>{match.sport?.sport}</Text>
                    </View>
                    <Text size={'18px'} color={'#A8A8A8'}>{match.time}</Text>
                </ViewJustifyCenter>

                <Span bgColor={Colors.lightGrey}/>
        
                <ViewJustifyCenter>
                        <Players players={match.members}  />
                        <Text style={{padding: 5, backgroundColor: Colors.lightGrey, color: Colors.darkGreen}}>VS</Text>
                        <SignUp onPress={() => {
                            router.push({
                                pathname: '(app)/partido', 
                                params: {idMatch: match.id}
                            })
                        }} />
                        {/* <Players player1={item.player3} player2={item.player4} /> */}
                </ViewJustifyCenter>
            </View>
        )
    }

const ref = useRef(null);

if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Loading...</Text>
        </View>
    );
    }


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
            data={matches}
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


