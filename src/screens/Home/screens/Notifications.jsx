import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NotificationCard, PageHeader} from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { scaling } from '../../../themes/themes'
import Animated, { Easing, FadeInLeft, FadeInUp } from 'react-native-reanimated'
import { localNotifs } from '../../../data/constants'

const {horizontalScale, verticalScale, fontScale} = scaling



const Notifications = () => {
  const {theme} = useTheme()
  
  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, rowGap: 30}}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify().easing(Easing.ease)} style={[styles.header]}>
          <PageHeader headerText={'Notifications'} />
        </Animated.View>
        
        {/* Notifications */}
        <View style={[styles.notification]}>
          {localNotifs.map((notification, i) => (
            <Animated.View entering={FadeInLeft.delay((i + localNotifs.length) * 100).duration(500)} key={i}>
              <NotificationCard imageAction={notification.action} message={notification.message} notificationDate={notification.date} />
            </Animated.View>

          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({
  notification: {
    gap: 20,
    marginTop: verticalScale(20)
  }
})