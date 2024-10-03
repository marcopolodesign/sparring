import {View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import { Link } from 'expo-router';
import {Colors} from './constants.js';
import { SubHeading, ThumbImage } from './styled-components.js'
import Arrow from './../assets/icons/arrow-left.js';
import { router } from 'expo-router';

const FriendBubbleRow = ({index, source, friend, user, textColor, hasArrow}) => {
    const backUrl = useSelector(state => state.backUrl);

    return (
<View 
    {...index && (key={index}) }
    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
    <Link 
    href="/"   
    asChild                 
    style={{justifyContent: 'flex-start', flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
            <ThumbImage style={{borderWidth: 2, borderColor: '#fff'}} source={{ uri: backUrl + source}} />
            {friend ? (
            <SubHeading size={'16px'} style={{ color: textColor ? textColor : Colors.textGrey }}>
                {friend.firstName} {friend.lastName}
            </SubHeading>
            ) : (
                <TouchableOpacity 
                    onPress={ () => {
                  router.push({pathname: '(app)/perfil', params: {playerID: user.id, LoadingBgColor: Colors.orange}})
                    }}
                >
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>  
                        <SubHeading size={'16px'} style={{ color: textColor ? textColor : Colors.textGrey}}>{user.firstName} {user.lastName}</SubHeading>
                        {hasArrow && (
                            <View style={{marginLeft: 5}}>
                                <Arrow color={Colors.primaryGreen}/>
                            </View>
                        )}
                    </View>
                <SubHeading size={'14px'} color={'#fff'}>Owner del partido</SubHeading>              
            </TouchableOpacity>
            )}
        </TouchableOpacity>
    </Link>
</View>
    )
}

export default FriendBubbleRow;