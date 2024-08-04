import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';

import colors from '../../shared/colors';
import { FontSize, scale, scaleVertical } from '../../theme/scale';

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
    return (
        <TouchableOpacity  activeOpacity={activeOpacity} onPress={onPress} style={[styles.buttonContainer, style]}>
            {icon && <Image source={icon} style={[styles.iconContainer, iconStyle]} />}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: scale(15),
        marginVertical: scaleVertical(10),
        borderRadius: 50,
        textAlign: 'center',
        width: '100%',
       
    },

    iconContainer: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        fontSize: FontSize.H3,
        color: "white",
        fontFamily: 'NunitoSans_7pt_Condensed-ExtraLight',
    },
});

export default Button;
