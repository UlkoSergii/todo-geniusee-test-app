import { StyleSheet } from 'react-native';

import { SIZES } from '../../../../constants/sizes';

import { PALETTE } from '../../../../constants/colors';
import { appStyles } from '../../../../styles/app';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: SIZES.ADD_BUTTON.MARGIN_BOTTOM,
        left: 20,
        right: 20,
        backgroundColor: PALETTE.LIGHT,
        borderRadius: 20,
        ...appStyles.shadow,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    sendButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    input: {
        flex: 1,
        color: PALETTE.DARK,
    },
});
