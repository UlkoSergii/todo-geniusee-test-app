import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PALETTE } from '../../../../constants/colors';
import styles from './styles';

const TodoListItem = ({ item, onRemove, onComplete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => onComplete(item.id, item.completed)}>
                {item.completed ? (
                    <MaterialIcons name="check-box" size={20} color={PALETTE.ACCENT} />
                ) : (
                    <MaterialIcons name="check-box-outline-blank" size={20} color={PALETTE.SECONDARY} />
                )}
            </TouchableOpacity>
            <Text
                style={{
                    ...styles.title,
                    ...{ textDecorationLine: item.completed ? 'line-through' : 'none' },
                }}
            >
                {item.title}
            </Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => onRemove(item.id)}>
                <MaterialIcons name="close" size={20} color={PALETTE.PRIMARY} />
            </TouchableOpacity>
        </View>
    );
};

export default TodoListItem;
