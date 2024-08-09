import { StyleSheet } from 'react-native';
import { themeProps } from '../../theme';
import colors from '../../shared/colors';
import { FontSize, scale, scaleVertical, scaleHorizontal } from '../../theme/scale';


export const useStyle = (theme: themeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: scaleVertical(20),
            backgroundColor: colors.white,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        date: {
            fontSize: FontSize.H5,
            color: colors.gray,
        },
        tabs: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingVertical: scale(15),
        },
       
        table: {
            backgroundColor: colors.white,
            flex: 1,
            padding: scale(20),
        },
///meal store button css
        toggleContainer: {
            flexDirection: 'row',
            backgroundColor: colors.white,
            height:scaleVertical(40),
            width:"50%",
            alignItems: 'center',
            borderRadius: scale(30),
            justifyContent: 'space-between',
          },
          button: {
            height: scaleVertical(40),
            width:"50%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: scaleHorizontal(20),
            borderRadius: scale(30),
          },
          selectedButton: {
            backgroundColor: colors.primary,
          },
          unselectedButton: {
            backgroundColor: colors.white,
          },
          text: {
            fontSize: FontSize.H5,
            fontWeight: 'bold',
          },
          selectedText: {
            color: colors.white,
          },
          unselectedText: {
            color: colors.gray,
          },

          ///order Items css

          orderItem: {
            padding: scale(15),
            backgroundColor: colors.white,
            borderRadius: scale(8),
            marginBottom: 10,
          },
          orderDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          orderNumber: {
            fontSize: FontSize.H5,
            color: colors.black,
            fontWeight: 'bold',
          },
          orderStatus: {
            padding: scale(4),
            fontSize: FontSize.H6,
            color: colors.gray,
            borderRadius: scale(5)
          },
          expandedContent: {
            padding: scale(10),
            backgroundColor: '#f2f2f2',
            borderRadius: 8,
            marginTop: 10,
          },
          expandedIcon:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },

          /// No new order css
          noOrder:{
            fontWeight: 400,
            fontSize: FontSize.H3,
            marginTop: scale(10),
            color: colors.black
          },

          noOrdercontainer:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          scrollContainer: {
            paddingBottom: 20, // Ensure there is space at the bottom of the scroll
          },
    })