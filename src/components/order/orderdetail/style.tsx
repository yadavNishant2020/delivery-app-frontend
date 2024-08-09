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
        orderInfo:{
            flexDirection: 'row',
            marginVertical: scaleVertical(20),
            alignItems: 'center',
            justifyContent: 'space-between'
           
        },
        
        userAddres:{
            fontSize : FontSize.H6,
            color : colors.gray,
        },
     
      });