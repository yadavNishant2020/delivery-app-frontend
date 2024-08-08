import { StyleSheet } from 'react-native';
import { themeProps } from '../../theme';
import colors from '../../shared/colors';
import { FontSize, scale, scaleVertical } from '../../theme/scale';

export const useStyle = (theme: themeProps) =>
    StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            padding: scale(15),
            marginVertical: scaleVertical(10),
            borderRadius: scale(50),
            textAlign: 'center',
            width: '100%'
        },
        iconContainer: {
            width: scale(20),
            height: scaleVertical(20),
            marginRight: 10,
        },
        buttonText: {
            fontSize: FontSize.H3,
            color: colors.white,
            fontFamily: 'NunitoSans_7pt_Condensed-ExtraLight',
        },
    })