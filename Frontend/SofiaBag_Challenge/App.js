import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/onboarding/home';
import Login from './src/pages/onboarding/login';
import Initial from './src/pages/onboarding/initial';
import Backpack from './src/pages/settings/backpack';
import NewObject from './src/pages/settings/new object';
import Agenda from './src/pages/schedule/agenda';
import NewReminder from './src/pages/schedule/new reminder';
import Schedule from './src/pages/schedule/calendar';
import listOfObjects from './src/pages/schedule/listOfObjects';
import Registration from './src/pages/onboarding/registration';
import Exception from './src/pages/utils/Exception';
import Settings from './src/pages/settings/settings';
import Profile from './src/pages/settings/profile';
import Password from './src/pages/settings/password';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Initial">
          <Stack.Screen name="Initial" component={Initial} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="NewReminder" component={NewReminder} />
          <Stack.Screen name="Backpack" component={Backpack} />
          <Stack.Screen name="NewObject" component={NewObject} />
          <Stack.Screen name="listOfObjects" component={listOfObjects} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="Exception" component={Exception} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}