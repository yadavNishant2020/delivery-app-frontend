import { StyleSheet } from 'react-native';

import colors from '../../shared/colors';
import { FontSize, scale, scaleVertical } from '../../theme/scale';

export const useStyle = theme =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-around'
        },
        dropdown: {
            position: 'absolute',
            top: 80, // Adjust the position of the dropdown
            left: -5, // Adjust the position of the dropdown
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
        },
        logoutText: {
            color: 'red',
            fontWeight: 'bold',
        },
        header: {
            paddingVertical: scale(20),
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        content: {
            paddingHorizontal: scale(20),
            paddingVertical: scale(20),
            marginTop: scaleVertical(20),
            borderRadius: 5,
            backgroundColor: '#fff',
        },
        image: {
            width: 50,
            height: 50,
            borderRadius: 50,
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

        },
        buttonContainer: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        iconContainer: {
            backgroundColor: 'white',
            paddingHorizontal: scale(25),
            paddingVertical: scale(25),
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: FontSize.H8,
            color: colors.gray,
            marginTop: scaleVertical(5),
            alignItems: "center"
        },
        statsHeader: {
            marginBottom: scaleVertical(20),
        },
        statsHeaderText: {
            fontSize: FontSize.H3,
            fontWeight: 'bold',
            color: "black"
        },
        stats: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: scaleVertical(30),
        },
        stat: {
            alignItems: 'center',
        },
        statLabel: {
            fontSize: FontSize.H6,
            color: colors.gray,
        },
        statValue: {
            fontSize: FontSize.H4,
            fontWeight: 'bold',
            color: colors.gray,
        },

    })