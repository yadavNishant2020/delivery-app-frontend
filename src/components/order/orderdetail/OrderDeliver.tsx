import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
   } from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../../theme';
import Button from '../../reusableComponents/Button';
import { useNavigation } from '@react-navigation/native';
const OrderDeliver = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const navigation = useNavigation();

    return (
        <View style={styles.expandedContent}>
            <View style={styles.dashedLine} />
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image source={require('../../../public/contact.png')} />
                    <Text style={styles.userName}>Aman Sharma</Text>

                </View>
                <Image style={styles.contactImage} source={require('../../../public/phone.png')} />
            </View>

          
            <View
                style={styles.orderInfo}>
                <Image
                    source={require('../../../public/location.png')}
                    style={[styles.image]}
                />
                <View style={styles.orderText}>
                    <Text style={styles.pickupText}>Delivery</Text>
                    <Text style={styles.pickupText}>201/D, Ananta Apts, Near</Text>
                    <Text style={styles.userAddres}>
                        Jal Bhawan, Andheri 400069
                    </Text>
                </View>
            </View>

          
            
            <Button title='Start' activeOpacity={0.7} 
            icon={require('../../../public/telegram.png')}
                onPress={() => navigation.navigate('Map' as never)}/>
        </View>

    );
};

export default OrderDeliver;