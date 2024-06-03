import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { SvgXml } from 'react-native-svg';
import {router} from 'expo-router'
import { SubHeading } from './styled-components';
import {Colors, Generals} from './constants';

export default CustomMarker = ({ uri, title, isSelected, id }) => (
    // <View style={styles.markerContainer}>
        <BottomMarker />
    // </View>
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
      width={48}
      height={52}
      xml={`  <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23.8454" cy="24.047" r="22.4248" fill="#9FE870" stroke="#0F5CCD" stroke-width="1.80939"/>
      <path d="M23.8442 51.7164L18.4187 46.2909H29.2696L23.8442 51.7164Z" fill="#0F5CCD"/>
      <path d="M8.30676 41.3171C13.0305 37.068 16.0009 30.9061 16.0009 24.0488C16.0009 17.1915 13.0305 11.0296 8.30676 6.77686" stroke="#0F5CCD" stroke-width="1.81" stroke-miterlimit="10"/>
      <path d="M39.3841 41.3171C34.6604 37.068 31.6899 30.9061 31.6899 24.0488C31.6899 17.1915 34.6604 11.026 39.3841 6.77686" stroke="#0F5CCD" stroke-width="1.81" stroke-miterlimit="10"/>
      </svg>
      
      `}
    />
  );
  


  