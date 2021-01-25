import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SIZES } from '../../../../constants/sizes';

import { PALETTE } from '../../../../constants/colors';
import styles from './styles';

const Button = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <MaterialIcons name="add" size={SIZES.ADD_BUTTON.HEIGHT * 0.8} color={PALETTE.SECONDARY} />
            </TouchableOpacity>
        </View>
    );
};

export default Button;
