import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '../../../context/ThemeContext';
import { ActionBtn, AuthInput, KeyboardView, Line, Loader, SocialAuthButton, Welcome } from '../../../components';
import Animated,{ Easing, FadeInDown, FadeInRight} from 'react-native-reanimated'

import { globalStyles } from '../../../themes';
import { scaling , getFontFamily, color} from '../../../themes/themes';
import { Routes } from '../../../navigation/Routes';
import { createUser, facebookLogin, googleLogin} from '../../../api/userAuth';
import { resetUserInfo, updateUserInfo } from '../../../redux/reducers/AccountCreationInfo';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {horizontalScale, verticalScale, fontScale} = scaling


const Flow1 = ({navigation}) => {
  const {theme} = useTheme()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const {existingUser} = useSelector(state => state.userInfo)

    // ! AUTH FUNCTIONS FOR LOGIN  STARTS HERE

  const handleFacebookLogin = async () => {
    setLoading(true)
    let fbLogin = await facebookLogin(dispatch)
    if (fbLogin.status === true) {
      if(existingUser) {
        await AsyncStorage.setItem('registrationCompleted', 'true');
        dispatch(resetUserInfo())
        navigation.navigate(Routes.MainNavigation, {screen: Routes.Home})
      } else {
        navigation.navigate(Routes.SignupFlow2)
      }
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
    if (ggLogin.status === true) {
      if(existingUser) {
        await AsyncStorage.setItem('registrationCompleted', 'true');
        dispatch(resetUserInfo())
        navigation.navigate(Routes.MainNavigation, {screen: Routes.Home})
      } else {
        navigation.navigate(Routes.SignupFlow2)
      }
    }
    if(ggLogin.status === false && ggLogin.error){
      setError(ggLogin.error)
      console.log(ggLogin.error);
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    let login = await createUser(fullName.trim(), email.trim(), password.trim())
    if(login.status == true) {
      dispatch(updateUserInfo({lastName: fullName.split(' ')[1], firstName: fullName.split(' ')[0], email}))
      setFullName('')
      setPassword('')
      setEmail('')
      navigation.navigate(Routes.SignupFlow2)
    }
    if(login.status === false && login.error){
      setError(login.error)
      console.log(login.error);
    }
    setLoading(false)
  }

  // ! /* ENDS HERE  */

  // console.log(auth().currentUser)
  // useEffect(() => {
  //  signOut()
  // }, [])
  

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      {loading && <Loader />}
      <KeyboardView>
        <View style={[{gap: 30, flex: 1}]}>
          <View style={[styles.emailSignup]}>
            <View style={styles.top}>
              <Welcome headerText='Create an Account' />
              <Animated.View entering={FadeInRight.delay(200).springify().easing(Easing.ease)} style={[styles.emailInputContainer]}>
                <AuthInput placeholderText='Full Name' icon='user-outline' search={fullName}  handleTextChange={(val) => setFullName(val)} />
                <AuthInput keyboardType={'email-address'} placeholderText='Email' icon='mail' search={email}  handleTextChange={(val) => setEmail(val)} />
                <AuthInput extraIcon={true} placeholderText='Password' icon='lock-circle' search={password}  handleTextChange={(val) => setPassword(val)} auth={true} />
                
                <View style={styles.privacyPolicyContainer}>
                  <BouncyCheckbox
                    size={18}
                    fillColor={'#7E7476'}
                    unFillColor={theme.background}
                    iconStyle={{ borderColor: "#7E7476", borderRadius: 3}}
                    innerIconStyle={{ borderWidth: 0.8, borderRadius: 3 }}
                    onPress={(boolVal) => setIsChecked(boolVal)}
                  />
                  <Pressable>
                    <Text style={[styles.termsText, {color: theme.icon2}]}>By continuing you accept our <Text style={styles.lineStrike}>Privacy Policy</Text> and
                      <Text style={[styles.lineStrike]}> Terms of Use</Text>
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
            <View style={styles.bottom}>
              <ActionBtn isDisabled={fullName.length <= 6 || email.length <= 5 || password.length <=5} actionText='Register' onPress={handleLogin} />
            </View>
          </View>
          <Animated.View entering={FadeInDown.delay(300).springify().easing(Easing.ease)} style={[styles.socialSignup]}>
            <Line />
            <View style={styles.socialAuthContainer}>
              <SocialAuthButton type='google' onPress={handleGoogleLogin} />
              <SocialAuthButton type='facebook' onPress={handleFacebookLogin} />
            </View>
            <View style={styles.redirect}>
              <TouchableOpacity onPress={() => navigation.push(Routes.LoginFlow)}>
                <Text style={[styles.redirectText, {color: theme.header}]}>Already have an account? <Text style={{color: theme.linearType1Clr1, fontFamily: getFontFamily('Poppins', '500')}}>Login</Text></Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}

export default Flow1

const styles = StyleSheet.create({
  emailSignup: {
    flex: 1,
    justifyContent: 'space-between'
  },
  top: {
    gap: 30
  },
  emailInputContainer: {
    gap: 15
  },
  privacyPolicyContainer: {
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
  },
  termsText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(20),
    width: '80%',
  },
  lineStrike: {
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