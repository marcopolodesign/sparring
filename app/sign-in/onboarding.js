import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, StatusBar, Platform } from 'react-native';
import { Colors } from '../../src/components/constants.js';
import { Heading, Input } from '../../src/components/styled-components.js';
import MainButton from '../../src/components/button.js';

export default function Onboarding() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Remove the error message for the field if it exists
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const fields = [
    { name: 'email', placeholder: 'Correo electrónico', type: 'text', required: true, errorMessage: 'Correo electrónico es requerido' },
    { name: 'password', placeholder: 'Contraseña', type: 'password', required: true, minLength: 6, errorMessage: 'Contraseña debe tener al menos 6 caracteres' },
    { name: 'confirmPassword', placeholder: 'Confirmar Contraseña', type: 'password', required: true, match: 'password', errorMessage: 'Las contraseñas no coinciden' },
    { name: 'firstName', placeholder: 'Nombre', type: 'text', required: true, errorMessage: 'Nombre es requerido' },
    { name: 'lastName', placeholder: 'Apellido', type: 'text', required: true, errorMessage: 'Apellido es requerido' },
    { name: 'age', placeholder: 'Edad', type: 'text', required: true, errorMessage: 'Edad es requerida' },
    { name: 'address', placeholder: 'Dirección', type: 'text', required: true, errorMessage: 'Dirección es requerida' },
  ];

  const validate = () => {
    let valid = true;
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && !value) {
        newErrors[field.name] = field.errorMessage;
        valid = false;
      } else if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = field.errorMessage;
        valid = false;
      } else if (field.match && value !== formData[field.match]) {
        newErrors[field.name] = field.errorMessage;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validate()) {
      return;
    }

    const userDetails = {
      username: formData.firstName + formData.lastName.toLowerCase(),
      ...formData,
      confirmed: true,
    };

    // Navigate to the next screen and pass userDetails
    router.push({ pathname: '/sign-in/onboarding-sport', params: userDetails });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -44 : 0}
        style={{ flex: 1 }}
      >
        <View style={{ backgroundColor: Colors.blue, flex: 1, justifyContent: 'center' }}>
          <StatusBar barStyle="light-content" />
          <View style={{ padding: 20 }}>
            <Heading color={'#fff'} style={{ marginBottom: 30 }}>Bienvenido a la comunidad más grande de jugadores de padel, tenis, y pickleball de Argentina.</Heading>
            <View style={{ gap: 15, marginBottom: 30 }}>
              {fields.map((field) => (
                <View key={field.name}>
                  <Input
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChangeText={(value) => handleInputChange(field.name, value)}
                    secureTextEntry={field.type === 'password'}
                  />
                  {errors[field.name] && <Text style={styles.errorText}>{errors[field.name]}</Text>}
                </View>
              ))}
            </View>

            <MainButton ctaText={"Siguiente"} willFlex={'true'} bgColor={Colors.primaryGreen} color={Colors.blue} onPress={handleNext} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
});
