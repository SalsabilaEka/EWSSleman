import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView,
    ActivityIndicator, Modal, Alert
} from 'react-native';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
    const [dataCounts, setDataCounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchData = async () => {
        const url = 'https://script.google.com/macros/s/AKfycbywWWKl20x162jef5fKUqXCBHuNmpHpa7vtumnBTJVbOcJNQYEaCoevXedApesq2RCEJg/exec';
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal memuat data');
            const data = await response.json();
            setDataCounts(data);
        } catch (error) {
            console.error('Fetch Error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch pertama kali saat komponen dimuat
        const interval = setInterval(fetchData, 30000); // Auto-refresh setiap 30 detik
        return () => clearInterval(interval); // Membersihkan interval saat unmount
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0288D1" />
                <Text style={styles.loadingText}>Memuat data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Gagal memuat data. Periksa koneksi internet Anda.</Text>
                <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
                    <Text style={styles.buttonText}>Coba Lagi</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>EWS Monitoring</Text>
                    <Text style={styles.subHeaderText}>
                        Aplikasi untuk monitoring status EWS dan CCTV di Kabupaten Sleman.
                    </Text>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.sectionTitle}>Status EWS</Text>
                    <View style={styles.row}>
                        <View style={styles.cardAlive}>
                            <Text style={styles.cardText}>{dataCounts?.ewsAlive}</Text>
                            <Text style={styles.cardLabel}>EWS Hidup</Text>
                        </View>
                        <View style={styles.cardDead}>
                            <Text style={styles.cardText}>{dataCounts?.ewsDead}</Text>
                            <Text style={styles.cardLabel}>EWS Mati</Text>
                        </View>
                    </View>
                    <View style={styles.cardTotal}>
                        <Text style={styles.cardText}>{dataCounts?.totalEws}</Text>
                        <Text style={styles.cardLabel}>Total EWS</Text>
                    </View>
                </View>

                <View style={styles.cardContainerCCTV}>
                    <Text style={styles.sectionTitle}>Status CCTV</Text>
                    <View style={styles.row}>
                        <View style={styles.cardAlive}>
                            <Text style={styles.cardText}>{dataCounts?.cctvAlive}</Text>
                            <Text style={styles.cardLabel}>CCTV Hidup</Text>
                        </View>
                        <View style={styles.cardDead}>
                            <Text style={styles.cardText}>{dataCounts?.cctvDead}</Text>
                            <Text style={styles.cardLabel}>CCTV Mati</Text>
                        </View>
                    </View>
                    <View style={styles.cardTotal}>
                        <Text style={styles.cardText}>{dataCounts?.totalCctv}</Text>
                        <Text style={styles.cardLabel}>Total CCTV</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Lihat CCTV Merapi</Text>
                </TouchableOpacity>

                <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.webViewContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Tutup</Text>
                        </TouchableOpacity>
                        <WebView source={{ uri: 'http://bpbd-sleman.online/jpegpull.htm' }} style={styles.webView} />
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

// STYLING
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    scrollViewContent: {
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    subHeaderText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    cardContainer: {
        backgroundColor: '#DFE4DD',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
    },
    cardContainerCCTV: {
        backgroundColor: '#F4EFEB',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardAlive: {
        backgroundColor: '#809076',
        padding: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: 5,
    },
    cardDead: {
        backgroundColor: '#BA6830',
        padding: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
    },
    cardTotal: {
        backgroundColor: '#284239',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardLabel: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#2F4157',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#D32F2F',
        textAlign: 'center',
    },
    webViewContainer: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
    closeButton: {
        padding: 15,
        backgroundColor: '#2F4157',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;