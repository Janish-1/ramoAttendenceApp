import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCarPage = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('user_id');
                if (value) {
                    const userResponse = await fetch(`http://lsdrivebackend.ramo.co.in/api/driver/${value}`);
                    if (!userResponse.ok) {
                        throw new Error(`HTTP error! Status: ${userResponse.status}`);
                    }
                    const userData = await userResponse.json();
                    setUsername(userData.username);
                    setProfileImage(userData.profileimage);
                } else {
                    console.error('User ID not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const pingMainEndpoint = async () => {
            try {
                const response = await fetch("http://example.com/ping");
                if (!response.ok) {
                    throw new Error(`Ping HTTP error! Status: ${response.status}`);
                }
                console.log("Main endpoint pinged successfully");
            } catch (error) {
                console.error("Error pinging main endpoint:", error);
            }
        };

        fetchData();
        pingMainEndpoint();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Welcome, {username}</Text>
            {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default SelectCarPage;
