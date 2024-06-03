import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Colors} from '../constants'
import { Text } from '../styled-components';
import {router} from 'expo-router'

const SignUp = ({...props}) => {
  return (
    <TouchableOpacity activeOpacity={'0.75'}
    style={{justifyContent: 'center', alignItems: 'center'}}
    onPress={props.onPress}
    >
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <View style={{width: 45, height: 45, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: "center"}}></View>
            <View style={{width: 45, height: 45, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: "center", transform: [{translateX: -20,}], backgroundColor: '#fff'}}>
                <Text size={'20px'} color={Colors.blue}>+</Text>
            </View>
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.blue}>Anotarse</Text>
    </TouchableOpacity>
  )
}

export default SignUp;