import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../../../src/components/constants.js';
import Container from '../../../../Container.js';
import { SubHeading } from '../../../../src/components/styled-components.js';
import MatchesCarrousel from '../../../../src/components/matchesCarrousel.js';

export default function Partidos({ ...props }) {
  const [matchesLength, setMatchesLength] = useState(null); // Correct spelling

  // Check if the matchesLength is correctly updated
  useEffect(() => {
    console.log("matchesLength updated in parent:", matchesLength);
  }, [matchesLength]);

  return (
    <Container safeArea bgColor={Colors.darkGreen}>
      <Stack.Screen options={{ headerShown: true }} title="explorar-partidos" />

      <View style={{paddingHorizontal: 20, marginTop: 20}}>
       {/* Optionally show a loading message if matchesLength is still null */}
       {matchesLength === null ? (
        <SubHeading>
          Loading...
        </SubHeading>
      ) : <SubHeading>Encontramos {matchesLength} {matchesLength > 1 ? 'partidos' : 'partido'} para vos</SubHeading>}
      </View>
      {/* Render MatchesCarrousel even if matchesLength is null */}
      <MatchesCarrousel partidosView setMatchesLength={setMatchesLength} />

     
    </Container>
  );
}