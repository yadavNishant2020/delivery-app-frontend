import { StyleSheet } from 'react-native';
import { scale } from '../../theme/scale';

export const useStyle = theme =>
    StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            margin: scale(17),
        },
    });
