import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {Colors} from '../../../../src/components/constants.js'
import BottomSelect from '../../../../src/components/BottomSelect.js';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(
Navigator
);

export default function TabLayout() {
    const countryBottomSheetRef = useRef(null);
    
    return (
        <>
        <MaterialTopTabs
        screenOptions={{
            tabBarLabelStyle: { color: '#fff', textTransform: 'capitalize', fontFamily: 'TT Interphases Pro', fontSize: 19.5},
            // tabBarItemStyle: { color: '#fff' },
            tabBarStyle: { backgroundColor: Colors.darkGreen, borderBottomWidth: 1, borderBottomColor: Colors.lightGrey  },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
        }} 
        >
            <MaterialTopTabs.Screen 
            name="explorar-partidos" 
            options={{ title: "Explorar Partidos"}} />

            <MaterialTopTabs.Screen name="mis-partidos" options={{ title: "Mis Partidos" }} />
        </MaterialTopTabs>

            <BottomSelect selection hasTabs ref={countryBottomSheetRef} />
        </>
    );
}
