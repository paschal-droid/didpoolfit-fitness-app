import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavPress } from '..'
import { useNavigation } from '@react-navigation/native'
import { color, getFontFamily, scaling } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import PropTypes from 'prop-types'

const {horizontalScale, verticalScale, fontScale} = scaling


const PageHeader = ({headerText, custom=false, customIcon='', adjustedSize}) => {
  const navigation = useNavigation()
  const {theme} = useTheme()
  return (
    <View style={[styles.header]}>
      <NavPress adjustSize={customIcon.length != 0} adjustedSize={adjustedSize ? adjustedSize : 22} icon={customIcon.length != 0 ? customIcon : 'caret-left'} onPress={() => navigation.goBack()} />
      <Text style={[styles.headerText, {color: custom ? color.white :  theme.header}]}>{headerText}</Text>
      <NavPress adjustSize={true} icon={'ellipsis-vertical'} onPress={() => {}} />
  </View>
  )
}

PageHeader.propTypes = {
  headerText: PropTypes.string,
  custom: PropTypes.bool,
  customIcon: PropTypes.string,
  adjustedSize: PropTypes.number
}

export default PageHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(20),
    lineHeight: fontScale(30),
  }
})