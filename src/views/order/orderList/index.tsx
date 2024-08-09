import { View, Text } from 'react-native'
import React from 'react'

import OrdersList from '../../../components/order/OrderList'
import { useStyle } from '../../intro/style';

const OrderList = () => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
    <OrdersList/>
    </View>
  )
}

export default OrderList