import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    console.log('Login pressed');
    navigation.navigate('LoginPage');
  };

  const handleRegisterPress = () => {
    console.log('Register pressed');
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#9b59b6' }]}
        onPress={handleLoginPress}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#9b59b6' }]}
        onPress={handleRegisterPress}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Ensure some padding around the buttons
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5, // Provide some margin between the buttons
    width: '80%', // Ensure buttons are of the same width
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomePage;
