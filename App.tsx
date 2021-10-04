import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './screens/MapScreen';
import { RootStackParamList } from './interface/Root';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
        >
          <Stack.Navigator>
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='MapScreen'
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
