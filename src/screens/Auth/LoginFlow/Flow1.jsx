import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ActionBtn, AuthInput, KeyboardView, Line, Loader, SocialAuthButton, Welcome } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import { Routes } from '../../../navigation/Routes'
import Animated, { Easing, FadeInDown, FadeInRight } from 'react-native-reanimated'
import { facebookLogin, googleLogin, loginUser } from '../../../api/userAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserInfo } from '../../../redux/reducers/AccountCreationInfo'

const {horizontalScale, verticalScale, fontScale} = scaling

const Flow1 = ({navigation}) => {
  const {theme} = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const {existingUser} = useSelector(state => state.userInfo)


  // ! AUTH FUNCTIONS FOR LOGIN  STARTS HERE

  const handleFacebookLogin = async () => {
    setLoading(true)
    let fbLogin = await facebookLogin(dispatch)
    if (fbLogin.status === true && existingUser) {
      await AsyncStorage.setItem('registrationCompleted', 'true')
      dispatch(resetUserInfo())
      navigation.navigate(Routes.MainNavigation, { screen: Routes.Home })
    } else {
      navigation.navigate(Routes.SignupFlow2)
    }
    if(fbLogin.status === false && fbLogin.error){
      setError(fbLogin.error)
      console.log(fbLogin.error);
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    let ggLogin = await googleLogin(dispatch)
    if (ggLogin.status === true && existingUser) {
      await AsyncStorage.setItem('registrationCompleted', 'true')
      dispatch(resetUserInfo())
      navigation.navigate(Routes.MainNavigation, { screen: Routes.Home })
    } else {
      navigation.navigate(Routes.SignupFlow2)
    }
    if(ggLogin.status === false && ggLogin.error){
      setError(ggLogin.error)
      console.log(ggLogin.error);
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    let login = await loginUser(email.trim(), password.trim())
    if(login.status == true) {
      await AsyncStorage.setItem('registrationCompleted', 'true')
      navigation.navigate(Routes.MainNavigation, { screen: Routes.Home })
    }
    if(login.status === false && login.error){
      setError(login.error)
      console.log(login.error);
    }
    setLoading(false)
  }
  

// ! /* ENDS HERE  */

  return (
    <KeyboardView>
      <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  justifyContent: 'space-between'}}>
          {loading && <Loader />}
          <View style={[styles.emailSignup]}>
            <Animated.View entering={FadeInRight.delay(100).springify().easing(Easing.ease)} style={styles.top}>
              <Welcome headerText='Welcome Back' />
              <View style={[styles.emailInputContainer]}>
                <AuthInput keyboardType={'email-address'} placeholderText='Email' icon='mail' search={email}  handleTextChange={(val) => setEmail(val)} />
                <AuthInput extraIcon={true} placeholderText='Password' icon='lock-circle' search={password}  handleTextChange={(val) => setPassword(val)} auth={true} />
                
                <View style={styles.passwordResetContainer}>
                  <TouchableOpacity>
                    <Text style={[styles.lineStrike, {color: theme.icon2}]}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <View style={styles.bottom}>
              <ActionBtn isDisabled={email.length <= 5 || password.length <=5} isIcon={true} icon={'login'} actionText='Login' onPress={handleLogin} />
            </View>
          </View>
          <Animated.View entering={FadeInDown.delay(200).springify().easing(Easing.ease)} style={[styles.socialSignup]}>
            <Line />
            <View style={styles.socialAuthContainer}>
              <SocialAuthButton type='google' onPress={handleGoogleLogin} />
              <SocialAuthButton type='facebook' onPress={handleFacebookLogin} />
            </View>
            <View style={styles.redirect}>
              <TouchableOpacity onPress={() => navigation.push(Routes.RegistrationFlow)}>
                <Text style={[styles.redirectText, {color: theme.header}]}>Don't have an account yet? <Text style={{color: theme.linearType1Clr1, fontFamily: getFontFamily('Poppins', '500')}}>Register</Text></Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardView>

  )
}

export default Flow1

const styles = StyleSheet.create({
  emailSignup: {
    flex: 0.8,
    justifyContent: 'space-between'
  },
  top: {
    gap: 30
  },
  emailInputContainer: {
    gap: 15
  },
  passwordResetContainer: {
    alignSelf: 'center'
  },
  lineStrike: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
    textDecorationLine: 'underline'
  },
  socialSignup: {
    gap: 30
  },
  socialAuthContainer: {
    flexDirection: 'row',
    gap: 30,
    alignSelf: 'center'
  },
  redirect: {
    alignSelf: 'center'
  },
  redirectText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(16),
    lineHeight: fontScale(20)
  },

})