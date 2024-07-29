// LogIn.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useStyle } from './style';
import { useTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice';

const LogIn = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useStyle(theme);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://192.168.1.2:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sign in successful');
        dispatch(login());
        navigation.navigate('Home' as never);
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert('Error:', (error as Error).message);
    }
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return null;
  };

  const handleSignUp = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.2:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('User created successfully');
        navigation.navigate('Home' as never);
        setIsSignUp(false);
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert('Error:', (error as Error).message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
        <Image
          source={require('../../public/bg-2.jpeg')}
          style={styles.imgContainer}
          resizeMode="stretch"
        />
        <View style={styles.container}>
          <Image
            source={require('../../public/logo.png')}
            style={styles.logoContainer}
            resizeMode="contain"
          />

          {isSignUp ? (
            <>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                placeholderTextColor="black"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Username"
                style={styles.input}
                placeholderTextColor="black"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.signinbtn}
                onPress={handleSignUp}
              >
                <Text style={styles.signinText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter your username"
                style={styles.input}
                placeholderTextColor="black"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder="Enter your password"
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.signinbtn}
                onPress={handleSignIn}
              >
                <Text style={styles.signinText}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.signupBtn}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.signupText}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.help}>Need Help?</Text>
      </View>
    </ScrollView>
  );
};

export default LogIn;
