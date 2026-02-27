import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, Camera } from "expo-camera";

const ScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.replace('BystanderDashboard', { userId: data });
    };

    if (hasPermission === null) {
        return (
            <View style={styles.permissionContainer}>
                <ActivityIndicator size="large" color="#4361ee" />
                <Text style={styles.permissionText}>Requesting camera permission...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>No access to camera</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => Camera.requestCameraPermissionsAsync()}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Modern Scanner Overlay */}
            <View style={styles.overlay}>
                <View style={styles.unfocusedContainer}></View>
                <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View>
                    <View style={styles.focusedContainer}>
                        {/* Corners */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    <View style={styles.unfocusedContainer}></View>
                </View>
                <View style={styles.unfocusedContainer}>
                    <Text style={styles.instructionText}>Center the QR code in the square</Text>
                </View>
            </View>

            {scanned && (
                <View style={styles.scannedContainer}>
                    <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
                        <Text style={styles.buttonText}>Tap to Scan Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#0f0f1e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    permissionText: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center'
    },
    retryButton: {
        marginTop: 20,
        backgroundColor: '#4361ee',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flexDirection: 'row',
        height: 250,
    },
    focusedContainer: {
        width: 250,
        height: 250,
        backgroundColor: 'transparent',
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderColor: '#06ffa5',
        borderWidth: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 10,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 10,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 10,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 10,
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
    },
    scannedContainer: {
        position: 'absolute',
        top: '50%',
        alignSelf: 'center',
        marginTop: 150,
    },
    scanAgainButton: {
        backgroundColor: '#4361ee',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    cancelButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#1a1a2e',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    cancelText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ScannerScreen;
