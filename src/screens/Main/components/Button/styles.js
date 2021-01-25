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
        left: 0,
        right: 0,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.ADD_BUTTON.WIDTH,
        height: SIZES.ADD_BUTTON.HEIGHT,
        borderRadius: SIZES.ADD_BUTTON.HEIGHT / 2,
        backgroundColor: PALETTE.LIGHT,
        ...appStyles.shadow,
    },
});
