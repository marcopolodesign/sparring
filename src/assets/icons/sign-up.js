import { View, Text, TouchableOpacity } from 'react-native';
import React, { forwardRef } from 'react';
import { Colors } from '../../components/constants.js';
import { SubHeading } from '../../components/styled-components.js';

const SignUp = forwardRef((props, ref) => {

  return (
    <TouchableOpacity
      onPress={() => {
        if (ref.current) {
          ref.current.expand();
        }
      }}
    >
      {props.players === 4 ? (
        <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: -20 }], zIndex: 4, backgroundColor: '#fff' }}>
          <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 3, transform: [{ translateX: 20 }] }}>
            <SubHeading size={'20px'} color={Colors.blue}>+</SubHeading>
          </View>
        </View>
      ) : (
        <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: -15 }], backgroundColor: '#fff' }}>
          <SubHeading size={'20px'} color={Colors.blue}>+</SubHeading>
        </View>
      )}
    </TouchableOpacity>
  );
});

export default SignUp;
