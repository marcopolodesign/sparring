import {View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import { router } from 'expo-router';
import {Colors} from './constants.js';
import { SubHeading, ThumbImage } from './styled-components.js'

const FriendBubble = ({MapKey, source, friend, textColor, user}) => {
    const backUrl = useSelector(state => state.backUrl);

    return (
    <View key={MapKey} style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            onPress={()=> {
                router.push({
                    pathname: '(app)/perfil', 
                    params: {playerID: user.id}
                })
            }}>
           <ThumbImage source={{ uri: backUrl + source}} />
            {friend ? (
           <SubHeading 
                size={'16px'} 
                style={{ color: textColor ? textColor : Colors.textGrey, marginTop: 5, textAlign: 'center' }}>
                    {friend.firstName}{'\n'}{friend.lastName}
            </SubHeading>
            ) : (
            <SubHeading 
                size={'16px'} 
                style={{ color: textColor ? textColor : Colors.textGrey, marginTop: 5, textAlign: 'center' }}>
                   {user.firstName}{'\n'}{user.lastName}
            </SubHeading>
        
            )}
        </TouchableOpacity>
    </View>
    )
}

export default FriendBubble;


