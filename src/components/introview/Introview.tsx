import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text,  TouchableOpacity, Image, Alert } from 'react-native';

import {useStyle} from "./style"
import { useTheme } from '../../theme';
import { logout } from '../../store/slice';
import Button from '../reusableComponents/Button';

const Introview = () => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleProfileClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        dispatch(logout());

        navigation.navigate('LogIn' as never);

        Alert.alert('Logged out successfully');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleProfileClick}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXm-O-jUQIrBf1KDc0hGhQJnZQ7ZuDD4YFZw&s' }} // Replace with your image URL
                        style={styles.image}
                    />
                </TouchableOpacity>

                {isDropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <Image
                        source={{ uri: 'https://www.shutterstock.com/image-vector/money-cash-corruption-icon-outline-260nw-1611951451.jpg' }}
                        style={styles.iconContainer}
                    />
                    <Text style={styles.buttonText}>Payout</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Image
                        source={{ uri: 'data:image/png;base64,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' }}
                        style={styles.iconContainer}
                    />
                    <Text style={styles.buttonText}>Past Jobs</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk6RdlP6ZULLHlx5r4kEFBG0vj8MZDtqiZtA&s' }}
                        style={styles.iconContainer}
                    />
                    <Text style={styles.buttonText}>Helpline</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwvzoYtUomExv64fS6Oak-DrRkuk70FamBQ&s' }}
                        style={styles.iconContainer}
                    />
                    <Text style={styles.buttonText}>More</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.statsHeader}>
                    <Text style={styles.statsHeaderText}>Yesterday</Text>
                </View>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Money Earned</Text>
                        <Text style={styles.statValue}>INR 270</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Total Hours</Text>
                        <Text style={styles.statValue}>8 hrs</Text>
                    </View>
                </View>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Total Distance</Text>
                        <Text style={styles.statValue}>137 km</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Total Jobs</Text>
                        <Text style={styles.statValue}>17</Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.signinbtn}
                onPress={() => navigation.navigate('Map' as never)}
            >
                <Text style={styles.signinText}>Go Online</Text>
            </TouchableOpacity>
            <Button title='Go Online' onPress={() => navigation.navigate('Map' as never)}/>

        </View>
    );
};



export default Introview;