import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ReportScreen() {
    const [name, setName] = useState('');
    const [ewsName, setEwsName] = useState('');
    const [ewsType, setEwsType] = useState('');
    const [status, setStatus] = useState({});
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (component, value) => {
        setStatus((prev) => ({ ...prev, [component]: value }));
    };

    const requestPermissions = async () => {
        try {
            const cameraGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera to take photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            const storageGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'This app needs access to your storage to upload photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (
                cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
                storageGranted === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Camera and storage permissions granted');
            } else {
                console.log('Permissions not granted');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Call requestPermissions before accessing the camera or storage
    requestPermissions();

    const handleCapturePhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                } else if (response.errorCode) {
                    console.log('Error: ', response.errorCode);
                } else {
                    const { assets } = response;
                    setPhoto(assets[0].uri); // Store photo URI or base64
                }
            }
        );
    };

    const handleSubmit = async () => {
        setLoading(true); // Start loading
    
        const formData = {
            name,
            ewsName,
            ewsType,
            status,
            photo, // Assuming 'photo' is base64-encoded image or URL
        };
    
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzw4Beb7VHjmBKwJosAwpX3bpbKCm8hqjM1cUDN7q7qOhbAr9qXZJ5WnFyY16zwTYM2hA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            console.log(result); // Result from Google Apps Script
            
            // Show success alert
            Alert.alert('Success', 'Data berhasil disimpan', [{ text: 'OK' }]);
            
            // Clear form
            setName('');
            setEwsName('');
            setEwsType('');
            setStatus({});
            setPhoto(null);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    
        setLoading(false); // Stop loading after submission
    };

    const renderRadioGroup = (label) => (
        <View style={styles.radioContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.radioGroup}>
                {['Ada', 'Tidak Ada', 'Rusak', 'Diganti'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleStatusChange(label, option)}
                        style={[styles.radioButton, status[label] === option && styles.radioButtonSelected]}
                    >
                        <Text style={status[label] === option ? styles.radioTextSelected : styles.radioText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama Pelapor"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama EWS"
                        value={ewsName}
                        onChangeText={setEwsName}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Jenis EWS"
                        value={ewsType}
                        onChangeText={setEwsType}
                    />
                </View>
                <View style={styles.radioGroupContainer}>
                    {renderRadioGroup('HORN 1')}
                    {renderRadioGroup('HORN 2')}
                    {renderRadioGroup('HORN 3')}
                    {renderRadioGroup('HORN 4')}
                    {renderRadioGroup('AMPLIFIER')}
                    {renderRadioGroup('MP3 + FLASHDISK')}
                    {renderRadioGroup('MP3 MODEL LAMA')}
                    {renderRadioGroup('TOWER')}
                    {renderRadioGroup('ADAPTOR 5 V')}
                    {renderRadioGroup('KABEL LISTRIK')}
                    {renderRadioGroup('KABEL HORN')}
                    {renderRadioGroup('TERMINAL LISTRIK')}
                    {renderRadioGroup('BOX')}
                    {renderRadioGroup('KUNCI')}
                    {renderRadioGroup('PANEL SURYA')}
                    {renderRadioGroup('KAMERA ZOOM')}
                    {renderRadioGroup('KAMERA BIASA')}
                    {renderRadioGroup('ANTENA')}
                    {renderRadioGroup('TRIGGER SONOF (KENDALI JARAK JAUH)')}
                    {renderRadioGroup('ROUTER')}
                    {renderRadioGroup('SWITCH HUB')}
                    {renderRadioGroup('AKI')}
                    {renderRadioGroup('ATS (AUTOMATIC TRANSFER SWITCH)')}
                    {renderRadioGroup('SOLAR CHARGER SSC')}
                    {renderRadioGroup('INVERTER 1000 WATT')}
                    {renderRadioGroup('INVERTER 350 WATT')}
                    {renderRadioGroup('SAKLAR WATERPROOF')}
                    {renderRadioGroup('HTB SEPASANG')}
                    {renderRadioGroup('FIBER OPTIC')}
                    {renderRadioGroup('WEBCAM')}

                    {/* Add the "Tambahkan Foto" button with camera icon */}
                    <TouchableOpacity style={styles.photoButton} onPress={handleCapturePhoto}>
                        <FontAwesomeIcon icon={faCamera} size={20} color='white' />
                        <Text style={styles.photoButtonText}>Tambah Foto</Text>
                    </TouchableOpacity>

                    {/* Show photo preview if available */}
                    {photo && (
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: photo }} style={styles.previewImage} />
                        </View>
                    )}

                    {/* Show loading indicator when submitting */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitText}>KIRIM LAPORAN</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        backgroundColor: '#F4EFEB',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowRadius: 15,
        elevation: 4,
    },
    inputGroup: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#000',
        backgroundColor: '#FFEFCE',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    radioGroupContainer: {
        marginBottom: 20,
    },
    radioContainer: {
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#DFE4DD',
    },
    radioButtonSelected: {
        backgroundColor: '#284239',
    },
    radioText: {
        color: '#333',
    },
    radioTextSelected: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#284139',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 8,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    photoButton: {
        flexDirection: 'row',
        backgroundColor: '#284139',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'center',
    },
    photoButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    previewContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    previewImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
