import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { useStyle } from '../order/orderdetail/style';
import { useTheme } from '../../theme';
import CustomDropdown from '../reusableComponents/DropdownBox';
import Button from '../reusableComponents/Button';
import { scale } from '../../theme/scale';

type Props = {
    navigation: any;
};

const OrderDetails = ({ navigation }: Props) => {
    const theme = useTheme();
    const styles = useStyle(theme);
    // const navigation = useNavigation<CustomMapViewNavigationProp>();

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (item: string) => {
        setSelectedOption(item);
    };

    const pickupCenters = [
        {
            id: '1',
            name: 'Pickup Center-1',
            address: 'Nikhita Stores, 201/B, Nirant Apts, Andheri East 400069',
            items:
            {
                name: 'Besan Ladoo',
                quantity: 2,
                price: 500
            },
            pickupLocation: {
                latitude: 28.4483,
                longitude: 77.0653,
                title: 'Nikhita Stores, 201/B, Nirant Apts, Andheri East 400069',
            },
            dropLocation: {
                latitude: 28.4483,
                longitude: 77.0653,
                title: 'Ananta Stores, 204/C, Apts Andheri East 400069',
            }
        },
        {
            id: '2',
            name: 'Pickup Center-2',
            address: 'Ananta Stores, 204/C, Apts Andheri East 400069',
            items:
            {
                name: 'Atta Ladoo',
                quantity: 3,
                price: 500
            },
            pickupLocation: {
                latitude: 28.4483,
                longitude: 77.0653,
                title: 'Ananta Stores, 204/C, Apts Andheri East 400069',
            },
            dropLocation: {
                latitude: 28.4483,
                longitude: 77.0653,
                title: 'Nikhita Stores, 201/B, Nirant Apts, Andheri East 400069',
            }

        }
    ];

    return (
        <View style={styles.expandedContent}>
            <View style={styles.dashedLine} />
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image source={require('../../public/contact.jpg')} style={{width: scale(30), height: scale(25)}} />
                    <Text style={styles.userName}>Aman Sharma</Text>

                </View>
                <Image style={styles.contactImage} source={require('../../public/phone.jpg')} />
            </View>

            {pickupCenters.map((pickup, id) => (
                <View key={id}>
                    <View
                        style={styles.orderInfo}>
                        <Image
                            source={require('../../public/hand.jpg')}
                            style={[styles.HandImage]}
                        />
                        <View style={styles.orderText}>
                            <Text style={styles.pickupText}>{pickup.name}</Text>
                            <Text style={styles.userAddres}>
                                {pickup.address}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Image source={require('../../public/productImage.png')}  />
                                <View>
                                    <Text style={styles.productInfo}>
                                        {pickup.items.name}
                                    </Text>
                                    <Text style={styles.userAddres}>
                                        {pickup.items.quantity}
                                    </Text>
                                    <Text style={styles.userAddres}>
                                        {pickup.items.price}
                                    </Text>
                                </View>
                                <Image source={require('../../public/vegTick.png')} style={[styles.ticImage, { marginLeft: 8 }]} />

                            </View>

                        </View>
                        <View style={styles.orderImage}>
                            <Image source={require('../../public/phone.jpg')} style={styles.image} />
                            <TouchableOpacity
                                onPress={() => {
                                    const selectedPickupCenter = pickupCenters.find((center) => center.id === selectedOption);
                                    if (selectedPickupCenter) {
                                        console.log(selectedPickupCenter.pickupLocation.latitude, selectedPickupCenter.pickupLocation.longitude);
                                        
                                        navigation.navigate('Map', {
                                            pickupLocation: selectedPickupCenter.pickupLocation,
                                            dropLocation: selectedPickupCenter.dropLocation,
                                        });
                                    }
                                }}
                            >
                                <Image
                                    source={require('../../public/telegram.jpg')}
                                    style={styles.image} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.orderImage}>

                    </View>
                    <View style={styles.dashedLine} />
                </View>))}

            <View
                style={styles.orderInfo}>
                <Image
                    source={require('../../public/location.jpg')}
                    style={[styles.image]}
                />
                <View style={styles.orderText}>
                    <Text style={styles.pickupText}>Delivery</Text>
                    <Text style={styles.pickupText}>201/D, Ananta Apts, Near</Text>
                    <Text style={styles.userAddres}>
                        Jal Bhawan, Andheri 400069
                    </Text>
                </View>
                <View style={styles.productImage}>
                    <Image
                        source={require('../../public/telegram.jpg')}
                        style={styles.image}
                    />
                </View>
            </View>

            <View style={styles.rsInfo}>
                <Image
                    source={require('../../public/money.png')}
                />
                <Text style={styles.rsText}>₹ 23000</Text>
                <Text style={styles.paidText}>
                    <Image
                        source={require('../../public/greencheck.png')}
                        style={{width: scale(20), height: scale(20)}}
                    /> Paid</Text>
            </View>

            <View style={styles.statusInfo}>
                <View style={styles.pickupDetails}>
                    <Text style={styles.pickupTexta}>Delivery Pickup By</Text>
                    <Text style={styles.pickupDate}>Tomorrow</Text>
                    <Text style={styles.pickupTime}>5:30 PM, Thu, 25/08/2023</Text>
                </View>
                <View style={styles.timeLeft}>
                    <View style={styles.timeIcon}>
                        <Image
                            source={require('../../public/greencheck.png')}
                            style={{width: scale(20), height: scale(20)}}
                        />
                    </View>
                    <Text style={styles.timeLeftText}>TIME LEFT</Text>
                    <Text style={styles.timeLeftTime}>1:04 Hrs</Text>
                </View>
                <View style={styles.updateStatus}>
                    <Text style={styles.updateStatusText}>Update Status</Text>
                    <CustomDropdown data={['Option 1', 'Option 2', 'Option 3']}
                        onSelect={handleSelect}
                        placeholder="Select an Item" />
                </View>
            </View>

            <Button
            title='Confirm Pickup'
            activeOpacity={0.7}
            onPress={() => {
                console.log('annu');
                const selectedPickupCenter = pickupCenters.find((center) => center.id === selectedOption);
                if (selectedPickupCenter) {
                console.log("selectedPickupCenter.pickupLocation", selectedPickupCenter.pickupLocation);
                console.log("selectedPickupCenter.dropLocation", selectedPickupCenter.dropLocation);
                
                    navigation.navigate('Main', {
                        screen: 'Map',
                        params: {
                            pickupLocation: selectedPickupCenter.pickupLocation,
                            dropLocation: selectedPickupCenter.dropLocation,
                        }
                    });
                }
            }}
/>

        </View>

    );
};

export default OrderDetails;