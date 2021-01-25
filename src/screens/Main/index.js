import React, { useContext, useState } from 'react';
import { View } from 'react-native';

import { useMutation } from '@apollo/client';

import TodoList from './components/TodoList';
import Button from './components/Button';
import Input from './components/Input';

import { GET_ALL_TODOS } from '../../apollo/queries';

import { ADD_TODO } from '../../apollo/mutations';

import { NetStatusContext } from '../../contexts';

import styles from './styles';

const MainScreen = () => {
    const [isInputFieldShown, setIsInputFieldShown] = useState(false);
    const online = useContext(NetStatusContext);

    const [addTodo] = useMutation(ADD_TODO, {
        context: {
            serializationKey: 'MUTATION',
            tracked: true,
        },
    });

    const addTodoRequest = async title => {
        if (!online) {
            setIsInputFieldShown(false);
        }
        try {
            await addTodo({
                variables: { todo: { title } },
                optimisticResponse: {
                    __typename: 'Mutation',
                    addTodo: {
                        __typename: 'Todo',
                        id: Date.now().toString(),
                        title: `${title} PENDING`,
                        completed: false,
                    },
                    errors: [],
                },
                update(cache, { data }) {
                    const existingTodos = cache.readQuery({ query: GET_ALL_TODOS });
                    const newTodos = [data.addTodo, ...existingTodos.getAllTodos];
                    cache.writeQuery({
                        query: GET_ALL_TODOS,
                        data: { getAllTodos: newTodos },
                    });
                },
            });
            setIsInputFieldShown(false);
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <View style={styles.container}>
            <TodoList />
            {isInputFieldShown ? (
                <Input onSubmit={addTodoRequest} onCancel={() => setIsInputFieldShown(false)} />
            ) : (
                <Button onPress={() => setIsInputFieldShown(true)} />
            )}
        </View>
    );
};

export default MainScreen;
