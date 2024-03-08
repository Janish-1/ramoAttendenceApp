import React , {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSuccess = async () => {
    try {
      const requestBody = {
        username: username,
        password: password,
      };

      const response = await fetch('http://lsdrivebackend.ramo.co.in/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const { user_id } = responseData.main;
      
      console.log('Login successful. User ID:', user_id);
      alert('Your Login is successful!');
      
      // Store user_id in AsyncStorage
      await AsyncStorage.setItem('user_id', user_id.toString());

      // Navigate to the SelectCarPage
      navigation.navigate('SelectCarPage');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again later.');
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} placeholder="Enter your username" onChangeText={(text) => setUsername(text)} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry onChangeText={(text) => setPassword(text)} />
        </View>

        <Text style={styles.link}>Forgot your password?</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={loginSuccess}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? <Text style={styles.signupLink}>Signup!</Text></Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    color: 'black',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  buttonContainer: {
    backgroundColor: '#9b59b6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
