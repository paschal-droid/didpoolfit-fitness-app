import { Image, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import Animated, { FadeInDown, FadeInRight, Easing } from 'react-native-reanimated'
import { scaling, color} from '../../../themes/themes';
import { ActionBtn, Welcome2 } from '../../../components'

// images
import darkImage from '../../../assets/images/Illustrations/signin/registration-success.png'
import lightImage from '../../../assets/images/Illustrations/signin/registration-success-light.png'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetUserInfo } from '../../../redux/reducers/AccountCreationInfo'
import { Routes } from '../../../navigation/Routes'

const {horizontalScale, verticalScale} = scaling



const Flow4 = ({navigation}) => {
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const {firstName} = useSelector(state => state.userInfo)
  const dispatch = useDispatch()

  const finishedOnboarding = async () => {
    await AsyncStorage.setItem('registrationCompleted', 'true');
    dispatch(resetUserInfo())
    navigation.navigate(Routes.MainNavigation, {screen: Routes.Home})
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <StatusBar backgroundColor={theme.background} barStyle={theme.statusBarTextColor}  />

      <View style={[styles.successContainer]}>
        <View style={[styles.contentSuccess]}>
          <Image style={[styles.successImage]} source={appTheme ? darkImage : lightImage} />

          <Animated.View style={[styles.message, {width: '80%', alignSelf: 'center'}]} entering={FadeInRight.delay(200).springify().easing(Easing.ease)}>
            <Welcome2 centerAlign={true} headerText={ firstName ?  `Welcome, ${firstName}!` : 'Welcome !'} subText='You are all set now, let’s reach your goals together with us' />
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(300).springify().easing(Easing.bounce)} style={styles.bottom}>
          <ActionBtn actionText='Go To Home' onPress={finishedOnboarding} />
        </Animated.View>


      </View>

    </SafeAreaView>
  )
}

export default Flow4

const styles = StyleSheet.create({
  successContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: verticalScale(30),
    gap: 20
  },
  successImage: {
    
  },
  contentSuccess: {
    gap: 48,
    flex: 1,
    alignItems: 'center',
  },
})
