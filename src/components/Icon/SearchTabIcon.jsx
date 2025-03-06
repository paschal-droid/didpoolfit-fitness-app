import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'

import PropTypes from 'prop-types'
import Icon from './Icon'

import { color, scaling } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import LinearGradient from 'react-native-linear-gradient'

const {fontScale, horizontalScale, verticalScale} = scaling



const SearchTabIcon = (props) => {
    const colorScheme = useColorScheme() === 'dark'
    const {theme} = useTheme()
  return (
    <LinearGradient 
      style={[styles.tab]}
      useAngle={true}
      angle={274}
      locations={[-0.84, 1.42]}
      colors={[theme.linearType2Clr1, theme.linearType2Clr2]}
      >
      <Icon color={theme.background} name={props.name} size={fontScale(props.size)}  />
    </LinearGradient>
  )
}

SearchTabIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    isFocused: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  tab: {
    width: horizontalScale(65),
    height: horizontalScale(65),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SearchTabIcon
