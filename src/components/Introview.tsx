import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const Introview = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profilePic}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <View style={styles.buttonContainer}>
                        <Icon style={styles.iconContainer} name="attach-money" size={20} color="#000" />
                        <Text style={styles.buttonText}>Payout</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Icon style={styles.iconContainer} name="attach-money" size={20} color="#000" />
                        <Text style={styles.buttonText}>Past Jobs</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Icon style={styles.iconContainer} name="attach-money" size={20} color="#000" />
                        <Text style={styles.buttonText}>Helpline</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Icon style={styles.iconContainer} name="attach-money" size={20} color="#000" />
                        <Text style={styles.buttonText}>More</Text>
                    </View>
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
            
                <TouchableOpacity style={styles.goOnlineButton}>
                    <Text style={styles.goOnlineButtonText}>Go Online</Text>
                </TouchableOpacity>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profilePic: {
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 25, 
        paddingVertical: 15,
        borderRadius: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
        alignItems: "center"
    },
    
    content: {
        padding: 20,
        marginTop:20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    statsHeader: {
        marginBottom: 10,
    },
    statsHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stat: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    },
    goOnlineButton: {
        backgroundColor: '#f5a623',
        padding: 15,
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    goOnlineButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Introview;