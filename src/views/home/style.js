import {StyleSheet} from 'react-native';

export const useStyle = theme =>
  StyleSheet.create({  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  });
