import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Colors} from '../../src/components/constants.js'

import HomeIcon from '../../src/assets/icons/home.js'
import CanchasIcon from '../../src/assets/icons/canchas.js'
import PartidosIcon from '../../src/assets/icons/partidos.js'
import ProfesoresIcon from '../../src/assets/icons/profesores.js'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.darkGreen
      }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="canchas"
        options={{
          title: 'Canchas',
          tabBarIcon: ({ color }) => <CanchasIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="partidos"
        options={{
          title: 'Partidos',
          tabBarIcon: ({ color }) => <PartidosIcon color={color} />,
        }}
      />

    <Tabs.Screen
        name="profesores"
        options={{
          title: 'Profesores',
          tabBarIcon: ({ color }) => <ProfesoresIcon color={color} />,
        }}
        />


      <Tabs.Screen
        name="(home)/profile"
        options={{
          title: 'Perfil',
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
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