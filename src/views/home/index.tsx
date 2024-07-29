import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice'; 

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate('LogIn' as never);

    Alert.alert('Logged out successfully');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 , color: 'black'}}>HOME</Text>
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', fontSize: 16 }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
