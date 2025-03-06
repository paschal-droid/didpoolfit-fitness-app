import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'
import PropTypes from 'prop-types'

const {fontScale} = scaling


const Header = ({headerText='', subText=''}) => {
    const {theme} = useTheme()
  return (
    <View style={styles.introduction}>
        <Text style={[styles.introSubText, {color: theme.subText}]}>{subText}</Text>
        <Text style={[styles.introHeaderText, {color: theme.header}]}>{headerText.length > 15 ? headerText.substring(0, 10) + '...' : headerText}</Text>
    </View>
  )
}

Header.propTypes = {
  headerText: PropTypes.string.isRequired
}

export default Header

const styles = StyleSheet.create({
  introduction: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  introSubText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(24),
  },
  introHeaderText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(20),
    lineHeight: fontScale(30),
    textTransform: 'capitalize'
  },
});