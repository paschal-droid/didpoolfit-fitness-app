import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import {ActivityProgressCard, DailyActivity, Icon, NotificationCard, PageHeader, } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { color, getFontFamily, scaling } from '../../../themes/themes'
import Animated, { Easing, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { localNotifs2 } from '../../../data/constants'


const {horizontalScale, verticalScale, fontScale} = scaling


const Activity = () => {
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const [visibleActivity, setVisibleActivity] = useState(false)
  const [activity, setActivity] = useState(localNotifs2)

  const handleShowFocus = () => {
    setVisibleActivity(prev => !prev)
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, rowGap: 30}}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify().easing(Easing.ease)} style={[styles.header]}>
          <PageHeader headerText={'Activity Tracker'} />
        </Animated.View>

        {/* Daily Target */}
        <Animated.View entering={FadeInLeft.delay(250).springify().easing(Easing.ease)}>
          <LinearGradient 
              useAngle={true}
              angle={274}
              locations={[0, 1.25]}
              colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
              style={[styles.dailyActivityContainer]}
            >
              <View style={[
                styles.shadowContainer,
                {backgroundColor: appTheme ? color.shadowDark : color.shadowLight},
                ]}
              />
              <View style={[styles.addTargetContainer]}>
                <Text style={[styles.addTargetText, {color: theme.header}]}>Today's Target</Text>
                <Icon name='add' style={[styles.addTargetButton, {backgroundColor: theme.linearType2Clr1, color: theme.background}]} />
              </View>

              <View style={[styles.daily]}>
                <DailyActivity target={'drink'} />
                <DailyActivity target={'steps'} />
              </View>
          </LinearGradient>
        </Animated.View>

        {/* Activity Chart */}
        <Animated.View entering={FadeInRight.delay(400).springify().easing(Easing.ease)}>
          <ActivityProgressCard />
        </Animated.View>

       {/* Latest activity */}
        <Animated.View entering={FadeInDown.delay(500).springify().easing(Easing.ease)} style={styles.latestActivityContainer}>
          <View style={styles.latestActivityHeader}>
            <Text style={[styles.latestActivityTitle, { color: theme.header }]}>Latest Activity</Text>
            <TouchableOpacity style={styles.latestActivityOption} onPress={handleShowFocus}>
              <Text style={[styles.latestActivityOptionText, {color: theme.iconType2}]}>{visibleActivity ? 'Show Less' : 'See More'}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.latestActivityNotificationContainer]}>
            
            {visibleActivity ?  (
              activity.map((notification, i) => (
                <View key={i}>
                  <NotificationCard showLine={false} imageAction={notification.action} message={notification.message} notificationDate={notification.date} />
                </View>
    
              ))
            )
          :  (
            activity.slice(0,2).map((notification, i) => (
              <View key={i}>
                <NotificationCard showLine={false} imageAction={notification.action} message={notification.message} notificationDate={notification.date} />
              </View>
  
            ))
          ) }
        </View>
        </Animated.View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Activity

const styles = StyleSheet.create({
  shadowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: horizontalScale(22),
  },
  dailyActivityContainer: {
    borderRadius: horizontalScale(22),
    gap: 15,
    padding: horizontalScale(20),
    justifyContent: 'center'
  },
  addTargetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  addTargetText: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(15),
  },
  addTargetButton: {
    padding: horizontalScale(8),
    borderRadius: horizontalScale(8),
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  daily: {
    flexDirection: 'row',
    gap: 15,
    alignSelf: 'center'
  },
  latestActivityContainer: {
    marginTop: verticalScale(10)
  },
  latestActivityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  latestActivityTitle: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(17),
    lineHeight: fontScale(24),
  },
  latestActivityOptionText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
  },
  latestActivityNotificationContainer: {
    gap: 20,
    marginTop: verticalScale(20)
  },
  latestActivityOption: {
    width: horizontalScale(58),
    height: verticalScale(18),
    alignItems: 'center',
    justifyContent: 'center'
  }
})