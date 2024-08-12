import { StyleSheet } from 'react-native';
import { themeProps } from '../../../theme';
import colors from '../../../shared/colors';
import { FontSize, scale, scaleVertical, scaleHorizontal } from '../../../theme/scale';


export const useStyle = (theme: themeProps) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      marginVertical: scaleVertical(20),
      alignItems: 'center',
      paddingVertical: scale(15),
    },
    contactImage: {
      marginLeft: scale(30),
      height: scale(30),
      width: scale(30),
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
      marginVertical: scaleVertical(20),
      alignItems: 'flex-start',
    },
    orderText: {
      width: '60%',
    },
    orderImage: {
      flexDirection: "row",
      width: '20%'

    },
    productImage: {
     marginHorizontal: scaleHorizontal(70),
     marginVertical: scale(0)
    },
    userAddres: {
      fontSize: FontSize.H6,
      color: colors.gray,
      fontWeight: '400',
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
      marginTop: scale(8),
      height: scale(30),
      width: scale(30),
    },
    HandImage: {
      marginRight: scale(16),
      marginTop: scale(8),
      height: scale(20),
      width: scale(30),
    },

 
    pickupText: {
      fontSize: FontSize.H5,
      fontWeight: '400',
      color: colors.gray,
    },

    productInfo: {
      fontSize: FontSize.H5,
      fontWeight: '400',
      color: colors.black,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    ticImage: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    rsInfo:{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:  scaleVertical(10),
      gap: scale(10),
    },
    rsText:{
      fontSize: FontSize.H5,
      color: colors.black,
      fontWeight: '600',
    },
    paidText: {
      fontSize: FontSize.H5,
      color: colors.green,
      fontWeight: '600',
      marginLeft: scale(4)
    },

    statusInfo:{
      backgroundColor: "#feeeef",
      padding: scale(20),
      borderRadius: scale(10),
      marginBottom: scale(20),
    
    },
    pickupDetails: {
      marginBottom: scale(10),
    },
    pickupTexta: {
      fontSize: FontSize.H4,
      fontWeight: 'bold',
      color: '#f66d74',
    },
    pickupDate: {
      fontSize: FontSize.H6,
      color: colors.black,
    },
    pickupTime: {
      fontSize: FontSize.H5,
      color: colors.black,
    },
    timeLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      padding: scale(10),
      borderRadius: scale(5),
      marginBottom: scale(10),
    },
    timeIcon: {
      marginRight: scale(10),
    },
    timeLeftText: {
      fontSize: FontSize.H6,
      fontWeight: 'bold',
      color: '#f66d74',
    },
    timeLeftTime: {
      fontSize: FontSize.H6,
      color: '#f66d74',
    },
    updateStatus: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: scale(10),
    },
    updateStatusText: {
      fontSize: FontSize.H5,
      fontWeight: 'bold',
      color: '#f66d74',
    },
    selectOption: {
      backgroundColor: '#FFF',
      padding: scale(10),
      borderRadius: scale(5),
      marginTop: scale(5),
    },
    optionInput: {
      fontSize: FontSize.H6,
      color: colors.black,
    },
  
  });

 