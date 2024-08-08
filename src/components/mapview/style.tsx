import { StyleSheet } from 'react-native';

import colors from '../../shared/colors';
import { FontSize, scale, scaleVertical, } from '../../theme/scale';
import { themeProps } from '../../theme';

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
    })