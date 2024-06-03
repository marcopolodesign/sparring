import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { SvgXml } from 'react-native-svg';
import {router} from 'expo-router'
import { SubHeading } from './styled-components';
import {Colors, Generals} from './constants';

export default CustomMarker = ({ uri, title, isSelected, id }) => (
    <View style={styles.markerContainer}>
        <Image source={{ uri }} style={styles.markerImage} />
            <View style={{marginTop: -13, zIndex: 2}}>
        <BottomMarker />
        </View>
       

        {isSelected &&
            <TouchableOpacity 
            onPress={()=> {
                router.push({  pathname: '/cancha', 
                params: {courtId: id} });
            }}
            style={{paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.darkGreen, marginTop: 10, borderRadius: Generals.borderRadius}}>
                <SubHeading textCenter style={styles.markerTitle}>{title}</SubHeading>
            </TouchableOpacity>
        }
    </View>
    );

const styles = StyleSheet.create({
markerContainer: {
    alignItems: 'center',
    },
    markerImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: Colors.blue,
    borderWidth: 2,
    zIndex: 3,
    },
    markerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#fff",
    },
})

const BottomMarker = (props) => (
    <SvgXml
      width={24}
      height={26}
      xml={`<svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9998 10.48L0.787415 0.267578H21.2123L10.9998 10.48Z" fill="${Colors.blue}"/>
      </svg>
      `}
    />
  );