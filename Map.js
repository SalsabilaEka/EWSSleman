import React from 'react';
import { WebView } from 'react-native-webview';

const MapScreen = () => {
    return (
        <WebView
            source={{
                uri: 'https://ewsbpbdkabsleman.vercel.app/home',
            }}
        />
    );
};

export default MapScreen;
