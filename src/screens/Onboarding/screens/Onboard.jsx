import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { DoneButton, NextButton, OnboardImage } from '../../../components';
import { globalStyles } from '../../../themes';
import { scaling, getFontFamily,  color} from '../../../themes/themes';
import { useTheme } from '../../../context/ThemeContext';
import { Routes } from '../../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {horizontalScale, verticalScale, fontScale} = scaling
const {width, height} = Dimensions.get('window')

const Onboard = ({navigation}) => {
  const {theme} = useTheme()
  const [progress, setProgress] = useState(25)
  const [index, setIndex] = useState(0)


  useEffect(() => {
    switch (index) {
      case 0:
        setProgress(Math.floor(100/4))
        break;
      case 1:
        setProgress(Math.floor(100/2))
        break;
      case 2:
        setProgress(Math.floor(100/1.33))
        break;
      default:
        break;
    }
   }, [index])

  const handleOnboardWizard = async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    navigation.navigate(Routes.RegistrationFlow)
  }

  const doneComponent  = ({...props}) => {
    return (
      <DoneButton {...props} />
    )
  }

  const nextButton = ({...props}) => {
    return (
      <NextButton progress={progress} {...props} />
    )
  }

  const changePageHandler = (index) => {
    setIndex(index)
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen]}>
      <Onboarding
        pageIndexCallback={(val) => changePageHandler(val)}
        containerStyles={styles.container}
        imageContainerStyles={styles.imageContainer}
        titleStyles={styles.title}
        bottomBarHighlight={false}
        subTitleStyles={styles.subtitle}
        showSkip={false}
        onDone={handleOnboardWizard}
        DoneButtonComponent={doneComponent}
        NextButtonComponent={nextButton}
        pages={[
          {
            backgroundColor: theme.background,
            image: <OnboardImage onboardPage={1} />,
            title: <Text style={[styles.title, {color: theme.header}]}>Track Your Goal</Text>,
            subtitle: <Text style={[styles.subtitle, {color: theme.paragraph}]}>Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals</Text>,
          },
          {
            backgroundColor: theme.background,
            image: <OnboardImage onboardPage={2} />,
            title: <Text style={[styles.title, {color: theme.header}]}>Get Burn</Text>,
            subtitle: <Text style={[styles.subtitle, {color: theme.paragraph}]}>Let’s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever</Text>,
          },
          {
            backgroundColor: theme.background,
            image: <OnboardImage onboardPage={3} />,
            title: <Text style={[styles.title, {color: theme.header}]}>Eat Well</Text>,
            subtitle: <Text style={[styles.subtitle, {color: theme.paragraph}]}>Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun</Text>,
          },
          {
            backgroundColor: theme.background,
            image: <OnboardImage onboardPage={4} />,
            title: <Text style={[styles.title, {color: theme.header}]}>Improve Sleep  Quality</Text>,
            subtitle: <Text style={[styles.subtitle, {color: theme.paragraph}]}>Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning</Text>,
          },
          
        ]}
      />
    </SafeAreaView>
  )
}

export default Onboard

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start'
  },
  title: {
    marginTop: height/2.5 + verticalScale(15),
    paddingHorizontal: horizontalScale(25),
    fontFamily: getFontFamily('Poppins', '700'),
    lineHeight: fontScale(32),
    fontSize: fontScale(24),
    marginBottom: verticalScale(10)
  },
  subtitle: {
    paddingHorizontal: horizontalScale(25),
    fontFamily: getFontFamily('Poppins', '400'),
    lineHeight: fontScale(21),
    fontSize: fontScale(14)
  },
  imageContainer: {
    position: 'absolute',
    top: 0
  }
})