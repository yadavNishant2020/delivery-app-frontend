import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';


import { useTheme } from '../../theme';
import { useStyle } from './style';

interface ButtonProps {
    title: string;
    onPress: () => void;
    icon?: ImageSourcePropType;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconStyle?: ImageStyle;
    activeOpacity?: number; 
}

const Button: React.FC<ButtonProps> = ({ title, onPress, icon, style, textStyle, iconStyle, activeOpacity }) => {
    const theme = useTheme();
    const styles = useStyle(theme);
    return (
        <TouchableOpacity  activeOpacity={activeOpacity} onPress={onPress} style={[styles.buttonContainer, style]}>
            {icon && <Image source={icon} style={[styles.iconContainer, iconStyle]} />}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};


export default Button;
