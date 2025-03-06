import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'
import PropTypes from 'prop-types'

const {fontScale} = scaling


const Welcome2 = ({headerText='', subText='', centerAlign=false}) => {
    const {theme} = useTheme()
  return (
    <View style={[styles.introduction, centerAlign && {alignItems: 'center'}]}>
        <Text style={[styles.introHeaderText, {color: theme.header}]}>{headerText}</Text>
        <Text style={[styles.introSubText, {color: theme.subText}]}>{subText}</Text>
    </View>
  )
}

Welcome2.propTypes = {
  headerText: PropTypes.string.isRequired,
  centerAlign: PropTypes.bool 
}

export default Welcome2

const styles = StyleSheet.create({
  introduction: {
    justifyContent: 'center',
  },
  introSubText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(24),
    textAlign: 'center'
  },
  introHeaderText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(20),
    lineHeight: fontScale(30),
  },
});