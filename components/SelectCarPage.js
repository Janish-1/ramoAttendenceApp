import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import publicIP from 'react-native-public-ip';
import { NetworkInfo } from 'react-native-network-info';

const SelectCarPage = () => {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [localIP, setLocalIP] = useState('');
    const [ipv4Address, setIpv4Address] = useState('');
    const [publicIPAddress, setPublicIPAddress] = useState('');
    const [localIpRequestLink, setLocalIpRequestLink] = useState('http://192.168.1.26:8000/main/'); // Default link

    // Function to fetch various network info
    const fetchNetworkInfo = async () => {
        try {
            const localIP = await NetworkInfo.getIPAddress();
            const ipv4Address = await NetworkInfo.getIPV4Address();

            setLocalIP(localIP);
            setIpv4Address(ipv4Address);

            console.log('Local IP:', localIP);
            console.log('IPv4 Address:', ipv4Address);
        } catch (error) {
            console.error('Error fetching network info:', error);
        }
    };

    // Function to fetch the public IP address
    const fetchPublicIP = async () => {
        try {
            const ip = await publicIP();
            setPublicIPAddress(ip);
            console.log("Public IP Address", ip);
        } catch (error) {
            console.error('Unable to get IP address:', error);
        }
    };

    // Function to fetch data using the provided link
    const fetchip = async (link) => {
        try {
            const userResponse = await fetch(link);
            if (!userResponse.ok) {
                throw new Error(`HTTP error! Status: ${userResponse.status}`);
            }
            const userData = await userResponse.json();
            console.log(userData);
        } catch (error) {
            console.error('Get IP Address Error:', error);
        }
    };

    // Function to refresh data
    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
                const userResponse = await fetch(`http://lsdrivebackend.ramo.co.in/api/driver/${userId}`);
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

    useEffect(() => {
        fetchData();
        fetchNetworkInfo();
        fetchPublicIP();
        fetchip(localIpRequestLink);

        const ipInterval = setInterval(() => fetchip(localIpRequestLink), 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(ipInterval);
    }, [localIpRequestLink]);

    // Function to change the request link for the local IPv4 address
    const handleChangeRequestLink = () => {
        // You may want to add input validation and handle securely
        fetchip(localIpRequestLink);
    };

    // Function to refresh data
    const handleRefresh = () => {
        fetchData();
        fetchNetworkInfo();
        fetchPublicIP();
        fetchip(localIpRequestLink);
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {username}</Text>
            {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

            <Text>Local IP: {localIP}</Text>
            <Text>IPv4 Address: {ipv4Address}</Text>
            <Text>Public IP Address: {publicIPAddress}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new local IP request link"
                    value={localIpRequestLink}
                    onChangeText={(text) => setLocalIpRequestLink(text)}
                />
                <Button title="Change Link" style={styles.button} onPress={handleChangeRequestLink} />
            </View>

            {/* Add the refresh button */}
            <View style={styles.inputContainer}>
                <Button title="Refresh Data" style={styles.button} onPress={handleRefresh} />
            </View>
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
    inputContainer: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
    },
    button: {
        color:'black',
    }
});

export default SelectCarPage;
