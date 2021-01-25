import { StyleSheet } from 'react-native';

import { PALETTE } from '../../../../constants/colors';

export default StyleSheet.create({
    container: {
        minHeight: 50,
        backgroundColor: PALETTE.LIGHT,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    title: {
        color: PALETTE.DARK,
        fontSize: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
    },
});
