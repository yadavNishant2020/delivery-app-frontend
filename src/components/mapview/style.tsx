import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../shared/colors';
import { FontSize, scale, scaleHorizontal, scaleVertical } from '../../theme/scale';
import { themeProps } from '../../theme';

const { height } = Dimensions.get('window');
export const useStyle = (theme: themeProps) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    errorText: {
      color: colors.dangers,
      margin: scale(10),
    },
    toggleContainer: {
      position: 'absolute',
      top: 50,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: scale(10),
      borderRadius: scale(20),
      elevation: 5,
    },
    toggleLabel: {
      fontSize: FontSize.H5,
      marginRight: (10),
      color: colors.black
    },

    bottomSheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: height * 0.3,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
    },
    sheetContent: {
      fontSize: 16,
    },
    toggleButton: {
      position: 'absolute',
      bottom: height * 0,
      alignSelf: 'center',
      padding: 10,
      borderRadius: 30,
    },

    expandedContent: {
      marginTop: scale(10),
      borderRadius: scale(8),
    },

    dashedLine: {
      borderBottomWidth: scale(0.5),
      borderStyle: 'dashed',
      width: '100%',
      height: scaleHorizontal(1),
      color: colors.black,
      marginTop: scale(16),
      marginBottom: scale(10),
    },
    image: {
      marginRight: scale(16),
      marginTop: scale(8)
    },
    contactImage: {
      marginLeft: scale(30),
      height: scale(10),
      width: scale(10),
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userName: {
      marginLeft: scale(8),
      fontSize: FontSize.H5,
      color: colors.black,
      fontWeight: 'bold'
    },
    orderInfo: {
      flexDirection: 'row',
      marginVertical: scaleVertical(5),
      alignItems: 'flex-start',
    },
    orderText: {
      width: '60%',
    },
    pickupText: {
      fontSize: FontSize.H5,
      fontWeight: '400',
      color: colors.gray,
    },
    userAddres: {
      fontSize: FontSize.H6,
      color: colors.gray,
      fontWeight: '400',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      width: "80%",
      margin: 'auto'
    }
  })