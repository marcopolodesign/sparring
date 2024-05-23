import { Redirect, Stack } from 'expo-router';
import {Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '../../api/ctx';

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Colors} from '../../src/components/constants.js'

import HomeIcon from '../../src/assets/icons/home.js'
import CanchasIcon from '../../src/assets/icons/canchas.js'
import PartidosIcon from '../../src/assets/icons/partidos.js'
import ProfesoresIcon from '../../src/assets/icons/profesores.js'
import { useEffect } from 'react';


export default function AppLayout() {
  const { isLoading } = useSession();
  const dispatch = useDispatch();

  // Use useSelector at the top level of the component
  const session = useSelector(state => state.session);

  useEffect(() => {
    console.log('Session:', session);
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (<Stack screenOptions={{headerShown: false}}/>);
}