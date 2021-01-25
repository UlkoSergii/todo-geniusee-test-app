import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PALETTE } from '../../../../constants/colors';
import styles from './styles';

const Input = ({ onSubmit, onCancel }) => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <MaterialIcons name="close" size={25} color={PALETTE.PRIMARY} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    multiline
                    value={value}
                    onChangeText={setValue}
                    selectionColor={PALETTE.ACCENT}
                    autoFocus
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => onSubmit(value)}>
                    <MaterialIcons name="send" size={25} color={PALETTE.ACCENT} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Input;
