import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scaling } from '../../themes/themes'
import PropTypes from 'prop-types'

const {horizontalScale, verticalScale, fontScale} = scaling

import google from '../../assets/images/icons/google.png'
import facebook from '../../assets/images/icons/facebook.png'
import { useTheme } from '../../context/ThemeContext'

const SocialAuthButton = ({onPress= () => {}, type=''}) => {
  const {theme} = useTheme()
  return (
   <TouchableOpacity onPress={onPress} style={[styles.authButton, {borderColor: theme.line}]}>
      <Image style={[styles.authImage]} source={type == 'google' ? google : facebook} />
   </TouchableOpacity>
  )
}

SocialAuthButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default SocialAuthButton

const styles = StyleSheet.create({
  authButton: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(14),
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  authImage: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  }
})