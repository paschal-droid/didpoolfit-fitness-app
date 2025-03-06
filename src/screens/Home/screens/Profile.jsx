import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { PageHeader, ProfileInfoCard, Setting, Title } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { color, getFontFamily, scaling } from '../../../themes/themes'
import { Routes } from '../../../navigation/Routes'
import Animated, { Easing, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const {horizontalScale, verticalScale, fontScale} = scaling

const Profile = ({navigation}) => {
  const {theme} = useTheme()
  const tabBarHeight = useBottomTabBarHeight()
  

  const accountList = [
    {icon: 'user-outline', title: 'Personal Data', extraIcon: 'arrow-right', route: Routes.Profile},
    {icon: 'document', title: 'Achievement', extraIcon: 'arrow-right', route: Routes.Home},
    {icon: 'pie', title: 'Activity History', extraIcon: 'arrow-right', route: Routes.Activity},
    {icon: 'chart', title: 'Workout Progress', extraIcon: 'arrow-right', route: Routes.WorkoutTracker},
  ]

  const otherList = [
    {icon: 'mail', title: 'Contact Us', extraIcon: 'arrow-right'},
    {icon: 'shield-check', title: 'privacy policy', extraIcon: 'arrow-right'},
    {icon: 'settings', title: 'settings', extraIcon: 'arrow-right'},
  ]

  
  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <View style={[{marginBottom: tabBarHeight, flex: 1}]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  rowGap: 30}}>
          {/* Header */}
          <Animated.View entering={FadeInUp.delay(100).springify().easing(Easing.ease)} style={[styles.header]}>
            <PageHeader headerText={'Profile'} />
          </Animated.View>

          {/* User Info */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.userInfoContainer}>
            <ProfileInfoCard />
          </Animated.View>
          
          {/* User Account Settings */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.settingContainer}>
            <Title name='Account' />
            <View style={{gap: 12}}>
              {accountList.map((setting, i) => (
                <Setting key={i} icon={setting.icon} title={setting.title} extraIcon={setting.extraIcon} onPress={() => navigation.navigate(setting.route)} />
              ))}
            </View>
          </Animated.View>

          {/* Notification settings */}
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.settingContainer}>
            <Title name='Notification' />
            <Setting onPress={() => {}}  icon={'bell-inactive'} title={'Pop-up Notification'} extraIcon={''} />
          </Animated.View>

          {/* Other Settings */}
          <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.settingContainer}>
            <Title name='Other' />
            <View style={{gap: 12}}>
              {otherList.map((setting, i) => (
                <Setting onPress={() => {}} key={i} icon={setting.icon} title={setting.title} extraIcon={setting.extraIcon} />
              ))}
            </View>
          </Animated.View>
          
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  userInfoContainer: {
    marginTop: verticalScale(10),
  },
  settingContainer: {
    marginTop: verticalScale(5),
    gap: 15
  },
})