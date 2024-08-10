import React, { useState } from 'react';
import { View, Text,  TouchableOpacity, Image } from 'react-native';

import { useStyle } from './style';
import { Order } from './DataTable';
import { useTheme } from '../../theme';
import OrderDetails from './orderdetail/OrderDetails';

const OrderItem: React.FC<Order> = ({ orderNo, status, statusColor }) => {
  const theme = useTheme();
  const styles = useStyle(theme);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getLighterBackground = (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const bigint = parseInt(color.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  const backgroundColor = getLighterBackground(statusColor, 0.2);

  return (

    <TouchableOpacity style={styles.orderItem} onPress={toggleExpanded}>
      <Text style={styles.orderNumber}>Order No.</Text>
      <View style={styles.orderDetails}>
        <Text style={styles.orderNumber}> {orderNo}</Text>

        <Text style={[styles.orderStatus, { backgroundColor: backgroundColor, color: statusColor || theme.colors.gray }]}>{status}</Text>
      </View>

      {expanded && (
        <OrderDetails />
      )}

      <View style={styles.expandedIcon}>
        <Image source={require('../../public/arrowIcon.png')} />
      </View>


    </TouchableOpacity>
  );
};

export default OrderItem;