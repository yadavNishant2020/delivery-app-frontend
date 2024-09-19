import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './views/login/login';
import Map from './views/home';
import Account from './views/intro/intro';
import Orders from './views/order/orderList';
import store from './store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './shared/colors';
import { scale, scaleVertical } from './theme/scale';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Orders') {
            iconName = 'list';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }
          return <Ionicons name={iconName ?? ''} color={color} size={size} />;
        },
        tabBarActiveTintColor: colors.primary,  
        tabBarInactiveTintColor: colors.gray,   
        headerShown: false,  
        tabBarStyle: {
          paddingBottom: scaleVertical(5),
          height:scale(60),              
        },
      })}
    >
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
