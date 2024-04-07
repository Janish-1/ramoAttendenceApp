import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrationSuccess = () => {
    // Log the body data before making the API call
    const requestBody = {
      username: username,
      full_name: fullname,
      phone_number: phone,
      email: email,
      password: password,
      user_type: "user",
    };
    console.log('Request body:', requestBody);
    console.log(JSON.stringify(requestBody))

    // Call your API endpoint here to register the user
    fetch(`http://lsdrivebackend.ramo.co.in/api/driver/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle success response
      console.log('Registration successful:', data);
      alert('Your registration is successful!');
      // You can add navigation logic here to navigate to another screen
    })
    .catch(error => {
      // Handle error
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again later.');
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>

      <View style={styles.formGroup}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Fullname:</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={text => setFullname(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={registrationSuccess}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text>Already have an account? <Text style={styles.link}>Sign in</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#9b59b6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegisterPage;
