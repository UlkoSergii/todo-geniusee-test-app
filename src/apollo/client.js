import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import SerializingLink from 'apollo-link-serialize';

export const createClient = async queueLink => {
    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getAllTodos: {
                        merge(existing, incoming) {
                            return [...incoming];
                        },
                    },
                },
            },
            Mutation: {
                fields: {
                    updateTodo: {
                        merge(existing, incoming) {
                            if (!existing) {
                                if (Array.isArray(incoming)) {
                                    return [...incoming];
                                }

                                return [incoming];
                            }

                            if (Array.isArray(incoming)) {
                                return [...existing, ...incoming];
                            }
                            return [...existing, incoming];
                        },
                    },
                },
            },
        },
    });

    await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
    });

    const httpLink = new HttpLink({
        uri: 'http://192.168.0.102:3005/graphql/',
    });
    const serializingLink = new SerializingLink();

    return new ApolloClient({
        link: ApolloLink.from([queueLink, serializingLink, httpLink]),
        cache,
    });
};
