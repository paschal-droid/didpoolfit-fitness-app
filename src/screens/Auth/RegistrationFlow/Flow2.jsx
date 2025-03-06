import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker';
import { ActionBtn, AuthInput, DatePickerInput, Icon, KeyboardView, MeasureType, Welcome2 } from '../../../components'
import { globalStyles } from '../../../themes';
import { scaling , getFontFamily, color} from '../../../themes/themes';
import { useTheme } from '../../../context/ThemeContext';


import darkImage from '../../../assets/images/Illustrations/signin/avatar-female-3.png'
import lightImage from '../../../assets/images/Illustrations/signin/avatar-female-3-light.png'
import Animated, { Easing, FadeInRight } from 'react-native-reanimated';
import { Routes } from '../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../redux/reducers/AccountCreationInfo';

const {width, height} = Dimensions.get('window')
const {horizontalScale, verticalScale, fontScale} = scaling

const Flow2 = ({navigation}) => {
  const {theme} = useTheme()
  const dispatch = useDispatch()
  const apptheme = useColorScheme() === 'dark'
  const [gender, setGender] = useState('')
  const [weight, setWeight] = useState('')
  const [birthDate, setBirthDate] = useState(new Date())
  const [height, setHeight] = useState('')
  


  // Dropdown

  const [open, setOpen] = useState(false)
  const data = [
      {key:'1', value:'Male',},
      {key:'2', value:'Female'},
      {key:'3', value:'Custom'},
  ]

  // save the collected data to firestore
  const handleProfileInfo = () => {
    dispatch(updateUserInfo({gender, weight, height, dateOfBirth: birthDate}))
    navigation.navigate(Routes.SignupFlow3)
  
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <KeyboardView>
        <StatusBar backgroundColor={theme.background} barStyle={theme.statusBarTextColor}  />
        <View style={[styles.moreInfoContainer]}>
          <View style={styles.imageContainer}>
            <Image  source={apptheme ? darkImage : lightImage} style={styles.image} />
          </View>
          <View style={[styles.contentContainer]}>
            <Welcome2 centerAlign={true} subText='It will help us to know more about you!' headerText='Let’s complete your profile' />
            <Animated.View entering={FadeInRight.delay(200).springify().easing(Easing.ease)} style={[styles.infoInputContainer]}>
              {/* Gender Selection */}
              <View style={[styles.dropdown]}>
                <Icon name='friends' color={theme.icon} style={styles.dropdownIcon} size={fontScale(20)} />
                <SelectList 
                  setSelected={(val) => setGender(val)} 
                  data={data} 
                  save="value"
                  search={false}
                  boxStyles={[styles.inputContainer, {backgroundColor: theme.input, borderColor: theme.input}]}
                  inputStyles={[styles.inputStyles, {color: theme.icon2}]}
                  dropdownTextStyles={[styles.dropdownText, {color: theme.icon2}]}
                  dropdownStyles={[styles.dropdownContainer, {backgroundColor: theme.input, borderColor: theme.input}]}
                  arrowicon={<Icon name='caret' size={fontScale(20)} color={theme.icon} />}
                  placeholder='Choose Gender'
                />
              </View>
              {/* Date of Birth */}
              <DatePickerInput date={birthDate} onPress={() => setOpen(true)} />
              <DatePicker mode='date' modal open={open} onConfirm={(date) => {setBirthDate(date); setOpen(false)}}  date={birthDate} onCancel={() => { setOpen(false)}} />
              
              {/* Metrics Measurement Selection*/}
              <View style={[styles.measurements]}>
                <AuthInput keyboardType={'phone-pad'} placeholderText='Your Weight' icon='barbell' search={weight}  handleTextChange={(val) => setWeight(val)} />
                <MeasureType type='kg' />
              </View>
              <View style={[styles.measurements]}>
                <AuthInput keyboardType={'phone-pad'} placeholderText='Your Height' icon='swap' search={height}  handleTextChange={(val) => setHeight(val)} />
                <MeasureType type='cm' />
              </View>
            </Animated.View>
            <ActionBtn isDisabled={gender.length <= 1 || birthDate.getFullYear() > new Date().getFullYear()-10 || weight.length < 1 || height.length < 2}  actionText='Next' onPress={handleProfileInfo} />

          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>


  )
}

export default Flow2

const styles = StyleSheet.create({
  moreInfoContainer: {
    flex: 1,
    gap: 30
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: verticalScale(-40),
    width: width *0.9,
    alignSelf: 'center',
    height: height/2.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoInputContainer: {
    gap: 15
  },
  contentContainer: {
    flex: 1,
    gap: 30
  },
  measurements: {
    flexDirection: 'row',
    gap: 15
  },
  inputContainer: {
    justifyContent: 'center',
    height: verticalScale(45),
    flexDirection: 'row',
    flex: 1,
    borderRadius: verticalScale(14),
    alignItems: 'center',
  },
  inputStyles: {
    marginLeft: horizontalScale(30),
    flex: 1,
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
  },
  dropdownText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
  },
  dropdownContainer: {},
  dropdown: {},
  dropdownIcon: {
    position: 'absolute',
    left: horizontalScale(16),
    top: horizontalScale(12),
    height: horizontalScale(20),
    zIndex: 10,
    width: horizontalScale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})