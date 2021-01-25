import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import QueueLink from 'apollo-link-queue';
import { ApolloProvider } from '@apollo/client';

import MainScreen from './src/screens/Main';

import { NetStatusContext } from './src/contexts';

import { PALETTE } from './src/constants/colors';
import { createClient } from './src/apollo/client';

const App = () => {
    const queueLink = new QueueLink();

    const [client, setClient] = useState();
    const [online, setOnline] = useState(true);

    const initClient = async () => {
        const appClient = await createClient(queueLink);

        setClient(appClient);
    };

    useEffect(() => {
        initClient();

        const unsubscribe = NetInfo.addEventListener(state => {
            setOnline(state.isConnected);
            if (state.isConnected) {
                queueLink.open();
            } else {
                queueLink.close();
            }
        });

        return unsubscribe;
    }, []);

    if (!client) {
        return <View />;
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={PALETTE.PRIMARY} />
            <ApolloProvider client={client}>
                <NetStatusContext.Provider value={online}>
                    <SafeAreaView style={styles.container}>
                        <MainScreen />
                    </SafeAreaView>
                </NetStatusContext.Provider>
            </ApolloProvider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
