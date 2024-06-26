import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Keyboard } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Colors } from '../../src/components/constants.js';
import Container from '../../Container.js';
import { Heading, SubHeading } from '../../src/components/styled-components.js';
import MainButton from '../../src/components/button.js';
import Upload from '../../src/assets/icons/upload.js';
import { fetchUser, createUser, uploadProfilePicture } from '../../api/functions.js';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomUp from '../../src/components/BottomUp.js';
import * as Haptics from 'expo-haptics';

export default function OnboardingSport() {
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const userDetails = useLocalSearchParams();
  const onboardingRef = useRef(null);
  const [logError, setLogError] = useState(null);
  const [imageError, setImageError] = useState(null);

  const [bottomUpProps, setBottomUpProps] = useState({
    title: 'Ups! Algo salió mal',
    paragraph: `Error al crear la cuenta`,
    buttonTitle: 'Reintentar',
    onPress: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    loading: false,
  });

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resizedPhoto = await manipulateAsync(
        result.assets[0].localUri || result.assets[0].uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 1, format: SaveFormat.JPEG }
      );
      setImage(resizedPhoto.uri);
      setImageError(null); // Clear the image error when an image is selected
    }
  };

  const handleSubmitUser = async () => {
    if (isEmpty(image)) {
      setImageError('Subir una foto de perfil es obligatorio');
      return;
    }

    try {
      // Create user
      setIsUpdating(true);
      const user = await createUser(userDetails);
      console.log('User created:', user);

      if (!isEmpty(image)) {
        // Upload profile picture
        await uploadProfilePicture(user.user.id, image);
      }

      const loadUser = await fetchUser(user.user.id);
      dispatch({ type: 'SET_USER', payload: JSON.stringify(loadUser) });
      dispatch({ type: 'SET_SESSION', payload: JSON.stringify(loadUser) });
      await AsyncStorage.setItem('jwt', user.jwt);
      setIsUpdating(false);
      router.push('/');
    } catch (error) {
      onboardingRef.current.expand();
      setIsUpdating(false);
      Keyboard.dismiss();
      setLogError(error?.response?.data?.error?.message ? error?.response?.data?.error?.message : error.message);
    }
  };

  useEffect(() => {
    console.log('IMAGE USE EFFECT', image);
  }, [image]);

  return (
    <>
      <Container bgColor={Colors.blue}>
        <Stack.Screen options={{ headerShown: false, hrerf: null }} title="Onboarding Sport" />
        <View style={{ padding: 20 }}>
          <Heading color={Colors.primaryGreen}>Seleccioná tu deporte</Heading>
          <SubHeading color={'#fff'} style={{ marginBottom: 20, fontWeight: 'bold' }} size={'18px'}>Te recomendaremos jugadores en base a tu decisión.</SubHeading>

          <View style={{ gap: 15, marginBottom: 50, flexDirection: 'row' }}>
            <TouchableOpacity style={{ paddingVertical: 7.5, paddingHorizontal: 15, borderRadius: 100, borderColor: Colors.primaryGreen, borderWidth: 2 }}>
              <Text style={{ color: Colors.primaryGreen, fontSize: 18, fontWeight: 'bold' }}>Paddle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ paddingVertical: 7.5, paddingHorizontal: 15, borderRadius: 100, borderColor: Colors.primaryGreen, borderWidth: 2 }}>
              <Text style={{ color: Colors.primaryGreen, fontSize: 18, fontWeight: 'bold' }}>Tennis</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ paddingVertical: 7.5, paddingHorizontal: 15, borderRadius: 100, borderColor: Colors.primaryGreen, borderWidth: 2 }}>
              <Text style={{ color: Colors.primaryGreen, fontSize: 18, fontWeight: 'bold' }}>Pickleball</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Heading color={Colors.primaryGreen}>Subí una foto de perfil</Heading>
            <SubHeading color={'#fff'} style={{ marginBottom: 30, fontWeight: 'bold' }} size={'18px'}>Nuestra comunidad merece conocerte mejor. No seas tímido!</SubHeading>

            {!isEmpty(image) ? (
              <TouchableOpacity onPress={() => pickImage()}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: '100%',
                    height: 380,
                    resizeMode: 'cover',
                    borderRadius: 12,
                    marginBottom: 30,
                    borderColor: '#fff',
                    borderWidth: 2,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pickImage()} style={{ backgroundColor: '#fff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', height: 380, marginBottom: 30, borderColor: '#fff', borderWidth: 2 }}>
                <Upload />
                <SubHeading color={Colors.darkGreen} style={{ marginTop: 10, fontWeight: 'normal' }} size={'16px'}>Subí una foto de perfil</SubHeading>
              </TouchableOpacity>
            )}

            {imageError && <Text style={styles.errorText}>{imageError}</Text>}
          </View>

          <MainButton isLoading={isUpdating} ctaText={!isUpdating ? "Finalizar" : "Enviando"} willFlex={'true'} bgColor={Colors.primaryGreen} color={Colors.blue} onPress={handleSubmitUser} />
        </View>
      </Container>
      <BottomUp
        {...bottomUpProps}
        sheetRef={onboardingRef}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onboardingRef.current.close();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
    marginTop: -10,
    textAlign: 'center',
  },
});
