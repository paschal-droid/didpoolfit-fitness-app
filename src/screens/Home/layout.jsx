import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";

import { Routes } from "../../navigation/Routes";
import { SearchTabIcon, TabIcon } from "../../components";
import {color, scaling} from '../../themes/themes'
import { BlurView } from '@react-native-community/blur';
import { fetchUser } from '../../redux/reducers/User';
import { fetchChartData } from '../../redux/reducers/ChartData';

import Main from './screens/Main';
import Profile from './screens/Profile';
import WorkoutTracker from './screens/WorkoutTracker';
import WorkoutSchedule from './screens/WorkoutSchedule';

const {horizontalScale, verticalScale, fontScale} = scaling

const Tab = createBottomTabNavigator()

const EmptyComponent = () => {
  return(null)
}

const Home = () => {
  const {theme} = useTheme();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchChartData())
  }, [dispatch])

  const screenOptions={
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarStyle: {
      height: verticalScale(80),
      position: 'absolute',
      elevation: 10,
      borderTopWidth: 0,
      borderTopLeftRadius: horizontalScale(25),
      borderTopRightRadius: horizontalScale(25),
      backgroundColor: theme.background,
  }
}
 
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/* Home Screen */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home2-outline" size={28} isFocused={focused} />
          ), animation: 'slide_from_right', tabBarLabelPosition: 'below-icon',
        }}
        component={Main}
        name={Routes.Main}
      />

      {/* Activity Screen */}
      <Tab.Screen
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate(Routes.Activity);
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="activity-outline" size={28} isFocused={focused} />
        ), animation: 'slide_from_right', tabBarLabelPosition: 'below-icon',
        }}
        component={EmptyComponent}
        name={'temp-activity'}
        />

        {/* Search Screen */}
        <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchTabIcon name="schedule-add" size={28} isFocused={focused} />
          ), animation: 'slide_from_right', tabBarLabelPosition: 'below-icon',
          tabBarBackground: ()=> (<BlurView overlayColor="" blurAmount={15} blurRadius={15} style={styles.blurViewStyles} />),
          tabBarItemStyle: {bottom: '6%'}
        }}
        component={WorkoutSchedule}
        name={Routes.WorkoutSchedule}
      />

      {/* progress Screen */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="exercise-outlined" size={28} isFocused={focused} />
          ), animation: 'slide_from_right', tabBarLabelPosition: 'below-icon',
        }}
        component={WorkoutTracker}
        name={Routes.WorkoutTracker}
      />

      {/* Profile Screen */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="user-outline" size={28} isFocused={focused} />
          ), animation: 'slide_from_right', tabBarLabelPosition: 'below-icon',
        }}
        component={Profile}
        name={Routes.Profile}
      />
    </Tab.Navigator>
  )
}




export default Home

const styles = StyleSheet.create({
  blurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 1000
  }
})