import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { View, Image, ScrollView } from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../theme';
import { orderData, Order } from './DataTable';
import OrderItem from './OrderItem';
import CustomDropdown from '../reusableComponents/DropdownBox';

const OrdersList: React.FC = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');


    const handleSelect = (item: string) => {
        setCurrentDate(item);
    };

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
                    
                    <CustomDropdown data={['2/06/2024', '12/06/2024', '14/06/2024']}
                        onSelect={handleSelect}
                        placeholder="Select an Item" />
                
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
                    <View style={styles.noOrdercontainer}>

                        <Image
                            source={require('../../public/noOrder.png')}
                        />
                        <Text style={styles.noOrder}>No New Order</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default OrdersList;