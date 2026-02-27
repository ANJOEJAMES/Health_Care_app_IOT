import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/AuthService';

const LoginScreen = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!userId || !password) {
            Alert.alert('Error', 'Please enter both User ID and Password');
            return;
        }

        console.log('Attempting login...', userId);
        setLoading(true);
        try {
            const user = await loginUser(userId, password);
            console.log('Login success:', user);
            setLoading(false);
            if (user.role === 'doctor') {
                navigation.replace('DoctorDashboard', { user });
            } else {
                navigation.replace('UserDashboard', { user });
            }
        } catch (error) {
            console.log('Login error:', error);
            setLoading(false);
            Alert.alert(
                'Login Failed',
                typeof error === 'string' ? error : (error.message || 'Network Error. Check IP.')
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Health Care IoT</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="User ID"
                    placeholderTextColor="#aaa"
                    value={userId}
                    onChangeText={setUserId}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
                <Text style={styles.dividerText}>OR</Text>
            </View>

            <TouchableOpacity
                style={[styles.button, styles.scanButton]}
                onPress={() => navigation.navigate('Scanner')}
            >
                <Text style={styles.buttonText}>Scan QR Code (Bystander)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1e',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#1a1a2e',
        color: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    scanButton: {
        backgroundColor: '#06ffa5',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerText: {
        color: '#aaa',
    },
});

export default LoginScreen;
