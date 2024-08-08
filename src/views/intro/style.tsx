import { StyleSheet } from 'react-native';
import { scale } from '../../theme/scale';

export const useStyle = () =>
    StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            margin: scale(17),
        },
    });
