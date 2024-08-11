import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../theme';
import Button from '../reusableComponents/Button';
import { useNavigation } from '@react-navigation/native';

interface OrderDeliverProps {
    pickupLocation: {
        latitude: number;
        longitude: number;
        title: string;
    };
    dropLocation: {
        latitude: number;
        longitude: number;
        title: string;
    };
}

const OrderDeliver: React.FC<OrderDeliverProps> = ({ pickupLocation, dropLocation }) => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.expandedContent}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image source={require('../../public/contact.png')} />
                        <Text style={styles.userName}>Aman Sharma</Text>
                    </View>
                    <Image style={styles.contactImage} source={require('../../public/phone.png')} />
                </View>

                <View
                    style={styles.orderInfo}>
                    <Image
                        source={require('../../public/location.png')}
                        style={[styles.image]}
                    />
                    <View style={styles.orderText}>
                        <Text style={styles.pickupText}>Delivery</Text>

                        <Text style={styles.pickupText}>{pickupLocation.title}</Text>
                        <Text style={styles.userAddres}>{dropLocation.title}
                            Jal Bhawan, Andheri 400069
                        </Text>
                    </View>
                </View>

                <Button title='Start' style={styles.button} activeOpacity={0.7}
                    icon={require('../../public/telegram.png')}
                    onPress={() => navigation.navigate('Map' as never)} />
            </View>
        </ScrollView>

    );
};

export default OrderDeliver;