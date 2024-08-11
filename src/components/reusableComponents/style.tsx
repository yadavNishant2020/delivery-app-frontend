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
        container: {
            width: '50%',
        },
        dropdownHeader: {
            padding: scale(10),
            backgroundColor: colors.white,
            borderRadius: scale(18),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', 
        },
        selectedText: {
            fontSize: FontSize.H5,
            color: colors.black
        },
        image: {
            width: scale(20),
            height: scale(20),
            resizeMode: 'contain',
        },
        dropdownList: {
            backgroundColor: colors.white,
            borderRadius: scale(5),
            marginTop: scale(5),
            maxHeight: scale(150),
            borderWidth: scale(1),
            color: colors.black,
            borderColor: '#FF5963',
        },
        dropdownItem: {
            padding: scale(15),
            color: colors.black,
            borderBottomWidth: scale(1),
            borderBottomColor: '#FF5963',
        },
        dropdownText:{
            color: colors.black,
        }
    })