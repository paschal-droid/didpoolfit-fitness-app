import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'
import PropTypes from 'prop-types'

const {fontScale} = scaling


const Welcome = ({headerText=''}) => {
    const {theme} = useTheme()
  return (
    <View style={styles.introduction}>
        <Text style={[styles.introText, {color: theme.header}]}>Hey, there</Text>
        <Text style={[styles.introHeaderText, {color: theme.header}]}>{headerText}</Text>
    </View>
  )
}

Welcome.propTypes = {
  headerText: PropTypes.string.isRequired
}

export default Welcome

const styles = StyleSheet.create({
  introduction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(16),
    lineHeight: fontScale(24),
  },
  introHeaderText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(20),
    lineHeight: fontScale(30),
  },
});