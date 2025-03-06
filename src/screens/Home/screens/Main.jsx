import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { NavPress, Header, BMICard, TargetCard, ActivityCard, Articles } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { Routes } from '../../../navigation/Routes'
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp} from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'



const Main = ({navigation}) => {
  const {theme} = useTheme()
  const tabBarHeight = useBottomTabBarHeight()
  const {activeUser} = useSelector(state => state.user)   
 
  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <StatusBar backgroundColor={theme.background} barStyle={theme.statusBarTextColor} />
      <View style={[{ flex: 1}]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, rowGap: 30}}>
          {/* Header */}
          <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.header]}>
            <Header subText='Welcome Back,' headerText={activeUser ? `${activeUser.firstName} ${activeUser.lastName}` : '...'} />
            <NavPress activity={true} icon={'bell-inactive'} onPress={() => navigation.navigate(Routes.Notify)} />
          </Animated.View>

          {/* BMI Banner */}
          <Animated.View entering={FadeInRight.delay(200).springify()}>
            <BMICard />
          </Animated.View>

          {/* Target Banner */}
          <Animated.View entering={FadeInLeft.delay(300).springify()}> 
            <TargetCard name={'Today Target'} tabName={'Check'} />
          </Animated.View>

          {/* Activity Status */}
          <Animated.View entering={FadeInRight.delay(400).springify()}>
            <ActivityCard />
          </Animated.View>

          {/* Article List  */}
          <Animated.View entering={FadeInDown.delay(500).springify()} style={{marginBottom: tabBarHeight,}}>
            <Articles />
          </Animated.View>

          
        </ScrollView>

      </View>

    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shadowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  
})