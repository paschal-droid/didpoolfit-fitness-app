import { Dimensions, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import image1Light from '../../assets/images/Illustrations/onboarding/avatar-female-gradient-light.png'
import image1Dark from '../../assets/images/Illustrations/onboarding/avatar-female-gradient.png'

import image2Light from '../../assets/images/Illustrations/onboarding/avatar-female-2-gradient-light.png'
import image2Dark from '../../assets/images/Illustrations/onboarding/avatar-female-2-gradient.png'

import image3Light from '../../assets/images/Illustrations/onboarding/avatar-male-gradient-light.png'
import image3Dark from '../../assets/images/Illustrations/onboarding/avatar-male-gradient.png'

import image4Light from '../../assets/images/Illustrations/onboarding/avatar-male-2-gradient-light.png'
import image4Dark from '../../assets/images/Illustrations/onboarding/avatar-male-2-gradient.png'
import { useTheme } from '../../context/ThemeContext'

const {width, height} = Dimensions.get('window')

const OnboardImage = (props) => {
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const [imageLink, setImageLink] = useState('')

  useEffect(() => {
    switch (props.onboardPage) {
      case 1:
        if(appTheme) { setImageLink(image1Dark)} 
        else {
          setImageLink(image1Light)
        }
        break;
      case 2:
        if(appTheme) { setImageLink(image2Dark)} 
        else {
          setImageLink(image2Light)
        }
        break
      case 3:
        if(appTheme) { setImageLink(image3Dark)} 
        else {
          setImageLink(image3Light)
        }
        break
      case 4:
        if(appTheme) { setImageLink(image4Dark)} 
        else {
          setImageLink(image4Light)
        }
        break
      default:
        break;
    }
  }, [props.onboardPage, appTheme])

  return (
    <>
      {props.onboardPage && imageLink != '' ? 
      <Image style={[styles.onboardImage]} source={imageLink} width={200} height={200} /> : <></>
      }
    </>
  )
}

OnboardImage.propTypes = {
  onboardPage: PropTypes.number.isRequired,
}

export default OnboardImage

const styles = StyleSheet.create({
  onboardImage: {
    width: width,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 0
  }
})