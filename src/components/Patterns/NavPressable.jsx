import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../Icon/Icon'
import { useTheme } from '../../context/ThemeContext'
import { scaling } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling


const NavPressable = ({onPress=() => {}, icon, activity=false, adjustSize=false, adjustedSize=5}) => {
  const {theme} = useTheme()
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: theme.input}]}>
      <Icon name={icon} size={adjustSize ? fontScale(adjustedSize) : fontScale(22)} color={theme.header} />
      {activity && <View style={[styles.notification]} />}
    </TouchableOpacity>
  )
}

export default NavPressable

const styles = StyleSheet.create({
  button: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  notification: {
    width: horizontalScale(5),
    height: horizontalScale(5),
    borderRadius: horizontalScale(100),
    backgroundColor: 'red',
    position: 'absolute',
    right: horizontalScale(10),
    top: horizontalScale(10),
  }
})