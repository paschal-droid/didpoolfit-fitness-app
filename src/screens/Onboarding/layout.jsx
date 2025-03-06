import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Welcome from './screens/Welcome'
import { Routes } from '../../navigation/Routes'
import Onboard from './screens/Onboard'

const Stack = createNativeStackNavigator()

const Onboarding = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen component={Welcome} name={Routes.Welcome} />
      <Stack.Screen component={Onboard} name={Routes.Prompt} />
    </Stack.Navigator>
  );
}

const options = {
  header: ()=> null,
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  animation: 'slide_from_right',
}

export default Onboarding

