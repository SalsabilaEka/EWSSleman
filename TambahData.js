import React from 'react';
import { WebView } from 'react-native-webview';

const LaporanScreen = () => {
    return (
        <WebView
            source={{
                uri: 'https://script.google.com/macros/s/AKfycbyI65G382oUNk9JTdEqyM_dinDeL6LSsojSmdbr1UNg3cs4zBrAkzuqVNrjM0pA-XkSlA/exec',
            }}
        />
    );
};

export default LaporanScreen;
