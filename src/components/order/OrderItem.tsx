import React, { useState } from 'react';
import { View, Text,  TouchableOpacity, Image } from 'react-native';

import { useStyle } from './style';
import { Order } from './DataTable';
import { useTheme } from '../../theme';
import OrderDetails from '../mapview/OrderDetails';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../../theme/scale';

const OrderItem: React.FC<Order> = ({ orderNo, status, statusColor }) => {
  const theme = useTheme();
  const styles = useStyle(theme);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

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
        <OrderDetails navigation={navigation}/>
      )}

      <View style={styles.expandedIcon}>
        <Image source={require('../../public/arrowIcon.jpg')} style={{width: scale(14), height: scale(8)}} />
      </View>


    </TouchableOpacity>
  );
};

export default OrderItem;