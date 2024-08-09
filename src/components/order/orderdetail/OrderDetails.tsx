import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../../theme';

const OrderDetails = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const pickupCenters = [
        {
            id: '1',
            name: 'Pickup Center-1',
            address: 'Nikhita Stores, 201/B, Nirant Apts, Andheri East 400069',
            items: [
                {
                    name: 'Besan Ladoo',
                    quantity: 2,
                    price: 500
                }
            ]
        },
        {
            id: '2',
            name: 'Pickup Center-2',
            address: 'Ananta Stores, 204/C, Apts Andheri East 400069',
            items: [
                {
                    name: 'Atta Ladoo',
                    quantity: 3,
                    price: 500
                }
            ]
        }
    ];



    return (
        <View>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image source={require('../../../public/contact.png')} />
                    <Text style={styles.userName}>Aman Sharma</Text>

                </View>
                <Image style={styles.contactImage} source={require('../../../public/phone.png')} />
            </View>

            {pickupCenters.map((pickup) => (
                <View>
                    <View style={styles.orderInfo}>
                        <View style={styles.userInfo}>

                            <Image source={require('../../../public/hand.png')} />

                            <Text style={styles.userName}>{pickup.name}</Text>



                        </View>
                        <View style={styles.userInfo}>

                            <Image source={require('../../../public/phone.png')} />
                            <Image style={styles.contactImage} source={require('../../../public/telegram.png')} />

                        </View>

                    </View>
                    <Text style={styles.userAddres}>{pickup.address}</Text>
                </View>))}



        </View>
    );
};

export default OrderDetails;