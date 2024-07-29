import {StyleSheet} from 'react-native';
import {FontSize, scale, scaleVertical} from '../../theme/scale';
import colors from '../../shared/colors';

export const useStyle = theme =>
  StyleSheet.create({
    container: {
      paddingTop: scaleVertical(15),
      marginTop: scaleVertical(-15),
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      alignItems: 'center', // Center align content horizontally
      paddingHorizontal: scale(20), // Adjust as needed
    },
    imgContainer: {
      height: scaleVertical(220),
      width: '100%',
      objectFit: 'cover',
    },
    help: {
      color: colors.primary,
      fontSize: FontSize.H6,
      textAlign: 'right',
      fontFamily: 'Montserrat-ExtraBold',
      paddingVertical: scale(10),
      paddingHorizontal: scale(20), // Adjust as needed

      fontWeight: '800',
    },
    logoContainer: {
      height: scaleVertical(120),
      width: scaleVertical(120),
      alignItems: 'center',
    },
    input: {
      width: '100%',
      height: scaleVertical(45),
      borderColor: 'gray',
      color: 'black',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: scale(15),
      marginVertical: scaleVertical(10),
      fontFamily: 'NunitoSans-Regular', // Use the Nunito Sans font
      fontSize:scaleVertical(15)
    },
    btn: {
      backgroundColor: colors.primary,
      padding: scale(15),
      marginVertical: scaleVertical(10),
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    signinText: {
      fontSize: FontSize.H3,
      color: 'white',
      fontFamily: 'NunitoSans_7pt_Condensed-ExtraLight', 

    },
    signinbtn: {
      marginVertical: scaleVertical(10),
      borderRadius: 50,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: colors.primary,
      padding: scale(15),
    },
    signupBtn: {
      marginVertical: scaleVertical(5),
      padding: scale(15),
      borderRadius: 50,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    signupText: {
      fontSize: FontSize.H3,
      color: colors.primary,
    },
  });
