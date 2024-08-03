import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Colors} from '../../../src/components/constants.js'

import HomeIcon from '../../../src/assets/icons/home.js'
import CanchasIcon from '../../../src/assets/icons/canchas.js'
import PartidosIcon from '../../../src/assets/icons/partidos.js'
import ProfesoresIcon from '../../../src/assets/icons/profesores.js'

import PartidosHeader from '../../../src/components/partidos/PartidosHeader.js'
import { Heading } from '../../../src/components/styled-components.js';
import AddMatch from '../../../src/assets/icons/add-match.js';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.darkGreen,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: 'Home',
          // href: null,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="canchas"
        options={{
          title: 'Canchas',
          // href: null,
          tabBarIcon: ({ color }) => <CanchasIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="(partidos)"
        
        options={{
          header: () => <PartidosHeader />,  
          title: 'Partidos',
          // href: null,
          // headerShown: false,
          tabBarIcon: ({ color }) => <PartidosIcon color={color} />,
        }}
      />

    <Tabs.Screen
        name="profesores"
        
        options={{
          title: 'Profesores',
          // href: null,
          tabBarIcon: ({ color }) => <ProfesoresIcon color={color} />,
        }}
        />

      <Tabs.Screen
        name="jugadores"
        options={{
          title: 'Jugadores',
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
        />

  <Tabs.Screen
        name="indexxxx-e"
        options={{
          title: 'Map',
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
        />
    </Tabs>

  );
}


// <Tabs
// screenOptions={{
// tabBarActiveTintColor: Colors.orange.default,
// tabBarStyle: {
// height: 70,
// borderWidth: 1,
// borderRadius: 50,
// borderColor: Colors.orange.default,
// borderTopColor: Colors.orange.default,
// backgroundColor: Colors.white.default,
// },
// tabBarLabelStyle: {
// fontSize: 12,
// fontWeight: "bold",
// marginBottom: 10,
// },
// }}
// >
// <Tabs.Screen
// name="(HomeNav)"
// options={{
// title: "Home",
// headerShown: false,
// tabBarIcon: ({color, size}) => (
// <Ionicons name="ios-home" size={size} color={color}/>
// ),
// }}
// />