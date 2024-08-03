import React, { useEffect, useMemo, forwardRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
const { height } = Dimensions.get('screen');

import { useSharedValue } from 'react-native-reanimated';

// Import Components
import { Colors, Generals } from '../constants';
import Friends from '../friends-list';
import MainButton from '../button';
import { EndingView, SubHeading } from '../styled-components';

const InviteMembers = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => [.1], []);
  const animatedContentHeight = useSharedValue(0);
  const [modalReady, setModalReady] = useState(false)

  useEffect(() => {
    console.log(JSON.stringify(props.newMatch, null, 2))
  },[ref])
  const bottomSheetHandle = () => (
    <View
      // onPress={() => { ref.current.expand() }}
      style={{ height: 70, backgroundColor: '#F9F9F9', borderColor: '#A8A8A8', borderBottomWidth: 1, borderTopLeftRadius: Generals.modalBorderRadius, borderTopRightRadius: Generals.modalBorderRadius, justifyContent: 'center', alignItems: 'center' }}>
      <SubHeading size={'16px'} color={Colors.darkGreen} style={{ fontWeight: 'bold' }}>Seleccionar amigos a invitar</SubHeading>
    </View>
  );

  const handleSheetChanges = (index) => {
    // Grab the selected member.id and pass it to the newMatch members
    console.log('add friend');
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{ borderTopLeftRadius: Generals.modalBorderRadius, borderTopRightRadius: Generals.modalBorderRadius }}
      handleComponent={bottomSheetHandle}
      backdropComponent={BottomSheetBackdrop}
      onChange={handleSheetChanges}
      enableDynamicSizing={true}
      contentHeight={animatedContentHeight}
    >
      <BottomSheetScrollView style={{ flex: 1, borderTopRadius: Generals.modalBorderRadius, paddingHorizontal: 20 }}>
        <Friends user={props.user} spots={props.newMatch?.ammount_players} newMatch={props.newMatch} setNewMatch={props.setNewMatch} setModalReady={setModalReady}/>
        <MainButton willFlex={'0'} 
        color={modalReady ? Colors.primaryGreen : Colors.textGrey}
        bgColor={modalReady ? Colors.blue : Colors.lightGrey}
        ctaText={'Seleccionar'} 
        onPress={()=> {
          ref.current.close()
        }}

        />
        <EndingView></EndingView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default InviteMembers;

const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    paddingHorizontal: '5%',
    zIndex: 500,
    alignItems: 'center',
    paddingBottom: 20,
  },
  closebtn: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 15,
    right: 30,
  },
  btnCard: {
    paddingVertical: 17,
    borderRadius: 8,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryGreen,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
