import React from 'react';
import { FlatList, View } from 'react-native';

import { useMutation, useQuery } from '@apollo/client';

import TodoListItem from './../TodoListItem';

import { GET_ALL_TODOS } from '../../../../apollo/queries';

import { REMOVE_TODO, UPDATE_TODO } from '../../../../apollo/mutations';

import styles from './styles';

const TodoList = () => {
    const { loading, data } = useQuery(GET_ALL_TODOS, {
        fetchPolicy: 'cache-and-network',
    });

    const [removeTodo] = useMutation(REMOVE_TODO, {
        context: {
            serializationKey: 'MUTATION',
            tracked: true,
        },
    });

    const [updateTodo] = useMutation(UPDATE_TODO, {
        context: {
            serializationKey: 'MUTATION',
            tracked: true,
        },
    });

    const completeTodoRequest = async (id, completed) => {
        try {
            await updateTodo({
                variables: { id, completed: !completed },
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateTodo: {
                        __typename: 'Todo',
                        id,
                        completed: !completed,
                    },
                    errors: [],
                },
                update(cache, { data }) {
                    const readData = cache.readQuery({
                        query: GET_ALL_TODOS,
                    });
                    const newData = readData.getAllTodos.map(item => {
                        if (item.id === id) {
                            return {
                                ...item,
                                completed: !completed,
                            };
                        }

                        return item;
                    });

                    cache.writeQuery({
                        query: GET_ALL_TODOS,
                        data: { getAllTodos: newData },
                    });
                },
            });
        } catch (e) {
            console.log('error', e);
        }
    };

    const removeTodoRequest = async id => {
        try {
            await removeTodo({
                variables: { id },
                optimisticResponse: {
                    __typename: 'Mutation',
                    removeTodo: {
                        __typename: 'id',
                        id,
                    },
                    errors: [],
                },
                update(cache, { data }) {
                    const readData = cache.readQuery({
                        query: GET_ALL_TODOS,
                    });
                    const newData = readData.getAllTodos.filter(item => item.id !== id);
                    cache.writeQuery({
                        query: GET_ALL_TODOS,
                        data: { getAllTodos: newData },
                    });
                },
            });
        } catch (e) {
            console.log('error', e);
        }
    };

    const keyExtractor = item => item.id;

    return (
        <FlatList
            refreshing={loading}
            data={data?.getAllTodos || []}
            keyExtractor={keyExtractor}
            renderItem={props => (
                <TodoListItem {...props} onRemove={removeTodoRequest} onComplete={completeTodoRequest} />
            )}
            ListFooterComponent={<View style={styles.listFooter} />}
        />
    );
};

export default TodoList;
