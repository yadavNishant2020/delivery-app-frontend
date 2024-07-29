// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './views/login/login';
import Home from './views/home';
import store from './store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
