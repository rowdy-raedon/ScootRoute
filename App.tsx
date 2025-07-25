import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import NavigationScreen from './src/components/Navigation/NavigationScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Navigation" 
            component={NavigationScreen}
            options={{ title: 'ScootRoute' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
