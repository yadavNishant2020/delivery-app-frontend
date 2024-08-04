import {StyleSheet} from 'react-native';

import colors from '../../shared/colors';
import {FontSize, scale, scaleVertical} from '../../theme/scale';

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
    profilePic: {
        // paddingHorizontal: scale(15),
        // marginVertical: scaleVertical(10),
        // marginBottom: 10,
    },
    // content: {
    //     // paddingHorizontal: scale(20),
    //     // paddingVertical: scale(20),
    //     padding: 20,
    //     marginTop: 20,
    //     borderRadius: 5,
    //     backgroundColor: '#fff',
    // },
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
        paddingHorizontal: 25,
        paddingVertical: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 10,
        color:  colors.gray,
        marginTop: 5,
        alignItems: "center"
    },

    content: {
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    statsHeader: {
        marginBottom: 20,
    },
    statsHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    stat: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray,
    },
    goOnlineButton: {
        backgroundColor: '#f5a623',
        padding: 15,
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    goOnlineButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
  })