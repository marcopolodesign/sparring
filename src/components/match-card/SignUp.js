import { View, Text, TouchableOpacity } from 'react-native';
import React, { forwardRef } from 'react';
import {router} from 'expo-router'
import { useSelector } from 'react-redux';
import { Colors } from '../../components/constants.js';
import { SubHeading, ViewJustifyCenter } from '../../components/styled-components.js';

const SignUp = forwardRef((props, ref) => {

  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);

  return (
    <TouchableOpacity
      onPress={() => {
        if (ref) {
          ref.current.expand();
        } else {
          router.push({
            path: '/partidos',
            params: { idMatch: props.match.id },
          })
          
        }
      }}
    >
      {props.players === 4 ? (
        <ViewJustifyCenter flexCol justifyCenter>
        <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: props.match?.match_owner != user.id ? -15 : 0 }], zIndex: 4, backgroundColor: '#fff' }}>
          <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 3, transform: [{ translateX: props.match?.match_owner != user.id ? 30 : 0 }] }}>
            <SubHeading size={'20px'} color={Colors.blue}>+</SubHeading>
          </View>
        </View>

        {props.match?.match_owner != user.id && 
          <SubHeading size={'16px'} color={Colors.blue}>Anotarse</SubHeading>
          }

        </ViewJustifyCenter>
      ) : (
        <ViewJustifyCenter flexCol justifyCenter>
       <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: props.match?.match_owner != user.id ? -0 : -15 }], backgroundColor: '#fff' }}>
          <SubHeading size={'20px'} color={Colors.blue}>+</SubHeading>
        </View>
          {props.match?.match_owner != user.id && 
          <SubHeading size={'16px'} color={Colors.blue}>Anotarse</SubHeading>
          }
        </ViewJustifyCenter>
      )}
    </TouchableOpacity>
  );
});

export default SignUp;
