import React, { useEffect, useState } from 'react';
import { DataTable, Text } from 'react-native-paper';
import { View, TouchableOpacity, Image } from 'react-native';

import { useStyle } from './style';
import { useTheme } from '../../theme';

const NoOrder: React.FC = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
 
    return (
        <View style={styles.noOrdercontainer}>

            <Image
                source={require('../../public/noOrder.png')}
            />
            <Text style={styles.noOrder}>No New Order</Text>
        </View>



    );
};

export default NoOrder;