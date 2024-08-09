import React, { useEffect, useState } from 'react';
import { DataTable, Text } from 'react-native-paper';
import { View, TouchableOpacity, Image ,ScrollView} from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../theme';
import { orderData, Order } from './DataTable';
import OrderItem from './OrderItem';
import NoOrder from './NoOrder';

const OrdersList: React.FC = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const [selected, setSelected] = useState<'Meal' | 'Store'>('Meal');
    const [orders, setOrders] = useState<Order[]| null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        setOrders(orderData.length > 0 ? orderData : null);
        const today = new Date();
        setCurrentDate(today.toDateString());
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../public/Bag.png')}
                />
                <Text style={styles.title}>Orders</Text>
            </View>

            <View style={styles.tabs}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selected === 'Meal' ? styles.selectedButton : styles.unselectedButton,
                        ]}
                        onPress={() => setSelected('Meal')}
                    >
                        <Text style={[styles.text, selected === 'Meal' ? styles.selectedText : styles.unselectedText]}>Meal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selected === 'Store' ? styles.selectedButton : styles.unselectedButton,
                        ]}
                        onPress={() => setSelected('Store')}
                    >
                        <Text style={[styles.text, selected === 'Store' ? styles.selectedText : styles.unselectedText]}>Store</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.date}>{currentDate}</Text>
            </View>

           

            {orders ? (
                orders.map((order) => (
                    <OrderItem
                        key={order.orderNo}
                        orderNo={order.orderNo}
                        status={order.status}
                        statusColor={order.statusColor}
                    />
                ))
            ) : (
                <NoOrder/>
            )}
        </View>
        </ScrollView>
    );
};

export default OrdersList;