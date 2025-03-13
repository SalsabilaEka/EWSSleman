import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faFileCirclePlus, faFolderOpen, faMapLocationDot, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Beranda from './Home';
import Peta from './Map';


function HomeScreen() {
    return (
        <Beranda />
    );
}

function MapScreen() {
    return (
        <Peta />
    );
}
function LaporanScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function DataScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName;

                        if (route.name === 'Beranda') {
                            iconName = faHouse;
                        } else if (route.name === 'Peta') {
                            iconName = faMapLocationDot;
                        } else if (route.name === 'Laporan') {
                            iconName = faTriangleExclamation;
                        } else if (route.name === 'Data') {
                            iconName = faFolderOpen;
                        }

                        return (
                            <FontAwesomeIcon
                                icon={iconName}
                                size={20}
                                color={focused ? '#284139' : 'gray'}  
                            />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        let labelColor = focused ? '#284139' : 'gray';  
                        return (
                            <Text style={{ fontSize: 11, color: labelColor }}>
                                {route.name}
                            </Text>
                        );
                    }
                })}
            >
                <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: true }} />
                <Tab.Screen name="Peta" component={MapScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Laporan" component={LaporanScreen} options={{ headerShown: true }} />
                <Tab.Screen name="Data" component={DataScreen} options={{ headerShown: true }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}